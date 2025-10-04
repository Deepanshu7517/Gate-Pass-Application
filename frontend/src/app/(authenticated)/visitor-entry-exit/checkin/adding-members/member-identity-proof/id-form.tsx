import { useState, useRef, useEffect } from "preact/hooks";
import { useCheckin } from "../../../../../../hooks/useCheckIn";
import { Button } from "../../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../../../components/ui/alert";
import { Camera, Check } from "lucide-preact";
import { useToast } from "../../../../../../hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import CameraPermissionButton from "../../../../../../components/ui/cameraPermission";

export function MemberIdForm() {
  const { index } = useParams<{ index: string }>();
  const memberIndex = Number(index);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkinState, updateMember } = useCheckin();

  const { currentMemberIndex, members } = checkinState;
  const member = currentMemberIndex !== null && members ? members[currentMemberIndex] : null;

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(member?.identityProof || null);
  const [photoTaken, setPhotoTaken] = useState(!!member?.identityProof);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if member exists and redirect if not
  useEffect(() => {
    if (!member && members) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No member selected. Redirecting...",
      });
      navigate("/visitor-entry-exit/checkin/add-members");
    }
  }, [member, members, navigate, toast]);

  const getCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setHasCameraPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCameraPermission(false);
      toast({
        variant: "destructive",
        title: "Camera Access Denied",
        description:
          "Please enable camera permissions in your browser settings to continue.",
      });
    }
  };

  useEffect(() => {
    // Only request camera if no photo has been taken yet
    if (!photoTaken) {
      getCameraPermission();
    }

    // Cleanup: Stop video stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [photoTaken]);

  const handleCapture = async () => {
    if (currentMemberIndex === null) return;

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataUri = canvas.toDataURL("image/jpeg");

      // Stop video stream after capturing
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      // Update local state
      setCapturedImage(dataUri);
      setPhotoTaken(true);

      // Update Redux store
      updateMember(currentMemberIndex, { identityProof: dataUri });

      toast({
        title: "ID Proof Captured!",
        description: `ID for ${member?.basicDetails.firstName || "member"} has been saved.`,
      });
    }
  };

  const handleRetake = () => {
    if (currentMemberIndex === null) return;

    // Clear identity proof from Redux store
    updateMember(currentMemberIndex, { identityProof: null });
    setCapturedImage(null);
    setPhotoTaken(false);

    // Restart camera
    getCameraPermission();
  };

  const handleNext = () => {
    if (!capturedImage) {
      toast({
        variant: "destructive",
        title: "No ID Proof Captured",
        description: "Please capture an image of the ID before proceeding.",
      });
      return;
    }

    console.log("Current state:", checkinState);
    navigate(`/visitor-entry-exit/checkin/add-members/${memberIndex}/equipment`);
  };

  // Show loading state while checking member
  if (!member && members) {
    return (
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-lg">Loading member data...</p>
        </CardContent>
      </Card>
    );
  }

  const memberNumber = memberIndex + 1;

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Member #{memberNumber} - Identity Proof
        </CardTitle>
        <CardDescription>
          Capture a clear image of the member's ID proof.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg border-2 border-dashed border-[#d4d7de]">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="ID card preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
            />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {hasCameraPermission === false && (
          <div className="flex flex-col items-center gap-2">
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription className={"text-[#8d7c8b]"}>
                Please allow camera access in your browser to use this feature.
              </AlertDescription>
            </Alert>
            <CameraPermissionButton />
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <Button
            className={"bg-[#4051b5] text-white"}
            onClick={handleCapture}
            disabled={photoTaken || !hasCameraPermission}
          >
            {photoTaken ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                ID Captured
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Capture ID Photo
              </>
            )}
          </Button>

          {photoTaken && (
            <Button variant="outline" size="sm" onClick={handleRetake}>
              Retake Photo
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate(`/gate-pass/add-members/${memberIndex}/photograph`)}
        >
          Back
        </Button>
        <Button
          variant={"default"}
          onClick={handleNext}
          disabled={!capturedImage}
        >
          Next Step
        </Button>
      </CardFooter>
    </Card>
  );
}