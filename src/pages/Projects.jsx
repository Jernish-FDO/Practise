import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI Chatbot Integration',
      description: 'Built a chatbot system using Google Gemini API for intelligent conversation and task automation.',
      technologies: ['Python', 'Gemini API', 'Flask', 'Firebase'],
      github: 'https://github.com/Jernish-FDO',
      demo: '#',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'IoT Home Automation',
      description: 'Developed a complete home automation system using Pico W with Firebase real-time database integration.',
      technologies: ['Pico W', 'Firebase', 'Python', 'WiFi'],
      github: 'https://github.com/Jernish-FDO',
      demo: '#',
      gradient: 'from-teal-500 to-green-500',
    },
    {
      title: 'Advanced React Portfolio',
      description: 'Created this responsive portfolio website using React, Vite, and Tailwind CSS with smooth animations.',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/Jernish-FDO/Practise',
      demo: 'https://amala-jernish.vercel.app',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'N8N Automation Workflows',
      description: 'Designed complex automation workflows for data processing and integration with multiple services.',
      technologies: ['N8N', 'JavaScript', 'APIs', 'Webhooks'],
      github: 'https://github.com/Jernish-FDO',
      demo: '#',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Real-time Dashboard',
      description: 'Built a real-time monitoring dashboard for IoT device data visualization and analytics.',
      technologies: ['React', 'Firebase', 'Chart.js', 'Node.js'],
      github: 'https://github.com/Jernish-FDO',
      demo: '#',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and inventory management system.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/Jernish-FDO',
      demo: '#',
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ y: [0, 40, 0], x: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
            My Projects
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-400 mt-4 text-lg">Explore my latest work and contributions</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group h-full"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-teal-500/10 rounded-2xl p-8 h-full flex flex-col hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:scale-105 transform">
                {/* Gradient Header */}
                <div className={`h-1 w-12 bg-gradient-to-r ${project.gradient} rounded-full mb-6 group-hover:w-full transition-all duration-300`}></div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-xs text-teal-300 hover:bg-teal-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-6 border-t border-teal-500/10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-teal-500/20 border border-teal-500/20 hover:border-teal-500 rounded-lg text-sm font-semibold text-teal-300 transition-all duration-300"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/50 rounded-lg text-sm font-semibold text-slate-900 transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-12 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">More Projects Coming Soon</h2>
            <p className="text-slate-400 mb-6">I'm constantly working on new and exciting projects. Check back soon!</p>
            <a
              href="https://github.com/Jernish-FDO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
            >
              <Github size={20} />
              Visit GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
