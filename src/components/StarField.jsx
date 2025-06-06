import React, { useEffect, useRef, useState } from 'react';

const StarField = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const stars = [];
    const numStars = 300;

    // Initialize stars with different types
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseRadius: Math.random() * 3 + 0.5,
        radius: Math.random() * 3 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#a855f7',
        pulseSpeed: Math.random() * 0.02 + 0.01,
        drift: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star, index) => {
        // Twinkling effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Gentle drift
        star.x += star.drift.x;
        star.y += star.drift.y;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Mouse interaction - smoother and slower
        const mouseDistance = Math.sqrt(
          Math.pow(star.x - mousePos.current.x, 2) + Math.pow(star.y - mousePos.current.y, 2)
        );
        const interactionRadius = 150;
        
        if (mouseDistance < interactionRadius) {
          const force = (interactionRadius - mouseDistance) / interactionRadius;
          // Slower, smoother radius changes
          const targetRadius = star.baseRadius + force * 1.5;
          star.radius += (targetRadius - star.radius) * 0.1;
          
          // Smoother opacity changes
          const targetOpacity = Math.min(Math.abs(star.opacity) + force * 0.3, 1);
          star.opacity += (targetOpacity - Math.abs(star.opacity)) * 0.1;
        } else {
          // Smooth return to base state
          star.radius += (star.baseRadius - star.radius) * 0.05;
        }

        // Draw star with glow effect
        ctx.save();
        ctx.globalAlpha = Math.abs(star.opacity);
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, 2 * Math.PI);
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
        gradient.addColorStop(0, star.color + '40');
        gradient.addColorStop(1, star.color + '00');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner bright star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.fill();

        // Sparkle effect for bright stars
        if (star.opacity > 0.8 && star.radius > 2) {
          ctx.strokeStyle = star.color + '80';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2, star.y);
          ctx.lineTo(star.x + star.radius * 2, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2);
          ctx.lineTo(star.x, star.y + star.radius * 2);
          ctx.stroke();
        }

        ctx.restore();

        // Create connections between nearby stars (less frequent)
        if (index % 10 === 0) { // Only check every 10th star for performance
          stars.forEach((otherStar, otherIndex) => {
            if (index !== otherIndex) {
              const distance = Math.sqrt(
                Math.pow(star.x - otherStar.x, 2) + Math.pow(star.y - otherStar.y, 2)
              );
              
              if (distance < 150 && Math.random() > 0.999) {
                ctx.save();
                ctx.globalAlpha = 0.1;
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(otherStar.x, otherStar.y);
                ctx.stroke();
                ctx.restore();
              }
            }
          });
        }
      });

      // Add shooting stars occasionally (less frequent)
      if (Math.random() > 0.998) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: -10,
          speed: Math.random() * 3 + 2,
          length: Math.random() * 40 + 15,
          opacity: 1
        };

        const drawShootingStar = () => {
          ctx.save();
          ctx.globalAlpha = shootingStar.opacity;
          const gradient = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            shootingStar.x, shootingStar.y + shootingStar.length
          );
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#8b5cf6');
          gradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x, shootingStar.y + shootingStar.length);
          ctx.stroke();
          ctx.restore();

          shootingStar.y += shootingStar.speed;
          shootingStar.opacity -= 0.01;

          if (shootingStar.y < canvas.height && shootingStar.opacity > 0) {
            requestAnimationFrame(drawShootingStar);
          }
        };
        drawShootingStar();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array - effect runs only once

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarField;