import React, { useState, useEffect } from 'react';
import useSwipe from './useSwipe';

const SwipeComponent: React.FC = () => {
  const { onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp } = useSwipe();
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onMouseDown(e);
    setIsMouseDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMouseDown) {
      onMouseMove(e);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onMouseUp();
    setIsMouseDown(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDown) {
        onMouseUp();
        setIsMouseDown(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isMouseDown, onMouseUp]);

  return (
    <div
      id='SwipeContainer'
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ width: '100%', height: '80vh', zIndex:"20", position:"absolute"}}
    >    </div>
  );
};

export default SwipeComponent;
