import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.decay = Math.random() * 0.01 + 0.005
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.opacity -= this.decay

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }

      isDead() {
        return this.opacity <= 0
      }
    }

    // Node class for network
    class Node {
      constructor(x, y, label) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 1
        this.vy = (Math.random() - 0.5) * 1
        this.label = label
        this.size = 8
        this.update_count = 0
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.update_count++

        // Bounce off walls
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.vx *= -1
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.vy *= -1

        // Keep within bounds
        this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x))
        this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y))
      }

      draw() {
        ctx.fillStyle = '#00ff88'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#a0a0a0'
        ctx.font = '10px Space Mono'
        ctx.textAlign = 'center'
        ctx.fillText(this.label, this.x, this.y + 15)
      }
    }

    // Initialize particles and nodes
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    const nodeLabels = ['Network', 'IoT', 'Cloud', 'Code', 'Security', 'Hardware']
    const nodes = nodeLabels.map((label, i) => {
      const angle = (i / nodeLabels.length) * Math.PI * 2
      const radius = Math.min(canvas.width, canvas.height) / 4
      const x = canvas.width / 2 + radius * Math.cos(angle)
      const y = canvas.height / 2 + radius * Math.sin(angle)
      return new Node(x, y, label)
    })

    // Draw background grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 100
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(15, 20, 25, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid()

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      // Draw connections between nodes
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)'
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 300) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].isDead()) {
          particles.splice(i, 1)
        }
      }

      // Add new particles occasionally
      if (Math.random() < 0.3 && particles.length < 50) {
        particles.push(new Particle())
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  )
}

export default AnimatedBackground
