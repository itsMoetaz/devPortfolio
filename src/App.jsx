import React, { Suspense, useEffect, useState, useRef, memo, useMemo, useCallback, lazy } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import ScrambledText from './styles/ScrambledText'
import FloatingMenu from './components/FloatingMenu'
import { motion, AnimatePresence } from 'framer-motion'
import SpaceLoader from './components/SpaceLoader';

// Lazy load heavy components
const Projects = lazy(() => import('./components/Projects'))


gsap.registerPlugin(ScrollTrigger)

// // Space Astronaut Loader Component
// const SpaceLoader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader-container">
//         <div className="box-of-star1">
//           <div className="star star-position1" />
//           <div className="star star-position2" />
//           <div className="star star-position3" />
//           <div className="star star-position4" />
//           <div className="star star-position5" />
//           <div className="star star-position6" />
//           <div className="star star-position7" />
//         </div>
//         <div className="box-of-star2">
//           <div className="star star-position1" />
//           <div className="star star-position2" />
//           <div className="star star-position3" />
//           <div className="star star-position4" />
//           <div className="star star-position5" />
//           <div className="star star-position6" />
//           <div className="star star-position7" />
//         </div>
//         <div className="box-of-star3">
//           <div className="star star-position1" />
//           <div className="star star-position2" />
//           <div className="star star-position3" />
//           <div className="star star-position4" />
//           <div className="star star-position5" />
//           <div className="star star-position6" />
//           <div className="star star-position7" />
//         </div>
//         <div className="box-of-star4">
//           <div className="star star-position1" />
//           <div className="star star-position2" />
//           <div className="star star-position3" />
//           <div className="star star-position4" />
//           <div className="star star-position5" />
//           <div className="star star-position6" />
//           <div className="star star-position7" />
//         </div>
//         <div data-js="astro" className="astronaut">
//           <div className="head" />
//           <div className="arm arm-left" />
//           <div className="arm arm-right" />
//           <div className="body">
//             <div className="panel" />
//           </div>
//           <div className="leg leg-left" />
//           <div className="leg leg-right" />
//           <div className="schoolbag" />
//         </div>
        
//         {/* Loading Text */}
//         <div className="loading-text">
//           <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">
//             Exploring the Digital Universe
//           </h2>
//           <p className="text-white/70 text-lg">
//             Preparing your cosmic journey...
//           </p>
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .loader-container {
//     position: relative;
//     width: 100vw;
//     height: 100vh;
//     background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f3460 100%);
//     overflow: hidden;
//   }

//   .loading-text {
//     position: absolute;
//     bottom: 20%;
//     left: 50%;
//     transform: translateX(-50%);
//     text-align: center;
//     z-index: 20;
//   }

//   @keyframes snow {
//     0% {
//       opacity: 0;
//       transform: translateY(0px);
//     }
//     20% {
//       opacity: 1;
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(100vh);
//     }
//   }

//   @keyframes astronaut {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }

//   .box-of-star1,
//   .box-of-star2,
//   .box-of-star3,
//   .box-of-star4 {
//     width: 100%;
//     position: absolute;
//     z-index: 10;
//     left: 0;
//     top: 0;
//     transform: translateY(0px);
//     height: 100vh;
//   }

//   .box-of-star1 {
//     animation: snow 5s linear infinite;
//   }

//   .box-of-star2 {
//     animation: snow 5s -1.64s linear infinite;
//   }

//   .box-of-star3 {
//     animation: snow 5s -2.30s linear infinite;
//   }

//   .box-of-star4 {
//     animation: snow 5s -3.30s linear infinite;
//   }

//   .star {
//     width: 3px;
//     height: 3px;
//     border-radius: 50%;
//     background-color: #FFF;
//     position: absolute;
//     z-index: 10;
//     opacity: 0.7;
//   }

//   .star:before {
//     content: "";
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background-color: #FFF;
//     position: absolute;
//     z-index: 10;
//     top: 80px;
//     left: 70px;
//     opacity: .7;
//   }

//   .star:after {
//     content: "";
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     background-color: #FFF;
//     position: absolute;
//     z-index: 10;
//     top: 8px;
//     left: 170px;
//     opacity: .9;
//   }

//   .star-position1 {
//     top: 30px;
//     left: 20px;
//   }

//   .star-position2 {
//     top: 110px;
//     left: 25%;
//   }

//   .star-position3 {
//     top: 60px;
//     left: 50%;
//   }

//   .star-position4 {
//     top: 120px;
//     left: 75%;
//   }

//   .star-position5 {
//     top: 20px;
//     left: 90%;
//   }

//   .star-position6 {
//     top: 90px;
//     left: 95%;
//   }

//   .star-position7 {
//     top: 30px;
//     left: 80%;
//   }

//   .astronaut {
//     width: 250px;
//     height: 300px;
//     position: absolute;
//     z-index: 11;
//     top: calc(50% - 150px);
//     left: calc(50% - 125px);
//     animation: astronaut 5s linear infinite;
//   }

//   .schoolbag {
//     width: 100px;
//     height: 150px;
//     position: absolute;
//     z-index: 1;
//     top: calc(50% - 75px);
//     left: calc(50% - 50px);
//     background-color: #94b7ca;
//     border-radius: 50px 50px 0 0 / 30px 30px 0 0;
//   }

//   .head {
//     width: 97px;
//     height: 80px;
//     position: absolute;
//     z-index: 3;
//     background: linear-gradient(90deg, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
//     border-radius: 50%;
//     top: 34px;
//     left: calc(50% - 47.5px);
//   }

//   .head:after {
//     content: "";
//     width: 60px;
//     height: 50px;
//     position: absolute;
//     top: calc(50% - 25px);
//     left: calc(50% - 30px);
//     background: linear-gradient(180deg, #15aece 0%, #15aece 50%, #0391bf 50%, #0391bf 100%);
//     border-radius: 15px;
//   }

//   .head:before {
//     content: "";
//     width: 12px;
//     height: 25px;
//     position: absolute;
//     top: calc(50% - 12.5px);
//     left: -4px;
//     background-color: #618095;
//     border-radius: 5px;
//     box-shadow: 92px 0px 0px #618095;
//   }

//   .body {
//     width: 85px;
//     height: 100px;
//     position: absolute;
//     z-index: 2;
//     background-color: #fffbff;
//     border-radius: 40px / 20px;
//     top: 105px;
//     left: calc(50% - 41px);
//     background: linear-gradient(90deg, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
//   }

//   .panel {
//     width: 60px;
//     height: 40px;
//     position: absolute;
//     top: 20px;
//     left: calc(50% - 30px);
//     background-color: #b7cceb;
//   }

//   .panel:before {
//     content: "";
//     width: 30px;
//     height: 5px;
//     position: absolute;
//     top: 9px;
//     left: 7px;
//     background-color: #fbfdfa;
//     box-shadow: 0px 9px 0px #fbfdfa, 0px 18px 0px #fbfdfa;
//   }

//   .panel:after {
//     content: "";
//     width: 8px;
//     height: 8px;
//     position: absolute;
//     top: 9px;
//     right: 7px;
//     background-color: #fbfdfa;
//     border-radius: 50%;
//     box-shadow: 0px 14px 0px 2px #fbfdfa;
//   }

//   .arm {
//     width: 80px;
//     height: 30px;
//     position: absolute;
//     top: 121px;
//     z-index: 2;
//   }

//   .arm-left {
//     left: 30px;
//     background-color: #e3e8eb;
//     border-radius: 0 0 0 39px;
//   }

//   .arm-right {
//     right: 30px;
//     background-color: #fbfdfa;
//     border-radius: 0 0 39px 0;
//   }

//   .arm-left:before,
//   .arm-right:before {
//     content: "";
//     width: 30px;
//     height: 70px;
//     position: absolute;
//     top: -40px;
//   }

//   .arm-left:before {
//     border-radius: 50px 50px 0px 120px / 50px 50px 0 110px;
//     left: 0;
//     background-color: #e3e8eb;
//   }

//   .arm-right:before {
//     border-radius: 50px 50px 120px 0 / 50px 50px 110px 0;
//     right: 0;
//     background-color: #fbfdfa;
//   }

//   .arm-left:after,
//   .arm-right:after {
//     content: "";
//     width: 30px;
//     height: 10px;
//     position: absolute;
//     top: -24px;
//   }

//   .arm-left:after {
//     background-color: #6e91a4;
//     left: 0;
//   }

//   .arm-right:after {
//     right: 0;
//     background-color: #b6d2e0;
//   }

//   .leg {
//     width: 30px;
//     height: 40px;
//     position: absolute;
//     z-index: 2;
//     bottom: 70px;
//   }

//   .leg-left {
//     left: 76px;
//     background-color: #e3e8eb;
//     transform: rotate(20deg);
//   }

//   .leg-right {
//     right: 73px;
//     background-color: #fbfdfa;
//     transform: rotate(-20deg);
//   }

//   .leg-left:before,
//   .leg-right:before {
//     content: "";
//     width: 50px;
//     height: 25px;
//     position: absolute;
//     bottom: -26px;
//   }

//   .leg-left:before {
//     left: -20px;
//     background-color: #e3e8eb;
//     border-radius: 30px 0 0 0;
//     border-bottom: 10px solid #6d96ac;
//   }

//   .leg-right:before {
//     right: -20px;
//     background-color: #fbfdfa;
//     border-radius: 0 30px 0 0;
//     border-bottom: 10px solid #b0cfe4;
//   }

//   @media (max-width: 768px) {
//     .astronaut {
//       width: 200px;
//       height: 240px;
//       top: calc(50% - 120px);
//       left: calc(50% - 100px);
//     }

//     .loading-text {
//       bottom: 15%;
//     }

//     .loading-text h2 {
//       font-size: 1.5rem;
//     }

//     .loading-text p {
//       font-size: 1rem;
//     }
//   }
// `;

// Enhanced Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">⚠️</div>
            <h2 className="text-2xl font-bold text-gradient mb-4">Something went wrong!</h2>
            <p className="text-base-content/70">Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary-modern mt-4"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showNavbar, setShowNavbar] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const pageLoaderRef = useRef()
  const heroTitleRef = useRef()
  const heroSubtitleRef = useRef()
  const heroCtaRef = useRef()
  const hero3DRef = useRef()
  const progressBarRef = useRef()
  const navbarRef = useRef()
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const MemoizedLoader = React.memo(() => <SpaceLoader />);
 
  // Optimized scroll handler using RAF
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrolled / maxScroll
        setScrollProgress(progress)

        // Update progress bar efficiently
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`
        }

        // Navbar behavior
        if (scrolled > lastScrollY.current && scrolled > 100) {
          setShowNavbar(false)
        } else {
          setShowNavbar(true)
        }
        lastScrollY.current = scrolled
        ticking.current = false
      })
      ticking.current = true
    }
  }, [])

  useEffect(() => {
    // Load spline viewer with optimization
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.2/build/spline-viewer.js'
    script.type = 'module'
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    // Set theme
    document.documentElement.setAttribute('data-theme', 'synthwave')
    
    // Passive scroll listener for better performance
    document.addEventListener('scroll', handleScroll, { passive: true })

    // Enhanced loading sequence with space loader
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      
      // Hero entrance animation (reduced complexity)
      setTimeout(() => {
        const heroTl = gsap.timeline()
        
        if (hero3DRef.current) {
          gsap.set(hero3DRef.current, { opacity: 0, scale: 0.8 })
          heroTl.to(hero3DRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
          })
        }
        
        if (heroTitleRef.current) {
          const titleElements = heroTitleRef.current.children
          gsap.set(titleElements, { y: 50, opacity: 0 })
          heroTl.to(titleElements, { 
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          }, "-=1")
        }
        
        if (heroSubtitleRef.current) {
          gsap.set(heroSubtitleRef.current, { y: 30, opacity: 0 })
          heroTl.to(heroSubtitleRef.current, { 
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.5")
        }
        
        if (heroCtaRef.current) {
          const buttons = heroCtaRef.current.children
          gsap.set(buttons, { y: 30, opacity: 0 })
          heroTl.to(buttons, { 
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.3")
        }
      }, 500)
    }, 1000) // Extended loading time to show the beautiful space loader

    return () => {
      document.removeEventListener('scroll', handleScroll)
      clearTimeout(loadingTimer)
    }
  }, [handleScroll])

  // ScrollTrigger for section transitions
  useEffect(() => {
    const homeToAboutTransition = document.querySelector('.home-to-about-transition')
    
    if (homeToAboutTransition) {
      ScrollTrigger.create({
        trigger: '#about',
        start: "top bottom-=100",
        end: "top center",
        onEnter: () => {
          gsap.to(homeToAboutTransition, {
            opacity: 0.8, 
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(homeToAboutTransition, {
                opacity: 0,
                duration: 0.8,
                delay: 0.1
              })
            }
          })
        },
        onLeaveBack: () => {
          gsap.to(homeToAboutTransition, {
            opacity: 0,
            duration: 0.3
          })
        }
      })
    }
  }, [])

  // Effect to handle screen resize
  useEffect(() => {
    // Function to update screen size state
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call once to set initial state
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Space Astronaut Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <MemoizedLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-base-300/20 z-50">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transform origin-left scale-x-0"
        ></div>
      </div>

      <div className="min-h-screen bg-base-100 text-base-content overflow-x-hidden relative">
        
        {/* Enhanced Background Effects */}
        <div className="tv-screen-bg fixed inset-0 z-0"></div>
        <div className="tv-static fixed inset-0 z-0"></div>
        <div className="tv-scan-lines fixed inset-0 z-0"></div>
        <div className="floating-particles fixed inset-0 z-0"></div>
        
        {/* Enhanced Navigation */}
        <nav 
          ref={navbarRef}
          className={`navbar-enhanced fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
            showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          } ${
            isMobile ? 'hidden' : '' 
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-6 lg:px-8 py-2">
            {/* Logo - Left Side */}
            <div className="text-2xl font-black text-gradient-logo hero-logo">
              <span className="text-gradient-logo">My</span>Portfolio
            </div>
            
            {/* Empty Middle Section */}
            <div className="flex-1"></div>
            
            {/* Let's Talk Button - Right Side */}
            <button 
              className="btn-gradient-modern interactive"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Let's Talk
            </button>
          </div>
        </nav>
        
        {/* Enhanced Hero Section */}
        <section id="home" className="hero-section relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 hero-gradient-bg"></div>
          
          <div className="container-full max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
              
              {/* Enhanced 3D Animation Side */}
              <div ref={hero3DRef} className="order-2 lg:order-1 flex justify-center items-center">
                <div className="w-full h-[600px] lg:h-[700px] canvas-container">
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <spline-viewer url="https://prod.spline.design/jiPklSYL232a7B8J/scene.splinecode"></spline-viewer>
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </div>

              {/* Enhanced Content Side */}
              <div className="order-1 lg:order-2 space-y-10 text-center lg:text-left">
                <div className="space-y-6">

                  
                  <div ref={heroTitleRef} className="space-y-4">
                    <h1 className="hero-title-enhanced text-xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl font-black leading-tight">
                      <span className="hero-gradient-1">Welcome to my digital universe </span>
                    </h1>

                  </div>
                </div>

                <ScrambledText
  className="scrambled-text-demo text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto lg:mx-0"
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars={".:"}
>
                  Crafting tomorrow's digital experiences with cutting-edge technology, 
                  innovative design, and boundless creativity
</ScrambledText>
                
                <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-6 lg:justify-center pt-2">
                  <button className="btn-hero-primary interactive group overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <span>Explore My Universe</span>
                      <span className="text-xl transition-transform group-hover:translate-x-1">🚀</span>
                    </span>
                    <div className="btn-particles"></div>
                  </button>

                </div>


              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="scroll-indicator-enhanced z-20">
            <div className="scroll-animation">
              <div className="scroll-line"></div>
              <div className="scroll-dot"></div>
            </div>
          </div>
        </section>

        <div className="relative z-10">
          <About />
          <Projects />
          <Contact />
          <Footer />
        </div>

        {/* Floating Menu */}
        <FloatingMenu />
      </div>
    </>
  )
}


export default App