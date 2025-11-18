import React, { useState, useEffect, useRef } from 'react';
import './PictureRetoucher.css';

interface PictureRetoucherProps {
   className?: string;
   img1: string;
   img2: string;
}

export const PictureRetoucher = (props: PictureRetoucherProps) => {
   const { className, img1, img2 } = props;

   const [linePosition, setLinePosition] = useState(50);
   const [isDragging, setIsDragging] = useState(false);
   const containerRef = useRef<HTMLDivElement | null>(null);

   const handleMove = (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const width = rect.width;

      let pos = (offsetX / width) * 100;
      pos = Math.max(0, Math.min(99, pos));

      setLinePosition(pos);
   };

   // React-handlers
   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      handleMove(e.clientX);
   };

   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
   };

   // Native handlers
   const handleMouseMoveNative = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
   };

   const handleMouseUpNative = () => {
      setIsDragging(false);
   };

   const handleTouchMoveNative = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
   };

   const handleTouchEndNative = () => {
      setIsDragging(false);
   };

   useEffect(() => {
      if (isDragging) {
         document.addEventListener('mousemove', handleMouseMoveNative);
         document.addEventListener('mouseup', handleMouseUpNative);

         document.addEventListener('touchmove', handleTouchMoveNative);
         document.addEventListener('touchend', handleTouchEndNative);
      } else {
         document.removeEventListener('mousemove', handleMouseMoveNative);
         document.removeEventListener('mouseup', handleMouseUpNative);

         document.removeEventListener('touchmove', handleTouchMoveNative);
         document.removeEventListener('touchend', handleTouchEndNative);
      }

      return () => {
         document.removeEventListener('mousemove', handleMouseMoveNative);
         document.removeEventListener('mouseup', handleMouseUpNative);
         document.removeEventListener('touchmove', handleTouchMoveNative);
         document.removeEventListener('touchend', handleTouchEndNative);
      };
   }, [isDragging]);
   return (
      <div
         className={`${className} picture-retoucher`}
         ref={containerRef}
         onMouseDown={handleMouseDown} // Обработчик для мыши
         onTouchStart={handleTouchStart} // Обработчик для касания
      >
         <img
            className='no-retouch'
            src={img1}
            alt='без ретуши'
         />
         <img
            className='img retouched'
            src={img2}
            alt='с ретушью'
            style={{ clipPath: `inset(0 0 0 ${linePosition}%)` }}
         />
         <div
            className='img line'
            style={{ left: `${linePosition}%` }}
         ></div>
      </div>
   );
};
