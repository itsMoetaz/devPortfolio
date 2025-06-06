import { useEffect, useRef, useState, memo } from 'react'

const PerformanceMonitor = memo(() => {
  const [fps, setFps] = useState(60)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const animationId = useRef()

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') return

    const measurePerformance = () => {
      const now = performance.now()
      frameCount.current++
      
      // Calculate FPS every second
      if (now - lastTime.current >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / (now - lastTime.current))
        setFps(currentFps)
        frameCount.current = 0
        lastTime.current = now
        
        // Get memory usage if available
        if (performance.memory) {
          const memUsage = Math.round(performance.memory.usedJSHeapSize / 1048576) // Convert to MB
          setMemoryUsage(memUsage)
        }
      }
      
      animationId.current = requestAnimationFrame(measurePerformance)
    }

    measurePerformance()

    // Keyboard shortcut to toggle visibility
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      cancelAnimationFrame(animationId.current)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development' || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[999] bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-lg p-3 text-xs font-mono shadow-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-base-content/70">FPS:</span>
          <span className={`font-bold ${fps >= 50 ? 'text-success' : fps >= 30 ? 'text-warning' : 'text-error'}`}>
            {fps}
          </span>
        </div>
        {memoryUsage > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-base-content/70">Memory:</span>
            <span className={`font-bold ${memoryUsage < 50 ? 'text-success' : memoryUsage < 100 ? 'text-warning' : 'text-error'}`}>
              {memoryUsage}MB
            </span>
          </div>
        )}
        <div className="text-xs text-base-content/50 mt-2 pt-1 border-t border-base-300">
          Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  )
})

export default PerformanceMonitor
