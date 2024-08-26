import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import { Button } from './Button';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 }); // Initialize off-screen
  const [isInBounds, setIsInBounds] = useState(false); // Track if the cursor is within bounds
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const xPos = event.clientX - rect.left;
        const yPos = event.clientY - rect.top;

        // Check if the mouse is within the bounds of the container
        if (
          xPos >= 0 &&
          xPos <= rect.width &&
          yPos >= 0 &&
          yPos <= rect.height
        ) {
          setMousePosition({ x: xPos, y: yPos });
          setIsInBounds(true);
        } else {
          // Fade effect by moving the cursor off the screen in the direction it leaves
          if (xPos < 0) {
            setMousePosition({ x: -100, y: yPos });
          } else if (xPos > rect.width) {
            setMousePosition({ x: rect.width + 100, y: yPos });
          } else if (yPos < 0) {
            setMousePosition({ x: xPos, y: -100 });
          } else if (yPos > rect.height) {
            setMousePosition({ x: xPos, y: rect.height + 100 });
          }
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
      <div
        className='cursor-effect'
        style={{
          top: `${mousePosition.y - 50}px`,
          left: `${mousePosition.x - 50}px`,
        }}
      ></div>

      <h1>RANK HIGHER</h1>
      <p>Try our free SEO tool</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => console.log('hey')}
        >
          WATCH DEMO <i className='watch-demo' />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
