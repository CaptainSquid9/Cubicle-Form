import React, { useState} from 'react';
import {Final} from './Intro';

const useSwipe = (minSwipeDistance: number = 50) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndX(null);
    setStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    handleSwipe();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setEndX(null);
    setStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX !== null) {
      setEndX(e.clientX);
    }
  };

  const onMouseUp = () => {
    handleSwipe();
  };

  const handleSwipe = () => {
    if (startX === null || endX === null) return;

    const distance = startX - endX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isRightSwipe) {
      console.log('swipe', isLeftSwipe ? 'left' : 'right');
      Final();
      //run Final function
    }

    // Reset state after handling swipe
    setStartX(null);
    setEndX(null);
  };

  return {onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp };
};

export default useSwipe;
