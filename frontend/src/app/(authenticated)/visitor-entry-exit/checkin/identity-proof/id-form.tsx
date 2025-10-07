import { useState, useRef, useEffect } from "preact/hooks";
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../../components/ui/alert";
import { Camera, Check, ArrowLeft } from "lucide-preact";
import { useToast } from "../../../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
// Assuming these are components you have access to, similar to the Next.js version
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
// IMPORTANT: Use the IdentityProof type from your types file
import type { IdentityProof } from "../../../../../types";

export function IdForm() {
  const navigate = useNavigate();
  const { checkinState, updateIdentityProof } = useCheckin();
  const { toast } = useToast();

  // 1. Local state must conform to IdentityProof type from checkIn.ts
  const initialProof = checkinState.identityProof || {
    type: "picture",
    data: null,
  };
  const [identityProof, setIdentityProof] =
    useState<IdentityProof>(initialProof);

  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper to check if the current tab is the picture tab
  const isPictureTab = identityProof.type === "picture";
  // Helper to check if a photo has been taken (only relevant for picture tab)
  const photoTaken = isPictureTab && identityProof.data !== null;

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
    // Only request camera if we are currently on the 'picture' tab AND no photo is taken
    if (isPictureTab && !photoTaken) {
      getCameraPermission();
    }

    // Cleanup: Stop video stream when component unmounts or switches tabs
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isPictureTab, photoTaken]); // Rerun effect when tabs switch or photo status changes

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Convert canvas to base64 image
      const dataUri = canvas.toDataURL("image/jpeg");

      // Stop the video stream after capturing
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      // 2. Update local state with the captured photo data
      setIdentityProof({ type: "picture", data: dataUri });

      toast({
        title: "Success",
        description: "ID Photo Captured.",
      });
    }
  };

  const handleRetake = () => {
    // 3. Clear the photo data in local state (which triggers effect to restart camera)
    setIdentityProof({ type: "picture", data: null });
  };

  const isNextDisabled = () => {
    if (identityProof.type === "picture") {
      return identityProof.data === null;
    }
    if (identityProof.type === "number") {
      // Your IdentityProof type specifies idType can be "" for number type, but
      // idNumber must be a non-empty string for validation.
      return !identityProof.idType || identityProof.idNumber.trim() === "";
    }
    return true;
  };

  const handleNext = () => {
    if (isNextDisabled()) {
      toast({
        variant: "destructive",
        title: "Required Information Missing",
        description:
          "Please complete the identity proof details before proceeding.",
      });
      return;
    }

    // 4. Update Redux store with the complete IdentityProof object
    updateIdentityProof(identityProof as any);

    console.log("Current check-in state:", checkinState);
    navigate("/visitor-entry-exit/checkin/equipment");
  };

  // Clean up the unused local state from the original file
  const isIdentityProofNumber = identityProof.type === "number";

  return (
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <CardHeader>
        <CardTitle className=" font-headline text-2xl sm:text-3xl">
          Identity Proof
        </CardTitle>
        <CardDescription className={"text-base sm:text-lg "}>
          Capture a clear photograph of the visitor's ID card or enter the ID
          number.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        <Tabs
          defaultValue={identityProof.type === "picture" ? "picture" : "number"}
          className="w-full"
          onValueChange={(value) => {
            // Stop any running camera stream on tab switch
            if (videoRef.current && videoRef.current.srcObject) {
              (videoRef.current.srcObject as MediaStream)
                .getTracks()
                .forEach((track) => track.stop());
            }

            if (value === "picture") {
              // Retain existing photo if present, otherwise set null
              const existingData =
                checkinState.identityProof?.type === "picture"
                  ? checkinState.identityProof.data
                  : null;
              setIdentityProof({ type: "picture", data: existingData });
            } else {
              // Retain existing number details if present
              const existingDetails =
                checkinState.identityProof?.type === "number"
                  ? checkinState.identityProof
                  : { idType: "", idNumber: "" };
              setIdentityProof({ type: "number", ...existingDetails } as any);
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="picture">Capture Photo</TabsTrigger>
            <TabsTrigger value="number">Enter ID Number</TabsTrigger>
          </TabsList>

          {/* Tab Content for Photo Capture */}
          <TabsContent
            value="picture"
            className="flex flex-col items-center justify-center space-y-4 mt-4"
          >
            <div className="relative h-64 w-full md:h-80` max-w-md overflow-hidden rounded-lg border-2 border-dashed border-[#d4d7de]">
              {identityProof.type === "picture" && identityProof.data ? (
                <img
                  src={identityProof.data}
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

            {hasCameraPermission === false &&
              identityProof.type === "picture" && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription className={"text-[#8d7c8b]"}>
                    Please allow camera access in your browser to use this
                    feature.
                  </AlertDescription>
                </Alert>
              )}

            <div className="flex flex-col items-center gap-2">
              {identityProof.type === "picture" && identityProof.data ? (
                <Button variant="outline" size="sm" onClick={handleRetake}>
                  Retake Photo
                </Button>
              ) : (
                <Button
                  className={"bg-[#4051b5] text-white"}
                  onClick={handleCapture}
                  disabled={!hasCameraPermission}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Capture ID Photo
                </Button>
              )}
              {identityProof.type === "picture" && identityProof.data && (
                <div className="flex items-center text-sm font-medium text-[#4051b5]">
                  <Check className="mr-2 h-4 w-4" /> ID Captured
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab Content for ID Number Input */}
          <TabsContent value="number" className="space-y-4 mt-6">
            {isIdentityProofNumber && (
              <div className="grid w-full max-w-md items-center gap-4 mx-auto">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="id-type">ID Type</Label>
                  <Select
                    value={identityProof.idType}
                    onValueChange={(value) => {
                      // Explicitly cast value to the valid union type from checkIn.ts
                      setIdentityProof({
                        ...identityProof,
                        idType: value as IdentityProof extends {
                          type: "number";
                        }
                          ? IdentityProof["idType"]
                          : never,
                      });
                    }}
                  >
                    <SelectTrigger id="id-type">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar-card">Aadhaar Card</SelectItem>
                      <SelectItem value="pan-card">PAN Card</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="driving-license">
                        Driving License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input
                    id="id-number"
                    placeholder="Enter the ID number"
                    value={identityProof.idNumber}
                    // Only update idNumber if we are in 'number' type
                    onChange={(e) =>
                      isIdentityProofNumber &&
                      setIdentityProof({
                        ...identityProof,
                        idNumber: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          variant={"default"}
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
