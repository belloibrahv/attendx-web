import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, User, GraduationCap, Building } from 'lucide-react';

interface Leader {
  id: string;
  name: string;
  title: string;
  department?: string;
  image: string;
  bio: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  imagePosition?: string;
}

const leaders: Leader[] = [
  {
    id: 'vc',
    name: 'Prof. Adekunle Olanrewaju Adeogun',
    title: 'Vice-Chancellor',
    image: 'https://tasued.edu.ng/web/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-15-at-16.39.56.jpeg',
    bio: 'Leading TASUED towards excellence in teacher education and technological innovation, fostering academic growth and research development.',
    icon: GraduationCap,
    color: '#8B5CF6',
    imagePosition: 'center 20%'
  },
  {
    id: 'supervisor',
    name: 'Dr. Adebayo Ogundimu',
    title: 'Project Supervisor',
    department: 'Department of Computer Science Education',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    bio: 'Supervising innovative technology solutions for educational advancement at TASUED with expertise in educational technology and software development.',
    icon: User,
    color: '#3B82F6',
    imagePosition: 'center center'
  },
  {
    id: 'hod-cse',
    name: 'Prof. Olumuyiwa Adeyemi',
    title: 'Head of Department',
    department: 'Computer Science Education',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    bio: 'Leading the department in integrating technology with educational methodologies, promoting research excellence and academic innovation.',
    icon: Building,
    color: '#10B981',
    imagePosition: 'center center'
  },
  {
    id: 'hod-ict',
    name: 'Dr. Funmilayo Adebisi',
    title: 'Head of Department',
    department: 'Information & Communication Technology',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face',
    bio: 'Driving ICT innovation and digital transformation initiatives at TASUED, fostering technological advancement in education.',
    icon: Building,
    color: '#F59E0B',
    imagePosition: 'center center'
  },
  {
    id: 'dean',
    name: 'Prof. Babatunde Olatunji',
    title: 'Dean',
    department: 'School of Secondary Education (Sciences)',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
    bio: 'Fostering excellence in science education and research at TASUED, promoting innovative teaching methodologies and academic excellence.',
    icon: GraduationCap,
    color: '#EF4444',
    imagePosition: 'center center'
  }
];

export function LeadershipSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leaders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="leadership-section" id="leadership">
      <div className="leadership-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Academic Leadership</h2>
          <p className="section-subtitle">
            Meet the distinguished leaders supporting the AttendX project at TASUED
          </p>
        </motion.div>

        <div 
          className="slider-container"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="leader-card"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="leader-image-container" style={{ position: 'relative' }}>
                <img 
                  src={leaders[currentIndex].image} 
                  alt={leaders[currentIndex].name}
                  className="leader-image"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    objectPosition: leaders[currentIndex].imagePosition || 'center center',
                    borderRadius: '16px'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/300/400';
                  }}
                />
                <div className="leader-overlay" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  borderRadius: '0 0 16px 16px',
                  padding: '2rem 1.5rem 1.5rem'
                }}>
                  <div className="leader-info">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        backgroundColor: `${leaders[currentIndex].color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {React.createElement(leaders[currentIndex].icon, { 
                          size: 20, 
                          color: leaders[currentIndex].color 
                        })}
                      </div>
                      <h3 style={{ 
                        color: 'white', 
                        margin: 0, 
                        fontSize: '1.5rem',
                        fontWeight: '700'
                      }}>
                        {leaders[currentIndex].name}
                      </h3>
                    </div>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      {leaders[currentIndex].title}
                    </p>
                    {leaders[currentIndex].department && (
                      <p style={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        margin: 0,
                        fontSize: '0.9rem'
                      }}>
                        {leaders[currentIndex].department}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="leader-bio" style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '0 0 16px 16px',
                marginTop: '-16px',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  color: 'var(--ink-muted)',
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '0.95rem'
                }}>
                  {leaders[currentIndex].bio}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button 
            className="slider-btn slider-btn-prev"
            onClick={prevSlide}
            aria-label="Previous leader"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            className="slider-btn slider-btn-next"
            onClick={nextSlide}
            aria-label="Next leader"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {leaders.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}