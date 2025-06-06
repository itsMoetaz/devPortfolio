import { useEffect, useRef, useState, useTransition, useDeferredValue, memo, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = memo(() => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const projectsGridRef = useRef()
  const [activeFilter, setActiveFilter] = useState('all')
  
  // React 18 performance features
  const [isPending, startTransition] = useTransition()
  const deferredFilter = useDeferredValue(activeFilter)

  const projects = [
    {
      id: 1,
      title: "Neural Commerce Platform",
      description: "AI-powered e-commerce platform with predictive analytics, dynamic pricing, and personalized shopping experiences",
      longDescription: "A revolutionary e-commerce solution that leverages machine learning to create personalized shopping journeys, optimize inventory management, and maximize conversion rates through intelligent recommendations.",
      image: "🛒",
      tags: ["React", "Node.js", "TensorFlow", "MongoDB", "Stripe"],
      category: "fullstack",
      color: "from-blue-500 via-purple-500 to-pink-500",
      link: "#",
      github: "#",
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "Immersive 3D Portfolio",
      description: "Interactive 3D portfolio website with physics-based animations and virtual reality support",
      longDescription: "A cutting-edge portfolio experience featuring Three.js powered 3D environments, realistic physics simulations, and WebXR compatibility for an unforgettable user journey.",
      image: "🎨",
      tags: ["Three.js", "React", "GSAP", "WebXR", "Blender"],
      category: "frontend",
      color: "from-green-400 via-blue-500 to-purple-600",
      link: "#",
      github: "#",
      featured: true,
      year: "2024"
    },
    {
      id: 3,
      title: "AI Conversation Hub",
      description: "Real-time chat application with advanced AI integration, sentiment analysis, and multilingual support",
      longDescription: "Next-generation communication platform featuring GPT-4 integration, real-time language translation, emotion detection, and smart conversation insights.",
      image: "🤖",
      tags: ["React", "OpenAI", "Socket.io", "Python", "Redis"],
      category: "fullstack",
      color: "from-orange-400 via-red-500 to-pink-600",
      link: "#",
      github: "#",
      featured: false,
      year: "2023"
    },
    {
      id: 4,
      title: "Quantum Task Manager",
      description: "Collaborative project management with quantum-inspired algorithms for optimal task scheduling",
      longDescription: "Revolutionary task management system using quantum computing principles to optimize team workflows, predict project timelines, and enhance productivity through intelligent automation.",
      image: "📋",
      tags: ["Next.js", "PostgreSQL", "Quantum.js", "GraphQL"],
      category: "fullstack",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      link: "#",
      github: "#",
      featured: true,
      year: "2023"
    },
    {
      id: 5,
      title: "Sonic Wave Platform",
      description: "Advanced music streaming platform with spatial audio, AI curation, and social features",
      longDescription: "Next-generation music platform featuring 3D spatial audio, AI-powered playlist generation, collaborative listening rooms, and immersive visualizations.",
      image: "🎵",
      tags: ["React", "Node.js", "WebAudio API", "AWS", "ML"],
      category: "fullstack",
      color: "from-purple-400 via-pink-500 to-red-500",
      link: "#",
      github: "#",
      featured: false,
      year: "2023"
    },
    {
      id: 6,
      title: "Weather Intelligence Dashboard",
      description: "Beautiful weather application with AI predictions, climate analysis, and disaster alerts",
      longDescription: "Sophisticated weather platform combining real-time data, machine learning predictions, climate change analysis, and emergency notification systems with stunning visualizations.",
      image: "🌤️",
      tags: ["Vue.js", "D3.js", "Python", "ML", "APIs"],
      category: "frontend",
      color: "from-yellow-400 via-orange-500 to-red-500",
      link: "#",
      github: "#",
      featured: false,
      year: "2022"
    }
  ]

  const filters = [
    { name: 'All Projects', value: 'all' },
    { name: 'Full Stack', value: 'fullstack' },
    { name: 'Frontend', value: 'frontend' },
    { name: 'Featured', value: 'featured' }
  ]

  const filteredProjects = useMemo(() => {
    if (deferredFilter === 'all') return projects
    if (deferredFilter === 'featured') return projects.filter(project => project.featured)
    return projects.filter(project => project.category === deferredFilter)
  }, [deferredFilter])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: 100, opacity: 0, scale: 0.9 })
      gsap.set('.project-card-enhanced', { y: 120, opacity: 0, rotationY: 15, scale: 0.8 })
      gsap.set('.filter-btn', { y: 30, opacity: 0, scale: 0.9 })

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate title
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)"
      })

      // Animate filters
      .to('.filter-btn', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=1")

      // Animate project cards
      .to('.project-card-enhanced', {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 1.5,
          grid: "auto",
          from: "center"
        },
        ease: "power3.out"
      }, "-=0.8")

      // Parallax effect
      gsap.to(sectionRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      })

      // Continuous floating animation
      gsap.to('.project-card-enhanced', {
        y: -8,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
        delay: 2
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleFilterChange = (filter) => {
    // Use startTransition for non-urgent filter updates
    startTransition(() => {
      setActiveFilter(filter)
    })
    
    // Animate filter transition
    gsap.to('.project-card-enhanced', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        // Re-animate filtered projects
        gsap.fromTo('.project-card-enhanced', 
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }
        )
      }
    })
  }

  return (
    <section id="projects" ref={sectionRef} className="projects-section-enhanced min-h-screen py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="projects-background-enhanced"></div>
      
      {/* Floating Code Elements */}
      <div className="projects-floating-code">
        {['</>', '{...}', '( )', '[ ]', '=>', '&&', '||', '??'].map((code, i) => (
          <div 
            key={i} 
            className="floating-code"
            style={{
              left: `${5 + (i * 13)}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + (i % 4)}s`
            }}
          >
            {code}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Section Title */}
          <div ref={titleRef} className="text-center mb-16">
            <div className="section-label mb-8">
              <span className="section-label-text">My Portfolio</span>
              <div className="section-label-line"></div>
            </div>
            <h2 className="text-6xl lg:text-7xl font-black leading-tight mb-8">
              <span className="text-base-content">Featured</span><br />
              <span className="title-gradient-enhanced">Projects</span>
            </h2>
            <p className="text-2xl text-base-content/70 max-w-3xl mx-auto">
              A curated collection of my most innovative and impactful digital creations, 
              each pushing the boundaries of what's possible
            </p>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`filter-btn ${activeFilter === filter.value ? 'active' : ''} ${isPending ? 'opacity-70' : ''}`}
                disabled={isPending}
              >
                {filter.name}
                {isPending && activeFilter !== filter.value && <span className="ml-2 loading loading-spinner loading-xs"></span>}
              </button>
            ))}
          </div>

          {/* Enhanced Projects Grid */}
          <div ref={projectsGridRef} className="projects-grid-enhanced">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card-enhanced ${project.featured ? 'featured' : ''}`}
              >
                <div className="project-card-inner">
                  {/* Project Header */}
                  <div className="project-header">
                    <div className={`project-image bg-gradient-to-br ${project.color}`}>
                      <div className="project-emoji">{project.image}</div>
                      <div className="project-overlay">
                        <div className="project-year">{project.year}</div>
                        {project.featured && <div className="featured-badge">⭐ Featured</div>}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="project-content">
                    <div className="project-meta">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                    </div>

                    {/* Enhanced Tags */}
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="project-tag"
                          style={{ animationDelay: `${tagIndex * 0.1}s` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="project-actions">
                      <button className="project-btn primary">
                        <span>Live Demo</span>
                        <span className="btn-icon">🚀</span>
                      </button>
                      <button className="project-btn secondary">
                        <span>Source</span>
                        <span className="btn-icon">⚡</span>
                      </button>
                    </div>
                  </div>

                  {/* Project Glow Effect */}
                  <div className="project-glow"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Bottom CTA */}
          <div className="mt-32">
            <div className="projects-cta-card">
              <div className="cta-background"></div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-gradient mb-6">
                  Curious About My Process?
                </h3>
                <p className="text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
                  Each project tells a unique story of innovation, problem-solving, and creative execution. 
                  I'd love to share the journey behind these creations and discuss how we can build your next masterpiece together.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="btn-enhanced-primary">
                    <span>View All Projects</span>
                    <span className="btn-icon">📁</span>
                  </button>
                  <button className="btn-enhanced-secondary">
                    <span>GitHub Profile</span>
                    <span className="btn-icon">🔗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Projects