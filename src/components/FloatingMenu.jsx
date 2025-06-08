import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiHome, 
  HiUser, 
  HiBriefcase, 
  HiMail,
  HiMenu,
  HiX
} from 'react-icons/hi'

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const menuItems = useMemo(() => [
    {
      id: 'home',
      icon: HiHome,
      label: 'Home',
      href: '#home',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'about',
      icon: HiUser,
      label: 'About',
      href: '#about',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'projects',
      icon: HiBriefcase,
      label: 'Projects',
      href: '#projects',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'contact',
      icon: HiMail,
      label: 'Contact',
      href: '#contact',
      color: 'from-orange-500 to-red-600'
    }
  ], [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Optimized animation variants
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.08
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15 }
    }
  }

  const menuItemVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      x: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      x: 20,
      transition: { duration: 0.1 }
    }
  }

  const buttonVariants = {
    idle: { 
      rotate: 0,
      scale: 1
    },
    open: { 
      rotate: 45,
      scale: 1.05
    }
  }

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-8 right-8 z-50"
    >
      {/* Optimized Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-20 right-0 flex flex-col-reverse gap-3"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {menuItems.map((item, index) => {
              const IconComponent = item.icon
              
              return (
                <motion.button
                  key={item.id}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} 
                             shadow-lg hover:shadow-xl transition-shadow duration-200
                             flex items-center justify-center text-white
                             border border-white/20 backdrop-blur-sm
                             hover:border-white/40 relative group`}
                  variants={menuItemVariants}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ 
                    scale: 1.1,
                    x: -8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon */}
                  <IconComponent size={20} className="relative z-10" />
                  
                  {/* Simple hover effect */}
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />

                  {/* Tooltip */}
                  <div className="absolute top-1/2 -left-14 transform -translate-y-1/2 
                                 px-2 py-1 bg-gray-900/90 text-white text-xs rounded
                                 opacity-0 group-hover:opacity-100 pointer-events-none
                                 transition-opacity duration-200 whitespace-nowrap">
                    {item.label}
                    <div className="absolute top-1/2 left-full transform -translate-y-1/2 
                                    w-0 h-0 border-t-2 border-b-2 border-l-2 
                                    border-transparent border-l-gray-900/90" />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Main Button */}
      <motion.button
        ref={buttonRef}
        className="w-16 h-16 bg-gradient-to-r from-primary via-secondary to-accent 
                   rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300 
                   flex items-center justify-center text-white relative overflow-hidden
                   border-2 border-white/20 backdrop-blur-sm"
        onClick={toggleMenu}
        variants={buttonVariants}
        animate={isOpen ? "open" : "idle"}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          background: isOpen 
            ? "linear-gradient(135deg, #ef4444, #f97316)" 
            : "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)"
        }}
      >
        {/* Simplified background animation - only when not open */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        )}

        {/* Icon transition */}
        <motion.div className="relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiX size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiMenu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Single pulse effect - only when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{
              scale: [1, 1.3],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        )}
      </motion.button>

      {/* Simplified connection line */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-8 w-px h-64 bg-gradient-to-t 
                       from-primary/20 via-secondary/40 to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'bottom' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingMenu