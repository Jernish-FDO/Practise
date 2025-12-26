import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const projects = [
    {
      title: 'IoT Home Automation System',
      desc: 'Smart home control system using Pico W with Firebase integration',
      tech: ['Python', 'IoT', 'Firebase', 'Pico W', 'WiFi'],
      github: 'https://github.com/Jernish-FDO/IoT-Home-Automation',
      live: '#',
      featured: true,
    },
    {
      title: 'Network Monitoring Dashboard',
      desc: 'Real-time network traffic monitoring with advanced analytics',
      tech: ['React', 'Node.js', 'D3.js', 'Express', 'MongoDB'],
      github: 'https://github.com/Jernish-FDO/Network-Monitor',
      live: '#',
      featured: true,
    },
    {
      title: 'Cybersecurity Tool Suite',
      desc: 'Collection of ethical hacking and penetration testing tools',
      tech: ['Python', 'Security', 'CLI', 'Linux'],
      github: 'https://github.com/Jernish-FDO/CyberSuite',
      live: '#',
      featured: true,
    },
    {
      title: 'N8N Workflow Automations',
      desc: 'Advanced workflow automation for data processing and integration',
      tech: ['N8N', 'API', 'Automation', 'Integration'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'AI Chatbot Integration',
      desc: 'AI-powered chatbot using Google Gemini API',
      tech: ['Python', 'Gemini API', 'NLP', 'Flask'],
      github: 'https://github.com/Jernish-FDO/AI-Chatbot',
      live: '#',
      featured: false,
    },
    {
      title: 'Flutter Mobile App',
      desc: 'Cross-platform mobile app for IoT device control',
      tech: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
      github: 'https://github.com/Jernish-FDO/Flutter-IoT-App',
      live: '#',
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-5xl font-bold text-primary mb-4">Projects</h1>
            <p className="text-gray-400 text-lg">
              A showcase of my recent work and contributions
            </p>
            <div className="separator mt-4"></div>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">Featured</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects
                .filter((p) => p.featured)
                .map((project, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="card group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>
                    <div className="relative z-10 p-6">
                      <h3 className="text-2xl font-bold text-primary mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="badge text-xs bg-accent/20 text-accent border-accent/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group"
                        >
                          <Github className="w-5 h-5" />
                          Code
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Demo
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Other Projects */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-primary mb-8">Other Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => !p.featured)
                .map((project, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="card p-6"
                  >
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="badge text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
