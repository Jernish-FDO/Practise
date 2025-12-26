import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react'
import { useNotificationStore } from '@store/themeStore'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, send to backend
      console.log('Form submitted:', formData)

      addNotification('Message sent successfully! I will get back to you soon.', 'success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      addNotification('Failed to send message. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'amalajernish228@gmail.com',
      href: 'mailto:amalajernish228@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 6374 160 486',
      href: 'tel:+916374160486',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Tirunelveli, Tamil Nadu, India',
      href: '#',
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
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-primary mb-4">Get In Touch</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help you.
            </p>
            <div className="separator mt-4"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-primary mb-8">Contact Info</h2>
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, i) => (
                  <a
                    key={i}
                    href={info.href}
                    className="card p-6 flex items-start gap-4 hover:border-primary/50 transition-all group"
                  >
                    <div className="text-accent group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{info.label}</h3>
                      <p className="text-gray-400 group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Jernish-FDO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-green-500/20 hover:bg-green-500/10 hover:border-green-500/50 transition-all group"
                    title="GitHub"
                  >
                    <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://linkedin.com/in/amala-jernish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-green-500/20 hover:bg-green-500/10 hover:border-green-500/50 transition-all group"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-primary mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="card p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Project inquiry"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input-field h-32 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
