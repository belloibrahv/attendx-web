import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, BarChart3, Shield, Smartphone, RotateCcw, TrendingUp, Lock, GraduationCap, FileText, Play, ChevronDown } from 'lucide-react';
import { DownloadButton } from './DownloadButton';
import { APP_CONFIG } from '../utils/appConfig';

const heroHighlights = [
  {
    id: 'innovation',
    title: 'Smart Innovation',
    description: 'Revolutionary QR-based attendance system with biometric verification',
    icon: Rocket,
    color: '#3B82F6',
    stats: '95% fraud reduction'
  },
  {
    id: 'efficiency',
    title: 'Maximum Efficiency',
    description: 'Reduce attendance time from 20 minutes to just 2 minutes',
    icon: Zap,
    color: '#F59E0B',
    stats: '400% efficiency gain'
  },
  {
    id: 'scalability',
    title: 'Built to Scale',
    description: 'Support 500+ students per session with real-time synchronization',
    icon: BarChart3,
    color: '#10B981',
    stats: '500+ concurrent users'
  },
  {
    id: 'reliability',
    title: 'Enterprise Ready',
    description: 'Cloud-based architecture with 99.9% uptime guarantee',
    icon: Shield,
    color: '#8B5CF6',
    stats: '99.9% uptime'
  }
];

export function EnhancedHero() {
  const [currentHighlight, setCurrentHighlight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % heroHighlights.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="enhanced-hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap size={18} />
            <span>TASUED Final Year Project 2025/2026</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AttendX: Smart Attendance
            <span className="title-highlight"> Revolution</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming traditional attendance systems with cutting-edge QR technology, 
            biometric verification, and real-time analytics. Built by TASUED students 
            for the future of educational technology.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <DownloadButton
              url={APP_CONFIG.APK.DOWNLOAD_URL}
              filename="AttendX.apk"
              variant="primary"
            >
              <Smartphone size={18} style={{ marginRight: '0.5rem' }} />
              Download Mobile App
            </DownloadButton>
            
            <motion.button 
              className="button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={18} style={{ marginRight: '0.5rem' }} />
              View Research Paper
            </motion.button>
            
            <motion.a 
              href="#demo" 
              className="button ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={18} style={{ marginRight: '0.5rem' }} />
              Watch Demo
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-metrics"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="metric">
              <div className="metric-value">500+</div>
              <div className="metric-label">Students Supported</div>
            </div>
            <div className="metric">
              <div className="metric-value">95%</div>
              <div className="metric-label">Fraud Reduction</div>
            </div>
            <div className="metric">
              <div className="metric-value">2min</div>
              <div className="metric-label">Attendance Time</div>
            </div>
            <div className="metric">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">System Uptime</div>
            </div>
          </motion.div>
        </div>

        <div className="hero-showcase">
          <motion.div
            className="showcase-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="showcase-header">
              <h3>Research Highlights</h3>
              <div className="showcase-nav">
                {heroHighlights.map((_, index) => (
                  <button
                    key={index}
                    className={`nav-dot ${currentHighlight === index ? 'active' : ''}`}
                    onClick={() => setCurrentHighlight(index)}
                  />
                ))}
              </div>
            </div>

            <motion.div
              key={currentHighlight}
              className="highlight-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="highlight-icon" style={{
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: `${heroHighlights[currentHighlight].color}15`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                {React.createElement(heroHighlights[currentHighlight].icon, { 
                  size: 28, 
                  color: heroHighlights[currentHighlight].color 
                })}
              </div>
              <h4 className="highlight-title">
                {heroHighlights[currentHighlight].title}
              </h4>
              <p className="highlight-description">
                {heroHighlights[currentHighlight].description}
              </p>
              <div className="highlight-stat">
                {heroHighlights[currentHighlight].stats}
              </div>
            </motion.div>

            <div className="showcase-features">
              <div className="feature-item">
                <Smartphone size={20} color="var(--primary)" />
                <span>Cross-Platform Mobile App</span>
              </div>
              <div className="feature-item">
                <RotateCcw size={20} color="var(--primary)" />
                <span>Real-Time Synchronization</span>
              </div>
              <div className="feature-item">
                <TrendingUp size={20} color="var(--primary)" />
                <span>Advanced Analytics</span>
              </div>
              <div className="feature-item">
                <Lock size={20} color="var(--primary)" />
                <span>Biometric Security</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="floating-elements">
            <motion.div
              className="floating-qr"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="qr-placeholder">
                <div className="qr-pattern"></div>
              </div>
            </motion.div>

            <motion.div
              className="floating-stats"
              animate={{
                y: [0, 15, 0],
                x: [0, 10, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="stats-card">
                <div className="stats-title">Live Session</div>
                <div className="stats-value">126/500</div>
                <div className="stats-label">Students Checked In</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="scroll-text">Scroll to explore</div>
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}