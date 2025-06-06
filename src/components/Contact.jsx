import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = memo(() => {
  const sectionRef = useRef()
  const formRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-item",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Memoized event handlers for better performance
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }, [formData])

  const handleChange = useCallback((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }, [formData])

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Get In Touch</h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Ready to start your next project? Let's work together to create something amazing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="contact-item flex items-center gap-4 p-6 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
              <div className="text-3xl">📧</div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-base-content/70">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="contact-item flex items-center gap-4 p-6 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-base-content/70">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item flex items-center gap-4 p-6 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
              <div className="text-3xl">📍</div>
              <div>
                <h3 className="font-bold text-lg">Location</h3>
                <p className="text-base-content/70">San Francisco, CA</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="contact-item space-y-4">
              <h3 className="font-bold text-lg">Follow Me</h3>
              <div className="flex gap-4">
                <a href="#" className="btn btn-circle btn-outline hover:btn-primary">
                  <span className="text-xl">🐙</span>
                </a>
                <a href="#" className="btn btn-circle btn-outline hover:btn-primary">
                  <span className="text-xl">💼</span>
                </a>
                <a href="#" className="btn btn-circle btn-outline hover:btn-primary">
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered input-primary w-full"
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered input-primary w-full"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Message</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered textarea-primary h-32"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full hover:scale-105 transition-transform"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  )
})

export default Contact