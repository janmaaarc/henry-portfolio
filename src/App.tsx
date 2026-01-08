import { useState, useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
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
  { name: 'IT Specialist in Artificial Intelligence', issuer: 'Certiport', year: '2025' },
  { name: 'IT Specialist in Networking', issuer: 'Certiport', year: '2024' }
]

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
  const [isLoaded, setIsLoaded] = useState(false)
  const [themeAnnouncement, setThemeAnnouncement] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
    setIsLoaded(true)
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
          <motion.section className="card card-profile" variants={itemVariants}>
            <div className="profile-left">
              <div className="avatar">
                <img src="/image/henry-profile.jpg" alt="Henry Rainier Zingapan" loading="lazy" />
              </div>
              <div className="profile-info">
                <h1>Henry Rainier Zingapan</h1>
                <p className="role">IT Student | Business Analytics</p>
                <p className="location">Las Piñas City, Philippines</p>
              </div>
            </div>
            <div className="profile-right">
              <p className="profile-bio">
                Aspiring IT professional with a passion for data-driven solutions and emerging technologies.
              </p>
              <div className="profile-actions">
                <a href="/resume/Henry Rainier C. Zingapan - Briefcase Resume.pdf" download className="btn btn-outline clickable">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Resume
                </a>
                <a href="mailto:hczingapan@feualabang.edu.ph" className="email-link clickable" aria-label="Email">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="email-text">hczingapan@feualabang.edu.ph</span>
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
            className="card card-stacks"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="card-label">Skills</span>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
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
                  className="cert-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-meta">{cert.issuer} · {cert.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.main>

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
      </div>
    </>
  )
}

export default App
