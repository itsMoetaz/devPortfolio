import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StarField from './StarField'
import DecryptedText from '../styles/DecryptedText'
import ProfileCard from '../styles/ProfileCard'
import RotatingText from '../styles/RotatingText'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const skillsRef = useRef(null)
  const statsRef = useRef(null)


  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(heroRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        }
      })

      // Content animation
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        }
      })

      // Skills animation
      gsap.from(".skill-tag", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 85%",
        }
      })

      // Stats counter animation
      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        }
      })

      // Number counter effect
      const counters = document.querySelectorAll('.counter')
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'))
        gsap.to(counter, {
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])



  const handleContactClick = () => {
    // Scroll to contact section or open contact modal
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.log('Contact clicked - implement your contact logic here')
    }
  }

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-20 px-4 overflow-hidden"
    >
      {/* StarField Background */}
      <div className="absolute inset-0 z-0">
        <StarField />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6 border border-primary/20">
            About Me
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-base-content mb-6">
            Hi, I'm{' '}
            <span className="inline-block">
              <RotatingText
                texts={['Moetaz', 'Ben Khedher', 'FullStack', 'Developer']}
                rotationInterval={2000}
                mainClassName="text-primary"
                splitBy="characters"
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
                initial={{ y: "100%", opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: "-120%", opacity: 0, rotateX: -90 }}
                staggerDuration={0.05}
                staggerFrom="first"
              />
            </span>
          </h2>
          <div className="text-xl text-base-content/80 max-w-2xl mx-auto font-mono">
            <DecryptedText 
              text="A passionate full-stack developer who loves creating beautiful, functional, and user-friendly digital experiences."
              animateOn="view"
              speed={30}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              className="text-xl text-base-content/80"
              encryptedClassName="text-xl text-primary/60"
              parentClassName="leading-relaxed"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Profile Card */}
          <div className="flex justify-center lg:justify-start pl-12">
            <div className="w-full max-w-sm">
              <ProfileCard
                name="Moetaz Khedher"
                title="Full-Stack Developer"
                handle="moetazKH"
                status="Available for work"
                contactText="Get In Touch"
                avatarUrl="src\assets\x.png"
                backgroundImage="src\assets\x.png"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={handleContactClick}
                className="backdrop-blur-md bg-base-100/30 border-white/10"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6 lg:pr-10">
            <div className="bg-base-100/30 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-base-content mb-4">
Infos             </h3>
              
              <p className="text-base-content/90 leading-relaxed mb-4">
I'm a curious and passionate Full-Stack Developer who enjoys learning, solving problems, and building useful products. I work mainly with Angular, Spring Boot, and the MERN stack, and I’m also exploring DevOps and AI.
              </p>
              
              <p className="text-base-content/90 leading-relaxed mb-6">
I’m known for being a fast learner, a collaborative team player, and someone who stays calm under pressure. I love sharing knowledge and growing a little every day.

My goal is to keep improving while contributing to projects that make a real impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary backdrop-blur-sm">
                  Download CV
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button 
                  onClick={handleContactClick}
                  className="btn btn-outline backdrop-blur-sm border-white/20 hover:bg-white/10"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="mb-20">
          <div className="bg-base-100/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-center mb-10 text-base-content">
              Technologies I Work With
            </h3>
            <div className="tech-scroll-container">
              <div className="tech-scroll-track">
                {/* First set of technologies */}
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" />
                  <span>Angular</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" />
                  <span>Spring Boot</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" alt=".NET" />
                  <span>.NET</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" />
                  <span>Jenkins</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                  <span>HTML5</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                  <span>CSS3</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
                  <span>Figma</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" alt="UI/UX" />
                  <span>UI/UX</span>
                </div>
                                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
                  <span>Express.js</span>
                </div>
                                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" />
                  <span>Angular</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" />
                  <span>Spring Boot</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" alt=".NET" />
                  <span>.NET</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" />
                  <span>Jenkins</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                  <span>HTML5</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                  <span>CSS3</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
                  <span>Figma</span>
                </div>
                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" alt="UI/UX" />
                  <span>UI/UX</span>
                </div>
                                                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
                  <span>Express.js</span>
                </div>
                                <div className="tech-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default About