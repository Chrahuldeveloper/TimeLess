import { useRef, useState } from "react";

interface SwipeButtonProps {
  onSwipe?: () => void;
}

export default function SwipeButton({ onSwipe }: SwipeButtonProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;

    let newOffset = clientX - trackRect.left - 25; // 25 = handle radius
    newOffset = Math.max(0, Math.min(newOffset, trackRect.width - 50)); // 50 = handle width
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!trackRef.current) return;
    if (offset >= trackRef.current.offsetWidth - 50) {
      onSwipe?.();
    }
    setOffset(0);
    setDragging(false);
  };

  return (
    <div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-12 bg-gray-700 rounded-full flex items-center px-1 select-none"
      ref={trackRef}
      onMouseMove={onDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchMove={onDrag}
      onTouchEnd={endDrag}
    >
      <div
        className="absolute w-full text-center text-white font-medium pointer-events-none"
      >
        SWIPE TO CAPTURE
      </div>
      <div
        ref={handleRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="w-12 h-12 bg-white rounded-full shadow-md z-10"
        style={{ transform: `translateX(${offset}px)` }}
      />
    </div>
  );
}
