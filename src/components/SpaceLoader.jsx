import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

// Optimized Star component - reduces DOM nodes
const Star = ({ className }) => <div className={`star ${className}`} />;

// Optimized Space Loader Component
const SpaceLoader = () => {
  // Use React Spring for astronaut animation - better performance than CSS
  const astronautAnim = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 5000 },
    loop: true,
  });
  
  return (
    <OptimizedWrapper>
      <div className="loader-container">
        {/* Reduced number of star elements */}
        <div className="box-of-stars">
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <Star key={i} className={`star-position${i}`} />
          ))}
        </div>
        
        {/* Use React Spring for smoother animation */}
        <animated.div 
          style={{ ...astronautAnim, transformOrigin: 'center' }} 
          className="astronaut"
        >
          <div className="head" />
          <div className="arm arm-left" />
          <div className="arm arm-right" />
          <div className="body">
            <div className="panel" />
          </div>
          <div className="leg leg-left" />
          <div className="leg leg-right" />
          <div className="schoolbag" />
        </animated.div>
        
        <div className="loading-text">
          <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">
            Exploring the Digital Universe
          </h2>
          <p className="text-white/70 text-lg">
            Preparing your cosmic journey...
          </p>
        </div>
      </div>
    </OptimizedWrapper>
  );
};

// Optimized styled component with reduced CSS complexity
const OptimizedWrapper = styled.div`
  .loader-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f3460 100%);
    overflow: hidden;
  }

  .loading-text {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 20;
  }

  /* Simplified star animation */
  .box-of-stars {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .star {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #FFF;
    position: absolute;
    z-index: 10;
    opacity: 0.7;
    animation: fall 5s linear infinite;
    will-change: transform;
  }

  /* Single animation for stars with different delays */
  @keyframes fall {
    0% { transform: translateY(-10px); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0.7; }
  }

  /* Position stars with delay modifiers */
  .star-position1 { left: 10%; animation-delay: 0s; }
  .star-position2 { left: 25%; animation-delay: -1.1s; }
  .star-position3 { left: 40%; animation-delay: -2.3s; }
  .star-position4 { left: 60%; animation-delay: -0.6s; }
  .star-position5 { left: 75%; animation-delay: -1.7s; }
  .star-position6 { left: 85%; animation-delay: -3.1s; }
  .star-position7 { left: 95%; animation-delay: -2.4s; }

  /* Simplified astronaut styles - removed pseudo elements where possible */
  .astronaut {
    width: 250px;
    height: 300px;
    position: absolute;
    z-index: 11;
    top: calc(50% - 150px);
    left: calc(50% - 125px);
    will-change: transform;
  }

  /* Keep essential styles for astronaut parts but optimize */
  .head, .body, .arm, .leg, .schoolbag {
    position: absolute;
    background-color: #e3e8eb;
  }

  /* Remaining astronaut styles... simplified */
  .head {
    width: 97px;
    height: 80px;
    background: linear-gradient(90deg, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
    border-radius: 50%;
    top: 34px;
    left: calc(50% - 47.5px);
    z-index: 3;
  }

  /* Only keep essential media query */
  @media (max-width: 768px) {
    .astronaut {
      width: 180px;
      height: 220px;
      top: calc(50% - 110px);
      left: calc(50% - 90px);
    }
  }
`;

export default SpaceLoader;