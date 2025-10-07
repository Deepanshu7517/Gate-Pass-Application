import { useState, useRef, useEffect } from "react";
import { useCheckin } from "../../../../../hooks/useCheckIn";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Camera, Check, ArrowLeft } from "lucide-preact"; // Added ArrowLeft for the Back button
import { useToast } from "../../../../../hooks/use-toast";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../../components/ui/alert";
import { useNavigate } from "react-router-dom";
// Removed: import CameraPermissionButton from "../../../../../components/ui/cameraPermission";

export default function PhotographPage() {
  const navigate = useNavigate();
  const { checkinState, updatePhotograph } = useCheckin();
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [photoTaken, setPhotoTaken] = useState(!!checkinState.photograph);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // LOGIC: Get camera permission and start video stream
  const getCameraPermission = async () => {
    try {
      // Clean up previous stream if it exists
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
    if (!checkinState.photograph && hasCameraPermission === null) {
      getCameraPermission();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [checkinState.photograph]);

  // LOGIC: Capture photo
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataUri = canvas.toDataURL("image/jpeg");
      
      updatePhotograph(dataUri);
      setPhotoTaken(true);

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

  // LOGIC: Retake photo
  const handleRetake = () => {
    updatePhotograph(null);
    setPhotoTaken(false);
    setHasCameraPermission(null); 
    getCameraPermission();
  };

  // LOGIC: Next button
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
    navigate("/visitor-entry-exit/checkin/identity-proof");
  };

  // Responsive class for the camera/image container
  const containerClasses = "relative h-64 w-64 sm:h-80 sm:w-96 overflow-hidden rounded-lg border-2 border-dashed border-[#d4d7de] sm:border-gray-300";

  return (
    // Card size: max-w-2xl (mobile/default) -> max-w-4xl (PC)
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <CardHeader>
        {/* CardTitle: text-2xl (mobile) -> text-3xl (PC) */}
        <CardTitle className="font-headline text-2xl sm:text-3xl">
          Visitor Photograph
        </CardTitle>
        {/* CardDescription: Default (mobile) -> text-lg (PC) */}
        <CardDescription className="text-base sm:text-lg">
          Please capture a clear photograph of the visitor.
        </CardDescription>
      </CardHeader>
      
      {/* CardContent spacing: space-y-4 (mobile) -> space-y-6 (PC) */}
      <CardContent className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        
        {/* --- CAMERA/IMAGE VIEWER --- */}
        <div className={containerClasses}>
          {checkinState.photograph ? (
            // Photo Taken State
            <img
              src={checkinState.photograph!} // Non-null assertion for Preact type safety
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
              <AlertDescription className={"text-[#8d7c8b] text-base sm:text-lg"}>
                Please allow camera access in your browser to use this feature.
              </AlertDescription>
            </Alert>
            {/* Request Button (replaces CameraPermissionButton) */}
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
          // Capture Button
          <Button
            size="default"
            onClick={handleCapture}
            disabled={!hasCameraPermission}
            // Responsive size and color from original file
            className="bg-[#4051b5] text-white hover:bg-[#4051b5]/90 sm:h-12 sm:px-6 sm:text-base"
          >
            <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Capture Photo
          </Button>
        ) : (
          // Retake Button & Success Message
          <div className="flex flex-col items-center gap-2">
            {/* Success message: text-base (mobile) -> text-lg (PC) */}
            <div className="flex items-center text-green-600 text-base sm:text-lg">
              <Check className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              <p>Photo captured successfully!</p>
            </div>
            {/* Retake Button: size="sm" (mobile) -> size="lg" (PC) */}
            <Button
              variant="outline"
              size="sm"
              className="sm:h-12 sm:px-6 sm:text-base" // Responsive size
              onClick={handleRetake}
            >
              Retake Photo
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* CardFooter padding: default (mobile) -> pt-6 (PC) */}
      <CardFooter className="flex justify-between pt-4 sm:pt-6">
        {/* Back Button: size="default" (mobile) -> size="lg" (PC) */}
        <Button 
            variant="outline" 
            size="default" 
            className="sm:h-12 sm:px-6 sm:text-base"
            onClick={() => navigate(-1)}
        >
            Back
        </Button>
        
        {/* Next Button: size="default" (mobile) -> size="lg" (PC) */}
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