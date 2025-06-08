import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Particles from '../styles/Particles'

gsap.registerPlugin(ScrollTrigger)

const Contact = memo(() => {
  const sectionRef = useRef()
  const formRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
  const [splineLoaded, setSplineLoaded] = useState(false)

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_bh72cvs'
  const EMAILJS_TEMPLATE_ID = 'template_21o3yxk'
  const EMAILJS_PUBLIC_KEY = 'Kvd-h4Quptregv3E-'

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  // Simplified GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in animation
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate form elements with stagger
      gsap.fromTo('.form-element', 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.form-element',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate spline container
      gsap.fromTo('.spline-container', 
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.spline-container',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Moetaz Khedher',
        reply_to: formData.email,
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }, [formData])

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }, [])

  // Simplified spline loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplineLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f3460 100%)' }}
    >
      {/* Particles Space Background */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1 
      }}>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
      </div>

      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-black/30"
        style={{ zIndex: 2 }}
      />

      {/* Content Container */}
      <div 
        className="relative max-w-7xl mx-auto px-6"
        style={{ zIndex: 10 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Ready to bring your ideas to life? Let's discuss your project and make it happen together.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm border border-blue-400/30">⚡ Quick Response</span>
            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-300 text-sm border border-purple-400/30">🌍 Available Worldwide</span>
            <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full text-cyan-300 text-sm border border-cyan-400/30">🤝 Collaborative</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="form-element bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">📝</span>
              <h3 className="text-2xl font-bold text-white">Send Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="form-element">
                <label className="block text-sm font-medium mb-2 text-white/90">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:outline-none text-white placeholder-white/60 ${
                    focusedField === 'name' 
                      ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-400/20' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-element">
                <label className="block text-sm font-medium mb-2 text-white/90">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:outline-none text-white placeholder-white/60 ${
                    focusedField === 'email' 
                      ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-400/20' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Subject Input */}
              <div className="form-element">
                <label className="block text-sm font-medium mb-2 text-white/90">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:outline-none text-white placeholder-white/60 ${
                    focusedField === 'subject' 
                      ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-400/20' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  placeholder="What's this about?"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div className="form-element">
                <label className="block text-sm font-medium mb-2 text-white/90">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none text-white placeholder-white/60 ${
                    focusedField === 'message' 
                      ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-400/20' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-white/20 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl shadow-blue-500/30'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Send Message <span className="ml-2">🚀</span>
                  </div>
                )}
              </motion.button>
            </form>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl text-green-300 text-sm flex items-center"
                >
                  <span className="mr-2">✅</span>
                  Message sent successfully!
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-300 text-sm flex items-center"
                >
                  <span className="mr-2">❌</span>
                  Failed to send. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Spline Container */}
          <div className="spline-container relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              {!splineLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-3"></div>
                    <p className="text-sm text-white/70">Loading 3D Experience...</p>
                  </div>
                </div>
              )}
              
              <spline-viewer 
                url="https://prod.spline.design/Xa5upU6ofUkCR9kK/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.75rem',
                  background: 'transparent',
                }}
                onLoad={() => setSplineLoaded(true)}
                onError={() => setSplineLoaded(true)}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-white">Ready to Start Something Amazing? 🌟</h3>
            <p className="text-lg text-white/80 mb-6">
              Every great project starts with a conversation.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-6">
              <motion.button
                className="w-12 h-12 bg-[#0077B5] rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(0, 119, 181, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.linkedin.com/in/benkhedhermoetaz/', '_blank')}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.button>

              <motion.button
                className="w-12 h-12 bg-[#181717] rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(24, 23, 23, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://github.com/itsMoetaz', '_blank')}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.button>
            </div>

            {/* Contact Details */}
            <div className="text-white/70 text-sm space-y-1">
              <p>📧 <a href="mailto:moetaz.benkhedher@esprit.tn" className="hover:text-blue-400 transition-colors">moetaz.benkhedher@esprit.tn</a></p>
              <p>📱 <a href="tel:+216 23 910 690" className="hover:text-blue-400 transition-colors">+216 23 910 690</a></p>
              <p>📍 Tunisia - Available for remote work worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'

export default Contact