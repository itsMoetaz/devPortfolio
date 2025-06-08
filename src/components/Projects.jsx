import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef()
  const heroRef = useRef()
  const cardsRef = useRef()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "Planify",
      subtitle: "Full-Stack MERN Application",
      description: "Your AI-powered project command center. Streamline tasks, teams, and timelines in one smart platform.",
      longDescription: "Planify is a comprehensive full-stack project management platform designed to streamline the organization of projects, tasks, teams, and deadlines. It combines intuitive user interfaces with AI-powered analytics to help teams prioritize work intelligently and forecast performance trends.",
      image: "src/assets/planify.png",
      tags: ["React", "Node.js", "MongoDB", "Express" , "AI" , "WebSocket", "JWT" , "Tailwind CSS" , "Daisy UI" , ] ,
      category: "fullstack",
      demo: "https://project-management-platform-awby.vercel.app/",
      github: "https://github.com/itsMoetaz/project-management-platform",
      featured: true,
      status: "Completed",
      year: "2025"
    },
    {
      id: 2,
      title: "Hotelia-MicroService",
      subtitle: "Angular & Spring Boot",
      description: "Enterprise task management system with team collaboration, real-time updates, and analytics dashboard.",
      longDescription: "Professional project management tool built with Angular and Spring Boot, featuring drag-and-drop task boards, team collaboration tools, real-time notifications, and comprehensive analytics.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      tags: ["Angular", "Spring Boot", "MySQL", "Keyclock", "Docker", "Eureka", "Gateway"],
      category: "fullstack",
      demo: "#",
      github: "https://github.com/itsMoetaz/Hotelia-MicroService",
      featured: true,
      status: "Completed",
      year: "2025"
    },
    {
      id: 3,
      title: "Portfolio Website",
      subtitle: "React & Modern CSS",
      description: "Interactive portfolio with 3D animations, responsive design, and smooth scrolling effects.",
      longDescription: "Personal portfolio website showcasing modern web development techniques with Three.js integration, GSAP animations, and responsive design principles.",
      image: "src/assets/portfolio.png",
      tags: ["React", "Daisy ui", "GSAP", "Tailwind CSS", "Framer Motion"],
      category: "frontend",
      demo: "#",
      github: "https://github.com/itsMoetaz/devPortfolio",
      featured: false,
      status: "Ongoing",
      year: "2025"
    }
  ]

  const filters = [
    { name: 'All Projects', value: 'all', icon: '🚀' },
    { name: 'Full Stack', value: 'fullstack', icon: '⚡' },
    { name: 'Frontend', value: 'frontend', icon: '🎨' },
    { name: 'Featured', value: 'featured', icon: '⭐' }
  ]

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    if (activeFilter === 'featured') return projects.filter(project => project.featured)
    return projects.filter(project => project.category === activeFilter)
  }, [activeFilter])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.project-hero-title', { y: 100, opacity: 0 })
      gsap.set('.project-hero-subtitle', { y: 80, opacity: 0 })
      gsap.set('.filter-button', { y: 50, opacity: 0, scale: 0.8 })
      gsap.set('.project-card', { y: 100, opacity: 0, rotationY: 15 })

      // Main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to('.project-hero-title', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      })
      .to('.project-hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to('.filter-button', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to('.project-card', {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "power3.out"
      }, "-=0.4")

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-300 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {['{', '}', '</', '>', '()', '=>', '&&', '||'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-4xl text-primary/10 font-mono animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="project-hero-title">
            <h2 className="text-6xl md:text-8xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                My Projects
              </span>
            </h2>
          </div>
          <div className="project-hero-subtitle">
            <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              A showcase of innovative solutions, creative designs, and technical excellence. 
              Each project represents a journey of learning and problem-solving.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`filter-button px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.value
                  ? 'bg-primary text-primary-content shadow-lg shadow-primary/25'
                  : 'bg-base-100/80 text-base-content hover:bg-base-100 border border-base-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.name}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card group cursor-pointer"
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10, rotateY: 5 }}
              >
                <div className="relative bg-base-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300/50">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Completed' 
                          ? 'bg-success text-success-content' 
                          : project.status === 'Ongoing'
                          ? 'bg-warning text-warning-content'
                          : 'bg-info text-info-content'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                          ⭐ Featured
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">👁️</div>
                        <div className="text-lg font-semibold">View Details</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-primary font-semibold">{project.year}</span>
                      <span className="text-sm text-base-content/60">{project.subtitle}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-base-200 text-base-content text-xs rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-base-200 text-base-content text-xs rounded-lg font-medium">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        className="flex-1 btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.demo, '_blank')
                        }}
                      >
                        <span>Live Demo</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                      <button 
                        className="flex-1 btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.github, '_blank')
                        }}
                      >
                        <span>Code</span>
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-base-100/80 backdrop-blur-sm rounded-3xl p-12 border border-base-300/50 shadow-xl">
            <h3 className="text-3xl font-bold text-base-content mb-6">
              Interested in Working Together?
            </h3>
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and create innovative solutions. 
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                <span>Get In Touch</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="btn btn-outline btn-lg">
                <span>View All Projects</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-base-100 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  className="absolute top-4 right-4 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold text-base-content">{selectedProject.title}</h3>
                  {selectedProject.featured && (
                    <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                
                <p className="text-lg text-base-content/80 mb-6">
                  {selectedProject.longDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-lg font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.open(selectedProject.demo, '_blank')}
                  >
                    Live Demo
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => window.open(selectedProject.github, '_blank')}
                  >
                    View Code
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects