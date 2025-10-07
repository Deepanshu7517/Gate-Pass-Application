import { useState, useRef, useEffect } from "react";
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
import { Camera, Check } from "lucide-preact";
import { useToast } from "../../../../hooks/use-toast";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { useNavigate } from "react-router-dom";
// Note: CameraPermissionButton is replaced by inline Button for clarity and UI consistency

export default function GatePassPhotographPage() {
  const navigate = useNavigate();
  const { checkinState, updatePhotograph } = useCheckin();
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  // Track photo state locally for UI (parent/primary visitor photograph)
  const [photoTaken, setPhotoTaken] = useState(!!checkinState.photograph);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // LOGIC: Get camera permission and start video stream
  const getCameraPermission = async () => {
    try {
      // Clean up previous stream if it exists (robust cleanup)
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCameraPermission(false);
      
      // Prevent double-toasting if the error is just due to initial denial
      if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to continue.",
        });
      }
    }
  };

  // EFFECT: Request camera on mount/sync and clean up stream on unmount
  useEffect(() => {
    // Only request camera if no photo has been taken yet and permission state is unknown
    if (!checkinState.photograph && hasCameraPermission === null) {
      getCameraPermission();
    }

    // Cleanup: Stop video stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [checkinState.photograph]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Convert canvas to base64 image
      const dataUri = canvas.toDataURL("image/jpeg");
      
      // Update Redux store with the photograph
      updatePhotograph(dataUri);
      setPhotoTaken(true);

      // Stop the video stream after capturing
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      toast({
        title: "Photo Captured",
        description: "Visitor photograph captured successfully!",
      });
    }
  };

  const handleRetake = () => {
    // Clear the photo from Redux store
    updatePhotograph(null);
    setPhotoTaken(false);
    setHasCameraPermission(null); // Reset state to trigger new permission request
    
    // Restart camera
    getCameraPermission();
  };

  const handleNext = () => {
    if (!checkinState.photograph) {
      toast({
        variant: "destructive",
        title: "Photo Required",
        description: "Please capture a photograph before proceeding.",
      });
      return;
    }
    
    console.log("Current check-in state:", checkinState);
    // Navigating to the route requested in the first component's logic
    navigate("/gate-pass/identity-proof");
  };

  // Responsive class for the camera/image container
  const containerClasses = "relative h-64 w-64 sm:h-80 sm:w-96 overflow-hidden rounded-lg border-2 border-dashed border-[#d4d7de] sm:border-gray-300";


  return (
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <CardHeader>
        {/* CardTitle scaling: text-2xl (mobile) -> text-3xl (PC) */}
        <CardTitle className="font-headline text-2xl sm:text-3xl">
          Visitor Photograph
        </CardTitle>
        {/* CardDescription scaling: Default (mobile) -> text-lg (PC) */}
        <CardDescription className="text-base sm:text-lg">
          Please capture a clear photograph of the visitor.
        </CardDescription>
      </CardHeader>
      
      {/* CardContent spacing: space-y-4 (mobile) -> space-y-6 (PC) */}
      <CardContent className="flex flex-col items-center justify-center space-y-4 sm:space-y-4">
        
        {/* --- CAMERA/IMAGE VIEWER --- */}
        <div className={containerClasses}>
          {checkinState.photograph ? (
            // Photo Taken State
            <img
              src={checkinState.photograph!} // Uses non-null assertion as logic ensures it exists here
              alt="Visitor photograph"
              className="h-full w-full object-cover"
            />
          ) : (
            // Live Camera/Video Stream State
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
        
        {/* --- PERMISSION DENIED STATE --- */}
        {hasCameraPermission === false && (
          <div className="flex flex-col items-center gap-2">
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              {/* AlertDescription scaling: text-base (mobile) -> text-lg (PC) */}
              <AlertDescription className={"text-[#8d7c8b] text-base sm:text-lg"}>
                Please allow camera access in your browser to use this feature.
              </AlertDescription>
            </Alert>
            {/* Camera Permission Button (Responsive size) */}
            <Button 
                size="default" 
                onClick={getCameraPermission} 
                className="sm:h-12 sm:px-6 sm:text-base"
            >
                <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Request Camera Permission
            </Button>
          </div>
        )}

        {/* --- CAPTURE / RETAKE BUTTONS --- */}
        {!photoTaken ? (
          // Capture Button (Responsive size and custom color)
          <Button
            size="default"
            onClick={handleCapture}
            disabled={!hasCameraPermission}
            className="bg-[#4051b5] text-white hover:bg-[#4051b5]/90 sm:h-12 sm:px-6 sm:text-base"
          >
            <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Capture Photo
          </Button>
        ) : (
          // Retake Button & Success Message
          <div className="flex flex-col items-center gap-2">
            {/* Success message scaling: text-base (mobile) -> text-lg (PC) */}
            <div className="flex items-center text-green-600 text-base sm:text-lg">
              <Check className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              <p>Photo captured successfully!</p>
            </div>
            {/* Retake Button (Responsive size) */}
            <Button
              variant="outline"
              size="sm"
              className="sm:h-12 sm:px-6 sm:text-base"
              onClick={handleRetake}
            >
              Retake Photo
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* CardFooter padding: pt-4 (mobile) -> pt-6 (PC) */}
      <CardFooter className="flex justify-between pt-4 sm:pt-6">
        {/* Back Button (Responsive size) */}
        <Button 
            variant="outline" 
            size="default" 
            className="sm:h-12 sm:px-6 sm:text-base"
            onClick={() => navigate(-1)}
        >
            Back
        </Button>
        
        {/* Next Button (Responsive size) */}
        <Button 
            variant={"default"} 
            size="default" 
            className="sm:h-12 sm:px-6 sm:text-base"
            onClick={handleNext} 
            disabled={!photoTaken}
        >
            Next
        </Button>
      </CardFooter>
    </Card>
  );
}