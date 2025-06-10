import React from 'react';
import styled from 'styled-components';

const NeonLoader = () => {
  return (
    <OptimizedWrapper>
      <div className="loader-container">
        <div className="neon-text">
          <h1 className="title">LOADING</h1>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>
    </OptimizedWrapper>
  );
};

const OptimizedWrapper = styled.div`
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #0f0f1e 0%, #1a142b 100%);
  }

  .neon-text {
    text-align: center;
  }

  .title {
    font-family: monospace;
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.2em;
    margin-bottom: 2rem;
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #9933ff;
  }

  .loader-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: 2px;
  }

  .loader-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #9933ff, #33ccff);
    transform-origin: left;
    animation: load 2s ease-in-out infinite;
  }

  @keyframes load {
    0% {
      transform: scaleX(0);
      transform-origin: left;
    }
    49% {
      transform: scaleX(1);
      transform-origin: left;
    }
    50% {
      transform: scaleX(1);
      transform-origin: right;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }
  }
`;

export default React.memo(NeonLoader);