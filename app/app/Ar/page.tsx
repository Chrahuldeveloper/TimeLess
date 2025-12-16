"use client";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [captured, setCaptured] = useState(false); 

  const handleOpenCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.play();

      setTimeout(() => {
        captureFrame();
      }, 1500);
    }
  }, [stream]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current || captured) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL("image/jpeg", 0.85);
    console.log("📸 Auto captured image", imageBase64);

    setCaptured(true);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          stream ? "opacity-100" : "opacity-0"
        }`}
        playsInline
        muted
      />

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full border border-[#d6b46c]/40 ar-ring" />
            <div className="h-52 w-52 rounded-full border border-[#d6b46c]/60 ar-inner-ring" />
            <div className="absolute h-5 w-5 rounded-full bg-yellow-400" />
          </div>
        </div>
      )}

      {!stream && (
        <div className="absolute top-6 left-6 z-50 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-black/70 border border-[#d6b46c]/40 shadow-[0_0_25px_rgba(214,180,108,0.25)]" />
            <div className="relative px-5 py-4">
              <h1 className="text-lg font-semibold text-[#f5d98b]">
                AR Scan Mode
              </h1>
              <p className="text-sm text-white/80">
                Point your camera at a monument
              </p>
            </div>
          </div>
        </div>
      )}

      {!stream && (
        <div className="absolute bottom-32 w-full flex justify-center z-30">
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl 
              bg-[#d6b46c]/30 blur-xl animate-pulse" />
            <button
              onClick={handleOpenCamera}
              className="relative px-16 py-3
              bg-[#d6b46c] text-black font-semibold
              rounded-xl shadow-lg
              hover:scale-105 transition-transform duration-300"
            >
              Scan Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
