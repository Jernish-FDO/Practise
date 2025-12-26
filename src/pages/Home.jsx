import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl sm:text-7xl font-bold text-glow-lg mb-4">
            Amala Jernish
          </h1>
          <p className="text-xl sm:text-2xl text-accent font-mono mb-2">
            NETWORK TECHNICIAN & IoT DEVELOPER
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
        >
          Building intelligent IoT solutions and network infrastructures. Passionate about
          cybersecurity, automation, and cutting-edge technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/projects"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            View My Work <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            Get In Touch
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mb-16"
        >
          <a
            href="https://github.com/Jernish-FDO"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all group"
            title="GitHub"
          >
            <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:amalajernish228@gmail.com"
            className="p-3 rounded-lg hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all group"
            title="Email"
          >
            <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://linkedin.com/in/amala-jernish"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all group"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { icon: '🚀', title: 'Fast', desc: 'Optimized performance' },
            { icon: '🎨', title: 'Modern', desc: 'Latest technologies' },
            { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={floatingVariants}
              animate="animate"
              className="card text-center p-8"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home
