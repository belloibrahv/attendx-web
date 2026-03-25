import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  image: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'lead',
    name: 'Ibrahim Bello',
    role: 'Project Lead & Full-Stack Developer',
    specialization: 'Implementation (Web & Mobile)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Leading the technical implementation of AttendX with expertise in React Native, Node.js, and modern web technologies.',
    skills: ['React Native', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    github: 'https://github.com/belloibrahv',
    linkedin: '#',
    color: '#3B82F6'
  },
  {
    id: 'researcher1',
    name: 'Adebayo Ogundimu',
    role: 'Lead Researcher',
    specialization: 'Research & Analysis',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Conducting comprehensive research on attendance systems and educational technology integration.',
    skills: ['Research Methodology', 'Data Analysis', 'Academic Writing', 'Survey Design'],
    linkedin: '#',
    color: '#10B981'
  },
  {
    id: 'web-dev',
    name: 'Fatima Adesanya',
    role: 'Frontend Developer',
    specialization: 'Implementation (Web)',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    bio: 'Crafting beautiful and intuitive user interfaces for the AttendX web dashboard and admin panel.',
    skills: ['React', 'TypeScript', 'CSS/SCSS', 'UI/UX Design', 'Responsive Design'],
    github: '#',
    linkedin: '#',
    color: '#F59E0B'
  },
  {
    id: 'mobile-dev',
    name: 'Olumide Adeyemi',
    role: 'Mobile Developer',
    specialization: 'Implementation (Mobile App)',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
    bio: 'Developing cross-platform mobile applications with focus on performance and user experience.',
    skills: ['React Native', 'Expo', 'Mobile UI/UX', 'Camera Integration', 'Offline Storage'],
    github: '#',
    linkedin: '#',
    color: '#8B5CF6'
  },
  {
    id: 'researcher2',
    name: 'Kemi Oladele',
    role: 'Research Assistant',
    specialization: 'Research & Documentation',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
    bio: 'Supporting research activities and creating comprehensive documentation for the AttendX project.',
    skills: ['Technical Writing', 'Data Collection', 'Literature Review', 'Project Documentation'],
    linkedin: '#',
    color: '#EF4444'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export function ProjectTeam() {
  return (
    <section className="team-section" style={{ padding: '4rem 0', background: 'var(--cream)' }}>
      <div className="team-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: 'var(--tasued-primary)',
            marginBottom: '1rem'
          }}>
            Project Team
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--ink-muted)', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Meet the dedicated students behind the AttendX smart attendance system
          </p>
        </motion.div>

        {/* Creative Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(3, auto)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Lead Developer - Large Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              gridColumn: '1 / 8',
              gridRow: '1 / 3',
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: `3px solid ${teamMembers[0].color}20`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${teamMembers[0].color}, ${teamMembers[0].color}80)`
            }} />
            
            <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
              <div style={{ flex: '0 0 120px' }}>
                <img 
                  src={teamMembers[0].image} 
                  alt={teamMembers[0].name}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: `3px solid ${teamMembers[0].color}30`
                  }}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: `${teamMembers[0].color}15`,
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: teamMembers[0].color
                  }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: teamMembers[0].color }}>
                    PROJECT LEAD
                  </span>
                </div>
                
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: 'var(--ink)', 
                  marginBottom: '0.5rem' 
                }}>
                  {teamMembers[0].name}
                </h3>
                
                <p style={{ 
                  fontSize: '1rem', 
                  color: teamMembers[0].color, 
                  fontWeight: '600',
                  marginBottom: '1rem' 
                }}>
                  {teamMembers[0].role}
                </p>
                
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--ink-muted)', 
                  lineHeight: '1.5',
                  marginBottom: '1.5rem'
                }}>
                  {teamMembers[0].bio}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {teamMembers[0].skills.slice(0, 3).map((skill, index) => (
                    <span key={index} style={{
                      background: `${teamMembers[0].color}10`,
                      color: teamMembers[0].color,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Member 2 - Top Right */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              gridColumn: '8 / 13',
              gridRow: '1',
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: `2px solid ${teamMembers[1].color}20`
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <img 
                src={teamMembers[1].image} 
                alt={teamMembers[1].name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: 'var(--ink)',
                  marginBottom: '0.25rem'
                }}>
                  {teamMembers[1].name}
                </h4>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: teamMembers[1].color,
                  fontWeight: '500'
                }}>
                  {teamMembers[1].role}
                </p>
              </div>
            </div>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--ink-muted)', 
              lineHeight: '1.4'
            }}>
              {teamMembers[1].bio.substring(0, 80)}...
            </p>
          </motion.div>

          {/* Team Member 3 - Middle Right */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              gridColumn: '8 / 13',
              gridRow: '2',
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: `2px solid ${teamMembers[2].color}20`
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <img 
                src={teamMembers[2].image} 
                alt={teamMembers[2].name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: 'var(--ink)',
                  marginBottom: '0.25rem'
                }}>
                  {teamMembers[2].name}
                </h4>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: teamMembers[2].color,
                  fontWeight: '500'
                }}>
                  {teamMembers[2].role}
                </p>
              </div>
            </div>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--ink-muted)', 
              lineHeight: '1.4'
            }}>
              {teamMembers[2].bio.substring(0, 80)}...
            </p>
          </motion.div>

          {/* Team Members 4 & 5 - Bottom Row */}
          {teamMembers.slice(3).map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                gridColumn: index === 0 ? '1 / 7' : '7 / 13',
                gridRow: '3',
                background: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: `2px solid ${member.color}20`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: 'var(--ink)',
                    marginBottom: '0.25rem'
                  }}>
                    {member.name}
                  </h4>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: member.color,
                    fontWeight: '500'
                  }}>
                    {member.role}
                  </p>
                </div>
              </div>
              <p style={{ 
                fontSize: '0.8rem', 
                color: 'var(--ink-muted)', 
                lineHeight: '1.4'
              }}>
                {member.bio.substring(0, 80)}...
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--tasued-primary)',
              marginBottom: '0.5rem'
            }}>
              5
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'var(--ink-muted)',
              fontWeight: '500'
            }}>
              Team Members
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--tasued-accent)',
              marginBottom: '0.5rem'
            }}>
              2
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'var(--ink-muted)',
              fontWeight: '500'
            }}>
              Research Specialists
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--tasued-success)',
              marginBottom: '0.5rem'
            }}>
              3
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'var(--ink-muted)',
              fontWeight: '500'
            }}>
              Implementation Experts
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'var(--coral)',
              marginBottom: '0.5rem'
            }}>
              18+
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'var(--ink-muted)',
              fontWeight: '500'
            }}>
              Months Development
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}