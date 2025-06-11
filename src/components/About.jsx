import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LazyImage from './LazyImage'
import ModelLoader from './ModelLoader'
import DecryptedText from '../styles/DecryptedText'
import ProfileCard from '../styles/ProfileCard'
import RotatingText from '../styles/RotatingText'

// Lazy load the heavy 3D component
const StarField = lazy(() => import('./StarField'))

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const skillsRef = useRef(null)
  const statsRef = useRef(null)


  const handleDownloadResume = () => {
    // Method 1: If you have a PDF file in your public folder
    const link = document.createElement('a')
    link.href = '/resume.pdf' // Place your resume.pdf in the public folder
    link.download = 'Moetaz_Khedher_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
    >      {/* StarField Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<ModelLoader />}>
          <StarField />
        </Suspense>
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
  text="Transforming ideas into reality through code, creativity, and cutting-edge technology solutions."
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

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* Profile Card */}
            <div className="flex justify-center lg:justify-start pl-3 lg:pl-12">
              <div className="w-full max-w-sm">
                <ProfileCard
            name="Moetaz Khedher"
            title="Full-Stack Developer"
            handle="moetazKH"
            status="Available for work"
            contactText="Get In Touch"
            avatarUrl="/x.png"
            backgroundImage="/x.png"
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
Infos       *       </h3>
              
              <p className="text-base-content/90 leading-relaxed mb-4">
I'm a curious and passionate Full-Stack Developer who enjoys learning, solving problems, and building useful products. I work mainly with Angular, Spring Boot, and the MERN stack, and I’m also exploring DevOps and AI.
              </p>
              
              <p className="text-base-content/90 leading-relaxed mb-6">
I’m known for being a fast learner, a collaborative team player, and someone who stays calm under pressure. I love sharing knowledge and growing a little every day.

My goal is to keep improving while contributing to projects that make a real impact.
              </p>
              <div className="flex justify-center">
                <button
                 onClick={handleDownloadResume}
                 className="relative rounded-full bg-blue-500 px-6 py-3 font-mono font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700">
                  Download Resume
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
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
                    alt="JavaScript" 
                    width="48" 
                    height="48"
                  />
                  <span>JavaScript</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                    alt="React" 
                    width="48" 
                    height="48"
                  />
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" 
                    alt="Redux" 
                    width="48" 
                    height="48"
                  />
                  <span>Redux</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" 
                    alt="Tailwind CSS" 
                    width="48" 
                    height="48"
                  />
                  <span>Tailwind</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" 
                    alt="Angular" 
                    width="48" 
                    height="48"
                  />
                  <span>Angular</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                    alt="Node.js" 
                    width="48" 
                    height="48"
                  />
                  <span>Node.js</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" 
                    alt="Spring Boot" 
                    width="48" 
                    height="48"
                  />
                  <span>Spring Boot</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" 
                    alt=".NET" 
                    width="48" 
                    height="48"
                  />
                  <span>.NET</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                    alt="Python" 
                    width="48" 
                    height="48"
                  />
                  <span>Python</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
                    alt="Docker" 
                    width="48" 
                    height="48"
                  />
                  <span>Docker</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" 
                    alt="Jenkins" 
                    width="48" 
                    height="48"
                  />
                  <span>Jenkins</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" 
                    alt="HTML5" 
                    width="48" 
                    height="48"
                  />
                  <span>HTML5</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" 
                    alt="CSS3" 
                    width="48" 
                    height="48"
                  />
                  <span>CSS3</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
                    alt="Git" 
                    width="48" 
                    height="48"
                  />
                  <span>Git</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
                    alt="MongoDB" 
                    width="48" 
                    height="48"
                  />
                  <span>MongoDB</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" 
                    alt="Figma" 
                    width="48" 
                    height="48"
                  />
                  <span>Figma</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" 
                    alt="UI/UX" 
                    width="48" 
                    height="48"
                  />
                  <span>UI/UX</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" 
                    alt="Express.js" 
                    width="48" 
                    height="48"
                  />
                  <span>Express.js</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" 
                    alt="MySQL" 
                    width="48" 
                    height="48"
                  />
                  <span>MySQL</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg" 
                    alt="Symfony" 
                    width="48" 
                    height="48"
                  />
                  <span>Symfony</span>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
                    alt="JavaScript" 
                    width="48" 
                    height="48"
                  />
                  <span>JavaScript</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                    alt="React" 
                    width="48" 
                    height="48"
                  />
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" 
                    alt="Redux" 
                    width="48" 
                    height="48"
                  />
                  <span>Redux</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" 
                    alt="Tailwind CSS" 
                    width="48" 
                    height="48"
                  />
                  <span>Tailwind</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" 
                    alt="Angular" 
                    width="48" 
                    height="48"
                  />
                  <span>Angular</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                    alt="Node.js" 
                    width="48" 
                    height="48"
                  />
                  <span>Node.js</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" 
                    alt="Spring Boot" 
                    width="48" 
                    height="48"
                  />
                  <span>Spring Boot</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" 
                    alt=".NET" 
                    width="48" 
                    height="48"
                  />
                  <span>.NET</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                    alt="Python" 
                    width="48" 
                    height="48"
                  />
                  <span>Python</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
                    alt="Docker" 
                    width="48" 
                    height="48"
                  />
                  <span>Docker</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" 
                    alt="Jenkins" 
                    width="48" 
                    height="48"
                  />
                  <span>Jenkins</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" 
                    alt="HTML5" 
                    width="48" 
                    height="48"
                  />
                  <span>HTML5</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" 
                    alt="CSS3" 
                    width="48" 
                    height="48"
                  />
                  <span>CSS3</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
                    alt="Git" 
                    width="48" 
                    height="48"
                  />
                  <span>Git</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
                    alt="MongoDB" 
                    width="48" 
                    height="48"
                  />
                  <span>MongoDB</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" 
                    alt="Figma" 
                    width="48" 
                    height="48"
                  />
                  <span>Figma</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" 
                    alt="UI/UX" 
                    width="48" 
                    height="48"
                  />
                  <span>UI/UX</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" 
                    alt="Express.js" 
                    width="48" 
                    height="48"
                  />
                  <span>Express.js</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" 
                    alt="MySQL" 
                    width="48" 
                    height="48"
                  />
                  <span>MySQL</span>
                </div>
                <div className="tech-item">
                  <LazyImage 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg" 
                    alt="Symfony" 
                    width="48" 
                    height="48"
                  />
                  <span>Symfony</span>
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