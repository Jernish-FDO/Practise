import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 40, 0], x: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -40, 0], x: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 text-sm font-semibold text-teal-300">
              ✨ Welcome to my portfolio
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent"
          >
            Hi, I'm Amala Jernish
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto font-light"
          >
            Full-stack Developer | IoT Enthusiast | AI Integration Specialist
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            I build fast, responsive web applications and integrate cutting-edge IoT systems with cloud services. 
            Specializing in React, Node.js, and embedded systems to turn innovative ideas into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-700/50 border border-teal-500/30 text-white font-bold rounded-lg hover:bg-slate-700 hover:border-teal-500 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-6 justify-center">
            <a
              href="https://github.com/Jernish-FDO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:amalajernish228@gmail.com"
              className="text-slate-400 hover:text-teal-300 transition-colors p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:+916374160486"
              className="text-slate-400 hover:text-teal-300 transition-colors p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700"
              aria-label="Phone"
            >
              <Phone size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-teal-500/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-teal-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
