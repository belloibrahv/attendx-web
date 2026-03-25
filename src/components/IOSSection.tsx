import { motion } from 'framer-motion';
import { Smartphone, CreditCard, Shield, TestTube, Clock, Mail, Apple } from 'lucide-react';
import { APP_CONFIG } from '../utils/appConfig';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 }
  })
};

export function IOSSection() {
  return (
    <motion.div
      className="ios-status-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(227, 240, 234, 0.6))',
        border: '1px solid rgba(46, 90, 143, 0.1)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '1.5rem',
        textAlign: 'center'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '0.75rem', 
        marginBottom: '1rem' 
      }}>
        <div style={{
          padding: '1rem',
          borderRadius: '12px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Apple size={32} color="#3B82F6" />
        </div>
      </div>
      
      <h3 style={{ 
        color: 'var(--tasued-primary)', 
        marginBottom: '1rem',
        fontSize: '1.5rem'
      }}>
        iOS Version Coming Soon
      </h3>
      
      <p style={{ 
        color: 'var(--ink-muted)', 
        marginBottom: '1.5rem',
        lineHeight: 1.6
      }}>
        We're working on bringing AttendX to iOS devices. The app is technically ready, 
        but we need an Apple Developer account to build and distribute iOS apps.
      </p>

      <div className="ios-requirements" style={{
        background: 'rgba(46, 90, 143, 0.05)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ 
          color: 'var(--tasued-primary)', 
          marginBottom: '1rem',
          fontSize: '1.1rem'
        }}>
          What's Needed for iOS Release
        </h4>
        
        <div style={{ 
          display: 'grid', 
          gap: '0.75rem', 
          fontSize: '0.9rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={16} color="var(--primary)" />
            <span>Apple Developer Account ({APP_CONFIG.IOS.ESTIMATED_COST})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={16} color="var(--primary)" />
            <span>Code signing certificates and provisioning profiles</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TestTube size={16} color="var(--primary)" />
            <span>TestFlight beta testing setup</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={16} color="var(--primary)" />
            <span>App Store review and approval process</span>
          </div>
        </div>
      </div>

      <div className="ios-timeline" style={{
        background: 'rgba(196, 160, 53, 0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <Clock size={20} color="var(--tasued-accent)" />
          <h4 style={{ 
            color: 'var(--tasued-accent)', 
            margin: 0,
            fontSize: '1.1rem'
          }}>
            Estimated Timeline
          </h4>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gap: '0.5rem', 
          fontSize: '0.9rem',
          color: 'var(--ink-muted)'
        }}>
          <p><strong>Week 1:</strong> Apple Developer account setup and verification</p>
          <p><strong>Week 2:</strong> Certificate generation and first iOS build</p>
          <p><strong>Week 3:</strong> TestFlight beta testing with select users</p>
          <p><strong>Week 4:</strong> App Store submission and review</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.button 
          className="button secondary"
          style={{ cursor: 'not-allowed', opacity: 0.7 }}
          disabled
          whileHover={{ scale: 1 }}
        >
          <Apple size={18} style={{ marginRight: '0.5rem' }} />
          iOS App - Coming Soon
        </motion.button>
        
        <motion.a 
          href="mailto:attendx@tasued.edu.ng?subject=iOS%20App%20Interest&body=I'm%20interested%20in%20the%20iOS%20version%20of%20AttendX"
          className="button ghost"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail size={18} style={{ marginRight: '0.5rem' }} />
          Get Notified When Ready
        </motion.a>
      </div>

      <p style={{ 
        fontSize: '0.8rem', 
        color: 'var(--ink-muted)', 
        marginTop: '1rem',
        fontStyle: 'italic'
      }}>
        In the meantime, iPhone users can access the web version or use Android devices for attendance.
      </p>
    </motion.div>
  );
}