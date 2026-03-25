import React from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Smartphone, 
  Clock, 
  CheckCircle,
  Eye,
  Download,
  Wifi,
  Lock
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  category: 'core' | 'security' | 'analytics' | 'mobile';
}

const features: Feature[] = [
  {
    id: 'qr-scanning',
    title: 'Dynamic QR Code Scanning',
    description: 'Rotating QR codes that refresh every 30 seconds to prevent fraud and ensure secure attendance marking.',
    icon: QrCode,
    color: '#3B82F6',
    category: 'core'
  },
  {
    id: 'face-verification',
    title: 'Biometric Face Verification',
    description: 'Advanced facial recognition technology to eliminate proxy attendance and ensure authentic check-ins.',
    icon: Eye,
    color: '#10B981',
    category: 'security'
  },
  {
    id: 'real-time',
    title: 'Real-Time Synchronization',
    description: 'Instant updates across all devices with live attendance tracking and session monitoring.',
    icon: Zap,
    color: '#F59E0B',
    category: 'core'
  },
  {
    id: 'multi-role',
    title: 'Multi-Role Support',
    description: 'Comprehensive system supporting students, lecturers, and kiosk operators with role-based access.',
    icon: Users,
    color: '#8B5CF6',
    category: 'core'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Detailed attendance reports, pattern analysis, and insights for better educational management.',
    icon: BarChart3,
    color: '#EF4444',
    category: 'analytics'
  },
  {
    id: 'mobile-first',
    title: 'Mobile-First Design',
    description: 'Optimized for smartphones with intuitive interfaces and offline capability for seamless usage.',
    icon: Smartphone,
    color: '#06B6D4',
    category: 'mobile'
  },
  {
    id: 'speed',
    title: 'Lightning Fast',
    description: 'Reduce attendance time from 20 minutes to just 2 minutes with automated processes.',
    icon: Clock,
    color: '#84CC16',
    category: 'core'
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'JWT authentication, encrypted data transmission, and secure cloud infrastructure.',
    icon: Lock,
    color: '#DC2626',
    category: 'security'
  },
  {
    id: 'offline',
    title: 'Offline Support',
    description: 'Continue marking attendance even without internet connection with automatic sync when online.',
    icon: Wifi,
    color: '#7C3AED',
    category: 'mobile'
  },
  {
    id: 'reports',
    title: 'Export & Reports',
    description: 'Generate comprehensive reports in CSV and PDF formats for administrative purposes.',
    icon: Download,
    color: '#059669',
    category: 'analytics'
  },
  {
    id: 'accuracy',
    title: '99.9% Accuracy',
    description: 'Highly accurate attendance tracking with multiple verification methods and fraud prevention.',
    icon: CheckCircle,
    color: '#0891B2',
    category: 'security'
  },
  {
    id: 'scalable',
    title: 'Highly Scalable',
    description: 'Support for 500+ concurrent users per session with cloud-based architecture.',
    icon: Shield,
    color: '#BE185D',
    category: 'core'
  }
];

const categories = {
  core: { name: 'Core Features', color: '#3B82F6' },
  security: { name: 'Security & Verification', color: '#10B981' },
  analytics: { name: 'Analytics & Reports', color: '#F59E0B' },
  mobile: { name: 'Mobile Experience', color: '#8B5CF6' }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export function KeyFeatures() {
  return (
    <section 
      className="key-features-section"
      style={{ 
        padding: '5rem 0', 
        background: 'linear-gradient(135deg, var(--sky) 0%, var(--mint) 100%)' 
      }}
    >
      <div className="features-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="features-header"
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="features-title" style={{ 
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
            fontWeight: '700', 
            color: 'var(--tasued-primary)',
            marginBottom: '1rem'
          }}>
            Key Features
          </h2>
          <p className="features-subtitle" style={{ 
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
            color: 'var(--ink-muted)', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover the powerful features that make AttendX the most advanced attendance management system
          </p>
        </motion.div>

        {/* Feature Categories */}
        {Object.entries(categories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="feature-category" style={{ marginBottom: '3rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="category-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{
                width: '4px',
                height: '24px',
                background: category.color,
                borderRadius: '2px'
              }} />
              <h3 className="category-title" style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                fontWeight: '600',
                color: 'var(--ink)',
                margin: 0
              }}>
                {category.name}
              </h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="features-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {features
                .filter(feature => feature.category === categoryKey)
                .map((feature) => (
                  <motion.div
                    key={feature.id}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="feature-card"
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '2rem',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      border: `2px solid ${feature.color}15`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`
                    }} />
                    
                    <div className="feature-content" style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div className="feature-icon" style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        background: `${feature.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {React.createElement(feature.icon, { 
                          size: 24, 
                          color: feature.color 
                        })}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 className="feature-title" style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                          fontWeight: '600',
                          color: 'var(--ink)',
                          marginBottom: '0.5rem',
                          lineHeight: '1.3'
                        }}>
                          {feature.title}
                        </h4>
                        
                        <p className="feature-description" style={{
                          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                          color: 'var(--ink-muted)',
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        ))}

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="feature-highlights"
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            marginTop: '3rem'
          }}
        >
          <h3 className="highlights-title" style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
            fontWeight: '700',
            color: 'var(--tasued-primary)',
            marginBottom: '2rem'
          }}>
            Why Choose AttendX?
          </h3>
          
          <div className="highlights-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem'
          }}>
            <div className="highlight-item">
              <div className="highlight-value" style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '700',
                color: 'var(--tasued-success)',
                marginBottom: '0.5rem'
              }}>
                95%
              </div>
              <div className="highlight-label" style={{
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: 'var(--ink-muted)',
                fontWeight: '500'
              }}>
                Fraud Reduction
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-value" style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '700',
                color: 'var(--tasued-accent)',
                marginBottom: '0.5rem'
              }}>
                2min
              </div>
              <div className="highlight-label" style={{
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: 'var(--ink-muted)',
                fontWeight: '500'
              }}>
                Attendance Time
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-value" style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '700',
                color: 'var(--tasued-primary)',
                marginBottom: '0.5rem'
              }}>
                500+
              </div>
              <div className="highlight-label" style={{
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: 'var(--ink-muted)',
                fontWeight: '500'
              }}>
                Concurrent Users
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-value" style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: '700',
                color: 'var(--coral)',
                marginBottom: '0.5rem'
              }}>
              99.9%
              </div>
              <div className="highlight-label" style={{
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: 'var(--ink-muted)',
                fontWeight: '500'
              }}>
                System Uptime
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}