import { useState } from "preact/hooks";

export default function CameraPermissionButton({classes}:{classes?:string}) {
  const [status, setStatus] = useState("idle");

  const requestCamera = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // stop tracks immediately (we only want permission)
      stream.getTracks().forEach((track) => track.stop());
      setStatus("granted");
    } catch (err) {
      console.error("Camera permission error:", err);
      setStatus("denied");
    }
  };

  return (
    <button
      onClick={requestCamera}
      className={`${"px-4 py-2 bg-blue-600 text-white rounded-lg shadow"} ${classes || ""}`}
    >
      {status === "idle" && "Request Camera Permission"}
      {status === "requesting" && "Requesting..."}
      {status === "granted" && "✅ Camera Permission Granted"}
      {status === "denied" && "❌ Permission Denied - Check Browser Settings"}
    </button>
  );
}
