import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  return (
    <div className="page">
      <motion.nav 
        className="navbar"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="nav-logo">AttendX</div>
        <div className="nav-links">
          <a href="#research">Research</a>
          <a href="#team">Team</a>
          <a href="#leadership">Leadership</a>
          <a href="#download">Download</a>
          <Link to="/admin">Admin</Link>
        </div>
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
