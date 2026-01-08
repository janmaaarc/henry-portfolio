import { useState, useEffect, useRef, SyntheticEvent } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import './App.css'

// Data
const skills = [
  { name: 'Data Analysis', level: 85 },
  { name: 'Machine Learning', level: 75 },
  { name: 'Problem-Solving', level: 90 },
  { name: 'Networking', level: 80 },
  { name: 'AI', level: 75 },
  { name: 'Communication', level: 85 },
  { name: 'Teamwork', level: 90 }
]

const certifications = [
  { name: 'IT Specialist in Artificial Intelligence', issuer: 'Certiport', year: '2025', description: 'Validated expertise in AI concepts, machine learning, and neural networks' },
  { name: 'IT Specialist in Networking', issuer: 'Certiport', year: '2024', description: 'Proficiency in network infrastructure, protocols, and security' }
]

// Time-based greeting helper
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
  }
}

// Scroll-triggered animation variants
const scrollVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  }
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="loading-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="loading-logo">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            H
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Z
          </motion.span>
        </div>
        <motion.div
          className="loading-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

// Resume Preview Modal Component
function ResumePreviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Resume Preview</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <iframe
            src="/resume/Henry Rainier C. Zingapan - Briefcase Resume.pdf"
            title="Resume Preview"
            className="resume-preview-iframe"
          />
        </div>
        <div className="modal-footer">
          <a
            href="/resume/Henry Rainier C. Zingapan - Briefcase Resume.pdf"
            download
            className="btn btn-download"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, .clickable')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hover' : ''}`} />
}

// Main App Component
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [themeAnnouncement, setThemeAnnouncement] = useState('')
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [showResumePreview, setShowResumePreview] = useState(false)

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
    setIsLoaded(true)

    // Hide scroll hint on scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollHint(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    setThemeAnnouncement(`Switched to ${newTheme} mode`)
    setTimeout(() => setThemeAnnouncement(''), 1000)
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ARIA live region for theme toggle announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {themeAnnouncement}
      </div>

      <div className="portfolio">
        {/* Theme Toggle */}
        <motion.button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="toggle-icon">
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </span>
        </motion.button>

        <motion.main
          id="main-content"
          className="grid-container"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Profile Card */}
          <motion.section id="profile" className="card card-profile" variants={itemVariants}>
            <div className="profile-left">
              <div className="avatar">
                <img
                  src="/image/henry-profile.jpg"
                  alt="Henry Rainier Zingapan"
                  loading="lazy"
                  onError={(e: SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = '<span class="avatar-fallback">HZ</span>'
                  }}
                />
              </div>
              <div className="profile-info">
                <p className="greeting">{getGreeting()}! I'm</p>
                <h1>Henry Rainier Zingapan</h1>
                <p className="role">IT Student | Business Analytics</p>
                <span className="status-badge">Open to Opportunities</span>
                <p className="location">Las Piñas City, Philippines</p>
              </div>
            </div>
            <div className="profile-right">
              <p className="profile-bio">
                Aspiring IT professional with a passion for data-driven solutions and emerging technologies.
              </p>
              <div className="profile-actions">
                <button onClick={() => setShowResumePreview(true)} className="btn btn-primary clickable">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Resume
                </button>
                <a href="mailto:hczingapan@feualabang.edu.ph" className="btn btn-outline clickable">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email
                </a>
              </div>
              <div className="profile-links">
                <a href="https://www.facebook.com/rnrzngpn" target="_blank" rel="noopener noreferrer" className="icon-link clickable" aria-label="Facebook" title="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://github.com/rainierzngpn" target="_blank" rel="noopener noreferrer" className="icon-link clickable" aria-label="GitHub" title="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/rainier-zingapan-8a308922b/" target="_blank" rel="noopener noreferrer" className="icon-link clickable" aria-label="LinkedIn" title="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.section>

          {/* About Card */}
          <motion.section className="card card-about" variants={itemVariants}>
            <span className="card-label">About</span>
            <p className="about-text">
              I'm an IT student specializing in <strong>Business Analytics</strong>, driven by curiosity for how data
              shapes decisions. With certifications in <strong>AI</strong> and <strong>Networking</strong> from Certiport, I blend
              technical skills with analytical thinking to tackle complex challenges. I thrive in
              collaborative environments and love turning data into <strong>actionable insights</strong>.
            </p>
          </motion.section>

          {/* Now Card */}
          <motion.section className="card card-now" variants={itemVariants}>
            <span className="card-label">Now</span>
            <div className="now-content">
              <p>Finishing my degree in <strong>Business Analytics</strong> at FEU Alabang while exploring
              practical applications of <strong>machine learning</strong> in business contexts.</p>
              <p className="now-meta">Currently interested in predictive analytics and data visualization</p>
            </div>
          </motion.section>

          {/* Skills Card */}
          <motion.section
            id="skills"
            className="card card-stacks"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="card-label">Skills</span>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skill-item" title={`${skill.name}: ${skill.level}% proficiency`}>
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education Card */}
          <motion.section
            id="education"
            className="card card-education"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="card-label">Education</span>
            <div className="edu-list">
              <div className="edu-content">
                <h3>BS Information Technology</h3>
                <p className="edu-major">Major in Business Analytics</p>
                <p className="edu-school">FEU Alabang</p>
                <span className="edu-year">Aug 2022 — Present</span>
              </div>
              <div className="edu-content">
                <h3>Senior High School - STEM</h3>
                <p className="edu-school">University of Saint Louis Tuguegarao</p>
                <span className="edu-year">Jun 2015 — Aug 2021</span>
              </div>
            </div>
          </motion.section>

          {/* Certifications Card */}
          <motion.section
            id="certs"
            className="card card-certs"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="card-label">Certifications</span>
            <div className="certs-list">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="cert-item has-tooltip"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-meta">{cert.issuer} · {cert.year}</span>
                  <span className="cert-description-inline">{cert.description}</span>
                  <span className="tooltip">{cert.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.main>

        {/* Scroll Indicator */}
        {showScrollHint && (
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Henry Rainier Zingapan. All rights reserved.</p>
          </div>
        </motion.footer>

        
        {/* Resume Preview Modal */}
        <AnimatePresence>
          {showResumePreview && (
            <ResumePreviewModal
              isOpen={showResumePreview}
              onClose={() => setShowResumePreview(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
