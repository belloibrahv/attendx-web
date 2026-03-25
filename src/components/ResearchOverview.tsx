import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, Zap, TrendingUp, Microscope, Rocket, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ResearchPoint {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  details: string[];
  stats?: {
    label: string;
    value: string;
  };
}

const researchPoints: ResearchPoint[] = [
  {
    id: 'problem',
    title: 'Problem Statement',
    description: 'Traditional attendance systems are inefficient, prone to fraud, and time-consuming for large lecture halls.',
    icon: Target,
    color: '#EF4444',
    details: [
      'Manual attendance takes 15-20 minutes in large classes',
      'Proxy attendance is common with paper-based systems',
      'Difficulty tracking attendance patterns and analytics',
      'No real-time monitoring for lecturers',
      'Paper-based systems are environmentally unfriendly'
    ],
    stats: {
      label: 'Time Saved Per Session',
      value: '85%'
    }
  },
  {
    id: 'solution',
    title: 'Innovative Solution',
    description: 'AttendX combines QR technology, biometric verification, and real-time analytics for seamless attendance management.',
    icon: Lightbulb,
    color: '#F59E0B',
    details: [
      'Rotating QR codes prevent reuse and fraud',
      'Face verification ensures authentic attendance',
      'Real-time dashboard for instant monitoring',
      'Multiple check-in methods for accessibility',
      'Automated report generation and analytics'
    ],
    stats: {
      label: 'Fraud Reduction',
      value: '95%'
    }
  },
  {
    id: 'technology',
    title: 'Technology Stack',
    description: 'Modern, scalable architecture built with cutting-edge technologies for reliability and performance.',
    icon: Zap,
    color: '#8B5CF6',
    details: [
      'React Native for cross-platform mobile apps',
      'Node.js with Express for robust backend APIs',
      'PostgreSQL with Prisma for data management',
      'AWS Rekognition for face verification',
      'Real-time synchronization across devices'
    ],
    stats: {
      label: 'System Uptime',
      value: '99.9%'
    }
  },
  {
    id: 'impact',
    title: 'Expected Impact',
    description: 'Transforming attendance management across TASUED with measurable improvements in efficiency and accuracy.',
    icon: TrendingUp,
    color: '#10B981',
    details: [
      'Reduce attendance time from 20 minutes to 2 minutes',
      'Eliminate proxy attendance completely',
      'Provide real-time attendance analytics',
      'Support 500+ students per session',
      'Generate automated compliance reports'
    ],
    stats: {
      label: 'Efficiency Gain',
      value: '400%'
    }
  },
  {
    id: 'research',
    title: 'Research Methodology',
    description: 'Comprehensive research approach combining literature review, surveys, and prototype testing.',
    icon: Microscope,
    color: '#3B82F6',
    details: [
      'Literature review of 50+ academic papers',
      'Survey of 200+ students and 30+ lecturers',
      'Comparative analysis of existing systems',
      'Prototype testing in real classroom environments',
      'Statistical analysis of attendance patterns'
    ],
    stats: {
      label: 'Research Participants',
      value: '230+'
    }
  },
  {
    id: 'future',
    title: 'Future Enhancements',
    description: 'Planned features and improvements based on user feedback and emerging technologies.',
    icon: Rocket,
    color: '#EC4899',
    details: [
      'AI-powered attendance pattern analysis',
      'Integration with university management systems',
      'Predictive analytics for student engagement',
      'Voice recognition as additional verification',
      'Blockchain for immutable attendance records'
    ],
    stats: {
      label: 'Planned Features',
      value: '15+'
    }
  }
];

export function ResearchOverview() {
  const [activePoint, setActivePoint] = useState(0);

  return (
    <section className="research-overview" id="research">
      <div className="research-container">
        <motion.div
          className="research-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Research Overview</h2>
          <p className="section-subtitle">
            Comprehensive research and development approach behind the AttendX smart attendance system
          </p>
        </motion.div>

        <div className="research-content">
          {/* Navigation Tabs */}
          <div className="research-tabs">
            {researchPoints.map((point, index) => (
              <motion.button
                key={point.id}
                className={`research-tab ${activePoint === index ? 'active' : ''}`}
                onClick={() => setActivePoint(index)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: `${point.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem'
                }}>
                  {React.createElement(point.icon, { 
                    size: 20, 
                    color: point.color 
                  })}
                </div>
                <span className="tab-title">{point.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Content Display */}
          <div className="research-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoint}
                className="research-content-panel"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="research-main">
                  <div className="research-icon" style={{
                    padding: '1rem',
                    borderRadius: '16px',
                    backgroundColor: `${researchPoints[activePoint].color}15`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {React.createElement(researchPoints[activePoint].icon, { 
                      size: 32, 
                      color: researchPoints[activePoint].color 
                    })}
                  </div>
                  <h3 className="research-title">
                    {researchPoints[activePoint].title}
                  </h3>
                  <p className="research-description">
                    {researchPoints[activePoint].description}
                  </p>

                  {researchPoints[activePoint].stats && (
                    <motion.div 
                      className="research-stat"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="stat-value">
                        {researchPoints[activePoint].stats!.value}
                      </div>
                      <div className="stat-label">
                        {researchPoints[activePoint].stats!.label}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="research-details">
                  <h4>Key Points:</h4>
                  <ul className="research-list">
                    {researchPoints[activePoint].details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}
                      >
                        <CheckCircle size={16} color={researchPoints[activePoint].color} style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="research-progress">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${((activePoint + 1) / researchPoints.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="progress-text">
              {activePoint + 1} of {researchPoints.length}
            </div>
          </div>
        </div>

        {/* Auto-advance controls */}
        <div className="research-controls">
          <motion.button
            className="control-btn"
            onClick={() => setActivePoint(Math.max(0, activePoint - 1))}
            disabled={activePoint === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
            Previous
          </motion.button>
          
          <motion.button
            className="control-btn"
            onClick={() => setActivePoint(Math.min(researchPoints.length - 1, activePoint + 1))}
            disabled={activePoint === researchPoints.length - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}