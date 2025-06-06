import React, { Suspense, useEffect, useState, useRef, memo, useMemo, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ThemeController from './components/ThemeController'
import PerformanceMonitor from './components/PerformanceMonitor'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Memoized components for better performance
const MemoizedAbout = memo(About)
const MemoizedSkills = memo(Skills)
const MemoizedProjects = memo(Projects)
const MemoizedContact = memo(Contact)
const MemoizedFooter = memo(Footer)
const MemoizedHero3D = memo(Hero3D)

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
  const pageLoaderRef = useRef()
  const heroTitleRef = useRef()
  const heroSubtitleRef = useRef()
  const heroCtaRef = useRef()
  const hero3DRef = useRef()
  const progressBarRef = useRef()
  const navbarRef = useRef()
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

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

    // Optimized loading sequence
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      
      const pageLoader = pageLoaderRef.current
      if (pageLoader) {
        gsap.to(pageLoader, { 
          opacity: 0,
          duration: 1, 
          ease: "power2.inOut",
          onComplete: () => {
            if (pageLoader) {
              pageLoader.style.display = 'none'
            }
          }
        })
      }
      
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
    }, 2000) // Reduced loading time

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

  return (
    <>
      {/* Enhanced Page Loader */}
      <div ref={pageLoaderRef} className="page-loader fixed inset-0 z-[100] flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="loader-animation">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </div>
          <div className="space-y-4">
            <div className="text-7xl animate-pulse">🚀</div>
            <h2 className="text-3xl font-bold text-gradient animate-fade-in">Launching Experience</h2>
            <p className="text-base-content/70 animate-fade-in-delayed">Preparing your journey through the digital cosmos</p>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-base-300/20 z-50">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transform origin-left scale-x-0"
        ></div>
      </div>

      <div className="min-h-screen bg-base-100 text-base-content overflow-x-hidden relative">
        <ThemeController />
        
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
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-6 lg:px-8 py-6">
            <div className="text-2xl font-black text-gradient-logo hero-logo">
              <span className="text-gradient-logo">Dev</span>Portfolio
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#home" className="nav-link interactive">Home</a>
              <a href="#about" className="nav-link interactive">About</a>
              <a href="#skills" className="nav-link interactive">Skills</a>
              <a href="#projects" className="nav-link interactive">Projects</a>
              <a href="#contact" className="nav-link interactive">Contact</a>
            </div>
            <button className="btn-gradient-modern interactive">
              Get In Touch
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
                  <div className="text-sm uppercase tracking-[0.4em] text-base-content/60 font-medium animate-fade-in">
                    Welcome to my digital universe
                  </div>
                  
                  <div ref={heroTitleRef} className="space-y-4">
                    <h1 className="hero-title-enhanced text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                      <span className="hero-gradient-1">Future</span>
                    </h1>
                    <h1 className="hero-title-enhanced text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                      <span className="hero-gradient-2">Developer</span>
                    </h1>
                  </div>
                </div>
                
                <p 
                  ref={heroSubtitleRef} 
                  className="hero-subtitle-enhanced text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-2xl text-base-content/80"
                >
                  Crafting tomorrow's digital experiences with cutting-edge technology, 
                  innovative design, and boundless creativity
                </p>
                
                <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-6 lg:justify-start justify-center pt-6">
                  <button className="btn-hero-primary interactive group overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <span>Explore My Universe</span>
                      <span className="text-xl transition-transform group-hover:translate-x-1">🚀</span>
                    </span>
                    <div className="btn-particles"></div>
                  </button>
                  <button className="btn-hero-secondary interactive group overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <span>Download Portfolio</span>
                      <span className="text-xl transition-transform group-hover:rotate-12">📄</span>
                    </span>
                    <div className="btn-particles"></div>
                  </button>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-8 pt-12 max-w-md lg:max-w-none mx-auto">
                  <div className="stat-item text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-black text-gradient stat-number">50+</div>
                    <div className="text-sm text-base-content/60 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="stat-item text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-black text-gradient stat-number">5+</div>
                    <div className="text-sm text-base-content/60 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="stat-item text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-black text-gradient stat-number">100%</div>
                    <div className="text-sm text-base-content/60 uppercase tracking-wider">Success</div>
                  </div>
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
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
        
        {/* Performance Monitor - Development Only */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      </div>
    </>
  )
}


export default App