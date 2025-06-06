import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const imageContainerRef = useRef(null)
  const timelineRef = useRef([])
  const progressRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  
  // Experience timeline data
  const timelineItems = [
    {
      year: "2023",
      role: "Senior Frontend Developer",
      company: "TechVision",
      description: "Led a team of 5 developers building modern web applications with React and Three.js."
    },
    {
      year: "2021",
      role: "Full Stack Developer",
      company: "Digital Solutions Inc.",
      description: "Developed scalable applications using MERN stack and implemented CI/CD pipelines."
    },
    {
      year: "2019",
      role: "UI/UX Designer & Developer",
      company: "Creative Studio",
      description: "Created interactive user experiences with a focus on motion design principles."
    }
  ]
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Updated transition effect that's smoother
      const transitionTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=150",
          end: "top center",
          onEnter: () => {
            setIsInView(true)
            // Make sure section is visible before animation
            gsap.set(sectionRef.current, { visibility: "visible" })
          },
          onLeaveBack: () => {
            setIsInView(false)
          },
          once: false
        }
      })
      
      // Create visual transition elements
      const transitionWave = document.querySelector('.home-to-about-transition')
      if (!transitionWave) {
        const wave = document.createElement('div')
        wave.className = 'home-to-about-transition'
        document.body.appendChild(wave)
      }
      
      // Split text for advanced animation
      let splitTitle
      if (titleRef.current) {
        splitTitle = new SplitText(titleRef.current, { type: "chars, words" })
        
        gsap.set(splitTitle.chars, { 
          y: 100,
          opacity: 0,
          rotationX: -60
        })
      }
      
      // Content animation
      const contentElems = contentRef.current ? contentRef.current.querySelectorAll('p, .skill-chip') : []
      gsap.set(contentElems, {
        y: 50,
        opacity: 0
      })
      
      // Image container animation
      gsap.set(imageContainerRef.current, {
        scale: 0.8,
        opacity: 0,
        rotationY: 15
      })
      
      // Timeline items animation
      gsap.set('.timeline-item', {
        opacity: 0,
        x: -50
      })
      
      gsap.set('.timeline-indicator', {
        height: 0
      })
      
      // Main animation timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom bottom",
          toggleActions: "play none none reverse"
        }
      })
      
      // Add animations to timeline
      mainTl
        .to(splitTitle.chars, {
          duration: 1.2,
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.03,
          ease: "back.out(1.7)"
        })
        .to(contentElems, {
          duration: 1,
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power3.out"
        }, "-=0.8")
        .to(imageContainerRef.current, {
          duration: 1.4,
          scale: 1,
          opacity: 1,
          rotationY: 0,
          ease: "power3.out"
        }, "-=1.2")
        .to('.timeline-item', {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          ease: "back.out(1.2)"
        }, "-=1")
        .to('.timeline-indicator', {
          height: '100%',
          duration: 1.8,
          ease: "power3.inOut"
        }, "-=1.5")
        
      // Parallax effect for the section
      gsap.to(sectionRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
      
      // Stats counter animation
      gsap.to('.counter-number', {
        textContent: function(i, target) {
          const finalValue = parseInt(target.getAttribute('data-value'))
          return Math.floor(finalValue)
        },
        duration: 2.5,
        ease: "power2.inOut",
        snap: { textContent: 1 },
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.stats-container',
          start: "top 80%"
        }
      })
      
      // 3D tilt effect for image
      const image = imageContainerRef.current
      if (image) {
        const tiltImage = (e) => {
          const xPos = (e.clientX / window.innerWidth) - 0.5
          const yPos = (e.clientY / window.innerHeight) - 0.5
          
          gsap.to(image, {
            rotationY: xPos * 15,
            rotationX: -yPos * 15,
            ease: "power1.out",
            duration: 0.5
          })
        }
        
        const resetTilt = () => {
          gsap.to(image, {
            rotationY: 0,
            rotationX: 0,
            ease: "power3.out",
            duration: 0.5
          })
        }
        
        image.addEventListener('mousemove', tiltImage)
        image.addEventListener('mouseleave', resetTilt)
        
        return () => {
          image.removeEventListener('mousemove', tiltImage)
          image.removeEventListener('mouseleave', resetTilt)
        }
      }
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="about-section relative min-h-screen py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 about-bg-gradient"></div>
      <div className="absolute inset-0 about-bg-shapes"></div>
      <div className="about-particles"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <div className="text-sm uppercase tracking-[0.3em] text-base-content/60 font-medium mb-4 glowing-text">
            About Me
          </div>
          <h2 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="text-gradient-about">Creative Developer</span>
          </h2>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left side: Image & stats */}
          <div className="space-y-16">
            {/* Profile Image with 3D hover effect */}
            <div 
              ref={imageContainerRef} 
              className="about-image-container mx-auto"
            >
              <div className="about-image-frame">
                <div className="about-image-glow"></div>
                <div className="about-image-content">
                  {/* Replace with your actual image */}
                  <div className="w-full h-full flex items-center justify-center text-9xl">
                    👨‍💻
                  </div>
                </div>
                <div className="about-image-reflections"></div>
              </div>
            </div>
            
            {/* Stats with animated counters */}
            <div className="stats-container grid grid-cols-3 gap-6">
              <div className="stat-card-enhanced group">
                <div className="stat-card-inner">
                  <div className="counter-number text-4xl font-black text-gradient-1" data-value="50">0</div>
                  <div className="text-sm uppercase tracking-wider text-base-content/60 mt-2">
                    Projects
                  </div>
                  <div className="stat-icon">🚀</div>
                </div>
              </div>
              <div className="stat-card-enhanced group">
                <div className="stat-card-inner">
                  <div className="counter-number text-4xl font-black text-gradient-2" data-value="5">0</div>
                  <div className="text-sm uppercase tracking-wider text-base-content/60 mt-2">
                    Years
                  </div>
                  <div className="stat-icon">⏳</div>
                </div>
              </div>
              <div className="stat-card-enhanced group">
                <div className="stat-card-inner">
                  <div className="counter-number text-4xl font-black text-gradient-3" data-value="100">0</div>
                  <div className="text-sm uppercase tracking-wider text-base-content/60 mt-2">
                    Success
                  </div>
                  <div className="stat-icon">🏆</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Content & timeline */}
          <div ref={contentRef} className="space-y-10">
            {/* About Content */}
            <div className="about-card-enhanced">
              <div className="about-card-inner">
                <p className="text-xl leading-relaxed text-base-content/90 mb-6">
                  I'm a passionate <span className="text-gradient-about">full-stack developer</span> and <span className="text-gradient-about">UI/UX enthusiast</span> with a love for creating stunning digital experiences that merge aesthetics with functionality.
                </p>
                
                <p className="text-lg leading-relaxed text-base-content/80 mb-8">
                  Through years of exploration and growth, I've developed a unique approach to design and development that emphasizes user experience, performant code, and creative problem-solving. I constantly push the boundaries of what's possible in digital design.
                </p>
                
                {/* Skill chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="skill-chip">React</span>
                  <span className="skill-chip">Three.js</span>
                  <span className="skill-chip">GSAP</span>
                  <span className="skill-chip">Node.js</span>
                  <span className="skill-chip">UI/UX Design</span>
                  <span className="skill-chip">Creative Coding</span>
                </div>
                
                {/* CTA Button */}
                <button className="btn-about-cta group">
                  <span className="btn-text">Download Resume</span>
                  <span className="btn-icon">📄</span>
                  <span className="btn-particle-container"></span>
                </button>
              </div>
            </div>
            
            {/* Experience Timeline */}
            <div className="about-timeline-container">
              <h3 className="text-xl font-bold mb-6 text-gradient-about">Professional Journey</h3>
              
              <div className="timeline-wrapper">
                <div className="timeline-track">
                  <div className="timeline-indicator"></div>
                </div>
                
                {timelineItems.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <span className="timeline-year">{item.year}</span>
                      <h4 className="timeline-role">{item.role}</h4>
                      <span className="timeline-company">{item.company}</span>
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Quote Section */}
        <div className="mt-32 text-center max-w-4xl mx-auto">
          <div className="quote-container">
            <div className="quote-mark">"</div>
            <blockquote className="quote-text">
              I believe the best digital experiences merge technology, design, and storytelling
              into something that feels like magic.
            </blockquote>
            <div className="quote-attribution">— My Design Philosophy</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About