import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Users, Monitor, Download, Package, Shield, RefreshCw, CheckCircle } from 'lucide-react';
import { DownloadButton } from './DownloadButton';
import { IOSSection } from './IOSSection';
import { APP_CONFIG, getDownloadFilename, getAppInfo } from '../utils/appConfig';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 }
  })
};

export function DownloadSection() {
  const appInfo = getAppInfo();
  const downloadOptions = [
    {
      title: 'Student App',
      description: 'Scan QR codes, verify your face, and track your attendance history.',
      buttonText: 'Download for Android',
      filename: getDownloadFilename('student'),
      delay: 0,
      icon: Users,
      color: '#3B82F6'
    },
    {
      title: 'Lecturer App',
      description: 'Start sessions, display live QR tokens, and export attendance reports.',
      buttonText: 'Download for Lecturers',
      filename: getDownloadFilename('lecturer'),
      delay: 0.1,
      icon: Monitor,
      color: '#10B981'
    },
    {
      title: 'Kiosk Package',
      description: 'Install the kiosk scanner on a tablet at the classroom entrance.',
      buttonText: 'Download Kiosk App',
      filename: getDownloadFilename('kiosk'),
      delay: 0.2,
      icon: Package,
      color: '#F59E0B'
    }
  ];

  return (
    <motion.section 
      className="section" 
      id="download"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.p 
        className="section-title" 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Download AttendX
      </motion.p>
      
      <motion.p 
        className="section-subtitle"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
        style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}
      >
        Get the AttendX mobile app for your role. All versions work together to create a seamless attendance experience.
      </motion.p>

      <div className="grid">
        {downloadOptions.map((option) => (
          <motion.div
            key={option.title}
            className="card download-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={option.delay}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginBottom: '1rem' 
            }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: '12px',
                backgroundColor: `${option.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {React.createElement(option.icon, { 
                  size: 24, 
                  color: option.color 
                })}
              </div>
              <h4 style={{ margin: 0 }}>{option.title}</h4>
            </div>
            
            <p>{option.description}</p>
            
            <div className="download-info" style={{ 
              margin: '1rem 0', 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Smartphone size={16} />
                Android APK • Version {appInfo.version}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={16} />
                Size: {appInfo.size} • Requires Android {appInfo.minAndroid}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <DownloadButton
                url={APP_CONFIG.APK.DOWNLOAD_URL}
                filename={option.filename}
                variant="primary"
              >
                <Download size={18} style={{ marginRight: '0.5rem' }} />
                {option.buttonText}
              </DownloadButton>
            </div>

            <div style={{ 
              marginTop: '0.75rem', 
              fontSize: '0.75rem', 
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <Smartphone size={14} />
              {APP_CONFIG.FEATURES.IOS_COMING_SOON ? 'iOS version in development' : 'iOS version available'}
            </div>
          </motion.div>
        ))}
      </div>

      {APP_CONFIG.FEATURES.IOS_COMING_SOON && <IOSSection />}

      <motion.div
        className="download-notes"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          backgroundColor: 'var(--surface-secondary)',
          borderRadius: '12px',
          textAlign: 'center'
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <Shield size={20} color="var(--primary)" />
          <h4 style={{ margin: 0 }}>Installation Notes</h4>
        </div>
        <div style={{ 
          display: 'grid', 
          gap: '0.75rem', 
          fontSize: '0.875rem', 
          color: 'var(--text-secondary)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} color="var(--success)" />
            <span><strong>Enable "Install from Unknown Sources"</strong> in your Android settings to install the APK</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Shield size={16} color="var(--success)" />
            <span><strong>Security:</strong> This APK is signed and safe to install from TASUED</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} color="var(--primary)" />
            <span><strong>Updates:</strong> Check back here for the latest version or enable auto-updates in the app</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}