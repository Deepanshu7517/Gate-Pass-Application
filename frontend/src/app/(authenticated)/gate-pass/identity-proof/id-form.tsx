
import { useState, useRef, useEffect } from "preact/hooks";
import { useCheckin } from "../../../../hooks/useCheckIn";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { Camera, Check } from "lucide-preact";
import { useToast } from "../../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function GatePassIdForm() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckin();
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    state.identityProof
  );
  const [photoTaken, setPhotoTaken] = useState(!!state.identityProof);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
    if (!photoTaken) {
      getCameraPermission();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast, photoTaken]);

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataUri = canvas.toDataURL("image/jpeg");

      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      setImagePreview(dataUri);
      setPhotoTaken(true);
      dispatch({ type: "UPDATE_STATE", payload: { identityProof: dataUri } });
      toast({
        title: "Success",
        description: "ID Photo Captured.",
      });
    }
  };

  const handleNext = () => {
    console.log(state);
    navigate("/gate-pass/equipment");
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl ">
          Identity Proof
        </CardTitle>
        <CardDescription>
          Capture a clear photograph of the visitor's ID card.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg border-2 border-dashed border-[#d4d7de]">
          {imagePreview ? (
            <img
              src={imagePreview}
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
          <Alert variant="destructive">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription className={"text-[#8d7c8b]"}>
              Please allow camera access in your browser to use this feature.
            </AlertDescription>
          </Alert>
        )}

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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          variant={"default"}
          onClick={handleNext}
          disabled={!imagePreview}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
