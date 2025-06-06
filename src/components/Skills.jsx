import { useEffect, useRef, useMemo, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = memo(() => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const skillsGridRef = useRef()
  const categoriesRef = useRef()

  // Memoize heavy data calculations
  const skillCategories = useMemo(() => [
    {
      name: 'Frontend Development',
      icon: '🎨',
      description: 'Crafting beautiful, responsive user interfaces',
      skills: [
        { name: 'React', level: 95, icon: '⚛️', color: 'from-blue-400 to-blue-600' },
        { name: 'Next.js', level: 90, icon: '▲', color: 'from-gray-600 to-gray-800' },
        { name: 'TypeScript', level: 88, icon: '🔷', color: 'from-blue-500 to-blue-700' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨', color: 'from-cyan-400 to-cyan-600' },
      ]
    },
    {
      name: 'Backend Development',
      icon: '⚙️',
      description: 'Building robust, scalable server architectures',
      skills: [
        { name: 'Node.js', level: 90, icon: '🟢', color: 'from-green-400 to-green-600' },
        { name: 'Python', level: 85, icon: '🐍', color: 'from-yellow-400 to-green-500' },
        { name: 'PostgreSQL', level: 80, icon: '🐘', color: 'from-blue-500 to-indigo-600' },
        { name: 'MongoDB', level: 82, icon: '🍃', color: 'from-green-500 to-green-700' },
      ]
    },
    {
      name: '3D & Animation',
      icon: '🎲',
      description: 'Creating immersive digital experiences',
      skills: [
        { name: 'Three.js', level: 85, icon: '🎲', color: 'from-purple-400 to-purple-600' },
        { name: 'GSAP', level: 88, icon: '✨', color: 'from-green-400 to-blue-500' },
        { name: 'Blender', level: 75, icon: '🟠', color: 'from-orange-400 to-red-500' },
        { name: 'WebGL', level: 78, icon: '🌐', color: 'from-red-400 to-pink-500' },
      ]
    }
  ], [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: 100, opacity: 0, scale: 0.8 })
      gsap.set('.skill-category', { y: 100, opacity: 0, rotationY: 15, scale: 0.9 })
      gsap.set('.skill-item', { x: -50, opacity: 0, scale: 0.8 })
      gsap.set('.skill-progress', { width: 0 })

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate title with spectacular entrance
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)"
      })

      // Animate categories with stagger
      .to('.skill-category', {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "power3.out"
      }, "-=0.8")

      // Animate individual skills
      .to('.skill-item', {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: {
          amount: 1.5,
          from: "start"
        },
        ease: "back.out(1.7)"
      }, "-=0.6")

      // Animate progress bars
      .to('.skill-progress', {
        width: (i, el) => `${el.dataset.level}%`,
        duration: 2,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=1")

      // Parallax effect
      gsap.to(sectionRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      })

      // Continuous animations
      gsap.to('.skill-category', {
        y: -10,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
        delay: 2
      })

      // Interactive hover effects for skill items
      document.querySelectorAll('.skill-item').forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            y: -8,
            duration: 0.3,
            ease: "power2.out"
          })
          
          gsap.to(item.querySelector('.skill-glow'), {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          })
          
          gsap.to(item.querySelector('.skill-glow'), {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="skills-section-enhanced min-h-screen py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="skills-background-enhanced"></div>
      
      {/* Floating Skill Icons */}
      <div className="skills-floating-icons">
        {['⚛️', '🎨', '⚙️', '🚀', '🎲', '✨', '🔧', '💻'].map((icon, i) => (
          <div 
            key={i} 
            className="floating-icon"
            style={{
              left: `${10 + (i * 12)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + (i % 3)}s`
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Section Title */}
          <div ref={titleRef} className="text-center mb-20">
            <div className="section-label mb-8">
              <span className="section-label-text">My Expertise</span>
              <div className="section-label-line"></div>
            </div>
            <h2 className="text-6xl lg:text-7xl font-black leading-tight mb-8">
              <span className="text-base-content">Technical</span><br />
              <span className="title-gradient-enhanced">Mastery</span>
            </h2>
            <p className="text-2xl text-base-content/70 max-w-3xl mx-auto">
              A comprehensive toolkit of cutting-edge technologies and creative skills 
              that I've mastered to bring your wildest ideas to life
            </p>
          </div>

          {/* Enhanced Skills Categories */}
          <div ref={skillsGridRef} className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={category.name} 
                className="skill-category"
              >
                <div className="category-card-enhanced">
                  {/* Category Header */}
                  <div className="category-header">
                    <div className="category-icon">{category.icon}</div>
                    <div>
                      <h3 className="text-3xl font-bold text-gradient mb-2">
                        {category.name}
                      </h3>
                      <p className="text-base-content/70 text-lg">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="skills-grid">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skill.name} 
                        className="skill-item"
                      >
                        <div className="skill-card-enhanced">
                          <div className="skill-header">
                            <div className="skill-icon-container">
                              <div className="skill-icon">{skill.icon}</div>
                              <div className="skill-glow"></div>
                            </div>
                            <div className="skill-info">
                              <h4 className="skill-name">{skill.name}</h4>
                              <div className="skill-level-text">{skill.level}%</div>
                            </div>
                          </div>
                          
                          {/* Enhanced Progress Bar */}
                          <div className="skill-progress-container">
                            <div className="skill-progress-track">
                              <div 
                                className={`skill-progress bg-gradient-to-r ${skill.color}`}
                                data-level={skill.level}
                              >
                                <div className="progress-shine"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Bottom Section */}
          <div className="mt-32">
            <div className="skills-cta-card">
              <div className="cta-background"></div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-gradient mb-6">
                  Always Learning, Always Evolving
                </h3>
                <p className="text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
                  Technology never stops advancing, and neither do I. I'm constantly 
                  exploring new frameworks, mastering emerging tools, and pushing the 
                  boundaries of what's possible in digital creation.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="btn-enhanced-primary">
                    <span>View Certifications</span>
                    <span className="btn-icon">🏆</span>
                  </button>
                  <button className="btn-enhanced-secondary">
                    <span>See Projects</span>
                    <span className="btn-icon">🚀</span>
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

export default Skills