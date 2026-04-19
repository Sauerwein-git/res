"use client";

import { useEffect, useState } from "react";
import { supportsZoom } from "@/utils/detectZoomSupport";

export default function ZoomFallbackWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [needsFallback, setNeedsFallback] = useState(false);

  useEffect(() => {
    setNeedsFallback(!supportsZoom());
  }, []);

  if (!needsFallback) return <>{children}</>;

  return <div className="zoom-fallback-wrapper">{children}</div>;
}
