import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'Frontend Technologies',
      skills: [
        { name: 'React', proficiency: 95 },
        { name: 'Vite', proficiency: 90 },
        { name: 'Tailwind CSS', proficiency: 92 },
        { name: 'JavaScript', proficiency: 94 },
        { name: 'HTML5 & CSS3', proficiency: 95 },
        { name: 'Responsive Design', proficiency: 93 },
      ],
    },
    {
      category: 'Backend & Cloud',
      skills: [
        { name: 'Node.js & Express', proficiency: 88 },
        { name: 'Firebase', proficiency: 90 },
        { name: 'REST APIs', proficiency: 92 },
        { name: 'Authentication & Security', proficiency: 85 },
        { name: 'Database Design', proficiency: 88 },
        { name: 'Cloud Deployment', proficiency: 87 },
      ],
    },
    {
      category: 'IoT & Hardware',
      skills: [
        { name: 'Pico W Programming', proficiency: 92 },
        { name: 'Arduino & ESP32', proficiency: 90 },
        { name: 'Embedded C/C++', proficiency: 88 },
        { name: 'WiFi & BLE Protocols', proficiency: 86 },
        { name: 'Sensor Integration', proficiency: 87 },
        { name: 'Hardware Debugging', proficiency: 85 },
      ],
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Git & GitHub', proficiency: 94 },
        { name: 'VS Code & Terminal', proficiency: 93 },
        { name: 'Vercel Deployment', proficiency: 92 },
        { name: 'Linux (Arch)', proficiency: 88 },
        { name: 'N8N Automation', proficiency: 85 },
        { name: 'Gemini API', proficiency: 86 },
      ],
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            My Skills & Expertise
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <p className="text-slate-400 mt-4 text-lg">Proficiency levels in key technologies and tools</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {skillsData.map((category, catIndex) => (
            <motion.div key={catIndex} variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-6 text-teal-300">{category.category}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: skillIndex * 0.05 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg">{skill.name}</span>
                      <span className="text-sm font-bold text-teal-300">{skill.proficiency}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden border border-purple-500/10">
                      <motion.div
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.round(skill.proficiency / 20) ? 'fill-teal-400 text-teal-400' : 'text-slate-600'}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">12+</div>
              <p className="text-slate-300">Technologies Mastered</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">90%</div>
              <p className="text-slate-300">Average Proficiency</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
              <p className="text-slate-300">Commitment to Quality</p>
            </div>
          </div>
        </motion.div>

        {/* Continuous Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-12 backdrop-blur text-center">
            <h3 className="text-2xl font-bold mb-4">🎓 Currently Learning</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Flutter', 'Advanced N8N', 'Cybersecurity', 'Kubernetes', 'GraphQL', 'Machine Learning'].map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
