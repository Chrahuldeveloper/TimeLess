"use client";

import { useEffect } from "react";

export default function AR() {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      src="/models/model1.glb"
      alt="Monument"
      ar
      ar-modes="scene-viewer quick-look webxr"
      ar-placement="floor"
      camera-controls
      shadow-intensity="1"
      exposure="1"
      style={{ width: "100%", height: "70vh" }}
    />
  );
}
