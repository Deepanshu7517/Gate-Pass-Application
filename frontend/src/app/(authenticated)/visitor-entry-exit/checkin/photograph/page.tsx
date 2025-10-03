import { useState, useRef, useEffect } from "preact/hooks";
import { useCheckin } from "../../../../../context/checkin-context";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Camera, Check } from "lucide-preact";
import { useToast } from "../../../../../hooks/use-toast";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../../components/ui/alert";
import { useNavigate } from "react-router-dom";

export default function PhotographPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckin();
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [photoTaken, setPhotoTaken] = useState(!!state.photograph);
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

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataUri = canvas.toDataURL("image/jpeg");
      dispatch({ type: "UPDATE_STATE", payload: { photograph: dataUri } });
      setPhotoTaken(true);

      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleNext = () => {
    console.log(state);
    navigate("/visitor-entry-exit/checkin/identity-proof");
  };

  return (
  
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className=" text-2xl">
            Visitor Photograph
          </CardTitle>
          <CardDescription>
            Please capture a clear photograph of the visitor.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="relative h-64 w-64 overflow-hidden rounded-lg border-2 border-dashed border-[#d4d7de]">
            {state.photograph ? (
              <img
                src={state.photograph}
                alt="Visitor photograph"
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

          {!photoTaken ? (
            <Button size="default" variant="default" onClick={handleCapture} disabled={!hasCameraPermission}>
              <Camera className="mr-2 h-4 w-4" />
              Capture Photo
            </Button>
          ) : (
            <div className="flex items-center text-green-600">
              <Check className="mr-2 h-5 w-5" />
              <p>Photo captured successfully!</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button size="default" variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button size="default" variant="default" onClick={handleNext} disabled={!photoTaken}>
            Next
          </Button>
        </CardFooter>
      </Card>
  );
}
