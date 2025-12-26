import { motion } from 'framer-motion'

const Skills = () => {
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

  const skillCategories = [
    {
      category: 'Network & Infrastructure',
      skills: [
        { name: 'Network Administration', level: 90 },
        { name: 'Linux/Unix Systems', level: 85 },
        { name: 'Cisco Networking', level: 80 },
        { name: 'TCP/IP Protocols', level: 88 },
        { name: 'Firewall Management', level: 85 },
        { name: 'WiFi Security', level: 82 },
      ],
    },
    {
      category: 'IoT & Hardware',
      skills: [
        { name: 'Raspberry Pi/Pico W', level: 88 },
        { name: 'Arduino Programming', level: 85 },
        { name: 'IoT Protocols (MQTT)', level: 83 },
        { name: 'Embedded Systems', level: 82 },
        { name: 'Hardware Integration', level: 85 },
      ],
    },
    {
      category: 'Full-Stack Development',
      skills: [
        { name: 'React & React Hooks', level: 90 },
        { name: 'Node.js & Express', level: 88 },
        { name: 'JavaScript/ES6+', level: 92 },
        { name: 'Database Design', level: 85 },
        { name: 'REST APIs', level: 88 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 92 },
        { name: 'Dart (Flutter)', level: 85 },
        { name: 'C/C++', level: 80 },
        { name: 'Shell Scripting', level: 85 },
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'Firebase', level: 88 },
        { name: 'Git & GitHub', level: 90 },
        { name: 'Docker Basics', level: 75 },
        { name: 'CI/CD Pipelines', level: 78 },
        { name: 'Google Cloud', level: 80 },
      ],
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Vite & Webpack', level: 85 },
        { name: 'N8N Automation', level: 82 },
        { name: 'Framer Motion', level: 85 },
        { name: 'VS Code', level: 95 },
        { name: 'Arch Linux', level: 88 },
      ],
    },
  ]

  const SkillBar = ({ name, level }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs text-primary font-semibold">{level}%</span>
      </div>
      <div className="w-full h-2 bg-black/30 border border-green-500/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </div>
    </motion.div>
  )

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
            <h1 className="text-5xl font-bold text-primary mb-4">Skills & Expertise</h1>
            <p className="text-gray-400 text-lg">
              Technical proficiencies across multiple domains
            </p>
            <div className="separator mt-4"></div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {skillCategories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                variants={itemVariants}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-8">
                  {category.category}
                </h2>
                <div>
                  {category.skills.map((skill, skillIdx) => (
                    <SkillBar
                      key={skillIdx}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8">Certifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                'Network+ (In Progress)',
                'Security+ (In Progress)',
                'AWS Solutions Architect',
                'Google Cloud Associate',
                'Cisco CCNA (Preparing)',
                'Ethical Hacker (Pursuing)',
              ].map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="card p-6 text-center border-2 border-accent/30 hover:border-accent/70 transition-all"
                >
                  <p className="text-accent font-semibold">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills
