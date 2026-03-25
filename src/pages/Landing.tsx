import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { EnhancedHero } from '../components/EnhancedHero';
import { LeadershipSlider } from '../components/LeadershipSlider';
import { ProjectTeam } from '../components/ProjectTeam';
import { ResearchOverview } from '../components/ResearchOverview';
import { KeyFeatures } from '../components/KeyFeatures';
import { DownloadSection } from '../components/DownloadSection';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15 }
  })
};

export function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="page">
      <motion.nav 
        className="navbar enhanced-navbar"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="logo-text">AttendX</span>
          <span className="logo-subtitle">TASUED</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <motion.a 
            href="#research"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Research
          </motion.a>
          <motion.a 
            href="#team"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Team
          </motion.a>
          <motion.a 
            href="#leadership"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Leadership
          </motion.a>
          <motion.a 
            href="#download"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Download
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/admin" className="nav-admin-btn">
              Admin Portal
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Navigation */}
        <motion.div 
          className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-nav-content">
            <motion.a 
              href="#research"
              onClick={closeMobileMenu}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Research
            </motion.a>
            <motion.a 
              href="#team"
              onClick={closeMobileMenu}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Team
            </motion.a>
            <motion.a 
              href="#leadership"
              onClick={closeMobileMenu}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Leadership
            </motion.a>
            <motion.a 
              href="#download"
              onClick={closeMobileMenu}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Download
            </motion.a>
            <Link to="/admin" className="nav-admin-btn mobile" onClick={closeMobileMenu}>
              Admin Portal
            </Link>
          </div>
        </motion.div>
      </motion.nav>

      <EnhancedHero />

      <KeyFeatures />

      <ResearchOverview />

      <ProjectTeam />

      <LeadershipSlider />

      <motion.section 
        className="section" 
        id="workflow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p className="section-title" variants={fadeInUp}>Implementation Workflow</motion.p>
        <div className="workflow-grid">
          {[
            {
              step: '01',
              title: 'Research & Analysis',
              description: 'Comprehensive study of existing attendance systems and identification of key challenges in educational institutions.',
              color: 'var(--tasued-primary)'
            },
            {
              step: '02', 
              title: 'System Design',
              description: 'Architecture planning with focus on scalability, security, and user experience across multiple platforms.',
              color: 'var(--tasued-secondary)'
            },
            {
              step: '03',
              title: 'Development Phase',
              description: 'Implementation of mobile applications, web dashboard, and backend APIs using modern technologies.',
              color: 'var(--tasued-accent)'
            },
            {
              step: '04',
              title: 'Testing & Deployment',
              description: 'Rigorous testing in real classroom environments followed by production deployment and user training.',
              color: 'var(--tasued-success)'
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="workflow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="workflow-step" style={{ backgroundColor: item.color }}>
                {item.step}
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <DownloadSection />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AttendX Project</h4>
            <p>Smart Attendance System for TASUED</p>
            <p>Final Year Project 2025/2026</p>
          </div>
          <div className="footer-section">
            <h4>Institution</h4>
            <p>Tai Solarin University of Education</p>
            <p>Ijagun, Ogun State, Nigeria</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>attendx@tasued.edu.ng</p>
            <p>Department of Computer Science Education</p>
          </div>
          <div className="footer-section">
            <h4>Technology</h4>
            <p>React Native • Node.js • PostgreSQL</p>
            <p>Built with modern web technologies</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2025/2026 AttendX Project - TASUED. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
