import { motion } from 'framer-motion';
import { Code, Zap, Cpu, Terminal } from 'lucide-react';

const About = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      skills: ['React', 'Vite', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5/CSS3', 'Responsive Design'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Backend & Cloud',
      skills: ['Node.js', 'Express', 'Firebase', 'APIs (REST/GraphQL)', 'Authentication', 'Cloud Services'],
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: Cpu,
      title: 'IoT & Hardware',
      skills: ['Pico W', 'Arduino', 'ESP32', 'Embedded C/C++', 'WiFi/BLE', 'IoT Protocols'],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Terminal,
      title: 'Tools & Platforms',
      skills: ['Git & GitHub', 'Vercel', 'VS Code', 'Terminal', 'Arch Linux', 'N8N Workflows'],
      color: 'from-purple-500 to-pink-500',
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
          animate={{ y: [0, 40, 0] }}
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
            About Me
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >
          {/* Bio Text */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-slate-800/50 border border-teal-500/20 rounded-2xl p-8 backdrop-blur">
              <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                I'm a full-stack developer from India with a passion for creating innovative solutions that combine 
                web technologies with hardware integration. With expertise in React, IoT systems, and AI integration, 
                I help turn ambitious ideas into reality.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                My journey began with a diploma in Electronics and Communication Engineering, which sparked my interest 
                in building connected systems. Today, I specialize in developing scalable web applications and IoT solutions 
                that solve real-world problems.
              </p>
              <p className="text-slate-300 leading-relaxed">
                When I'm not coding, you'll find me at the gym, exploring cutting-edge technologies, or contributing to 
                open-source projects. I'm always eager to learn new frameworks, tools, and best practices.
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-8 text-slate-900">
              <div className="text-4xl font-bold mb-2">5+</div>
              <p className="font-semibold">Projects Completed</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-slate-900">
              <div className="text-4xl font-bold mb-2">2+</div>
              <p className="font-semibold">Years Experience</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-slate-900">
              <div className="text-4xl font-bold mb-2">12+</div>
              <p className="font-semibold">Skills Mastered</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">My Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-teal-500/10 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-sm text-teal-300 hover:bg-teal-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8">Education & Background</h2>
          <div className="bg-slate-800/50 border border-teal-500/20 rounded-2xl p-8 backdrop-blur">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-bold">Diploma in Electronics and Communication Engineering</h3>
                  <p className="text-slate-400">Specialization in embedded systems and IoT</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-bold">Self-Taught Full-Stack Developer</h3>
                  <p className="text-slate-400">Building production-ready web applications and IoT systems</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-bold">Continuous Learning</h3>
                  <p className="text-slate-400">Exploring advanced technologies: Flutter, N8N, Cybersecurity, and more</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
