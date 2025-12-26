import { motion } from 'framer-motion'
import { Code2, Network, Zap } from 'lucide-react'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const expertise = [
    {
      icon: <Network className="w-8 h-8" />,
      title: 'Network Infrastructure',
      desc: 'Design and management of robust network systems',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Full-Stack Development',
      desc: 'Frontend, backend, and DevOps expertise',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'IoT & Automation',
      desc: 'Smart device integration and automation',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-5xl font-bold text-primary mb-4">About Me</h1>
            <div className="separator"></div>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="card mb-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              I'm Amala Jernish, a passionate Network Technician and IoT Developer from
              Tirunelveli, Tamil Nadu, India. With expertise in network administration,
              IoT systems, and full-stack development, I create intelligent solutions
              that bridge hardware and software.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm constantly learning new technologies and exploring the intersection of
              networking, security, and automation to build scalable, secure systems.
            </p>
          </motion.div>

          {/* Expertise Grid */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Core Expertise</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {expertise.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="card p-8 text-center"
                >
                  <div className="text-accent mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Education</h2>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-1 h-20 bg-gradient-to-b from-primary to-accent"></div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Diploma in ECE</h3>
                  <p className="text-gray-400 mb-2">Electronics & Communication Engineering</p>
                  <p className="text-sm text-gray-500">Technical Institute, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/50 text-center p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Let's Collaborate</h3>
            <p className="text-gray-300 mb-6">
              Interested in working together? Let's discuss your project.
            </p>
            <a href="mailto:amalajernish228@gmail.com" className="btn-primary">
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
