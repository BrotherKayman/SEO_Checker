import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

import './HeroSection.css';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isInBounds, setIsInBounds] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const xPos = event.clientX - rect.left;
        const yPos = event.clientY - rect.top;

        if (
          xPos >= 0 &&
          xPos <= rect.width &&
          yPos >= 0 &&
          yPos <= rect.height
        ) {
          setMousePosition({ x: xPos, y: yPos });
          setIsInBounds(true);
        } else {
          
          setMousePosition({ x: -200, y: -200 });
          setIsInBounds(false);
        }
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className='hero-container' ref={heroRef}>
      {isInBounds && (
        <div
          className='cursor-effect'
          style={{
            top: `${mousePosition.y - 100}px`,
            left: `${mousePosition.x - 100}px`,
          }}
        ></div>
      )}

      
    </div>
  );
};

export default HeroSection;
