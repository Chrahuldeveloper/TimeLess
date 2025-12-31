import React, { useRef, useState } from "react";

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

  const onDrag = (e:React.MouseEvent | React.TouchEvent) =>{

    if(!dragging || !trackRef.current){
      return;
    }

    const trackSize = trackRef.current.getBoundingClientRect();

    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;

    let newOffset = clientX - trackSize.left - 25;
    newOffset = Math.max(0, Math.min(newOffset, trackSize.width - 50)); 
    setOffset(newOffset);

  }

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
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-12 bg-[#242b2b] rounded-full flex items-center px-1 select-none"
      ref={trackRef}
      onMouseMove={onDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchMove={onDrag}
      onTouchEnd={endDrag}
    >
      <div
        className="absolute w-full text-sm text-center text-white font-medium pointer-events-none"
      >
      SWIPE TO CAPTURE
      </div>
      <div
        ref={handleRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="w-10 h-10 bg-[#ddfc55] rounded-full shadow-md z-10"
        style={{ transform: `translateX(${offset}px)` }}
      />
    </div>
  );
}
