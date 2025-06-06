import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className={`navbar fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect bg-base-100/80' : 'bg-transparent'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-primary">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <a href="#home" className="btn btn-ghost text-xl font-bold text-gradient">Portfolio</a>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end">
        <a href="#contact" className="btn btn-primary btn-sm">Get In Touch</a>
      </div>
    </div>
  )
}

export default Navbar