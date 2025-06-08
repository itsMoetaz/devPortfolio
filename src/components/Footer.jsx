const Footer = () => {
  return (
    <footer className="bg-base-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gradient">John Doe</h3>
            <p className="text-base-content/70">Software Engineer | Full-Stack Web Developer | DevOps & AI</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#home" className="link link-hover">Home</a>
            <a href="#about" className="link link-hover">About</a>
            <a href="#skills" className="link link-hover">Skills</a>
            <a href="#projects" className="link link-hover">Projects</a>
            <a href="#contact" className="link link-hover">Contact</a>
          </div>
        </div>
        
        <div className="divider"></div>
        
        <div className="text-center text-base-content/60">
          <p>&copy; All rights reserved. Built with ❤️ using React & GSAP</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer