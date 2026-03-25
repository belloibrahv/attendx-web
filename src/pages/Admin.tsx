import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api, setAuthToken } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';

const BUCKET_MS = 10 * 60 * 1000;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

function buildTimeSeries(attendance: any[]) {
  const times = attendance
    .map((row) => new Date(row.createdAt).getTime())
    .filter((t) => !Number.isNaN(t))
    .sort((a, b) => a - b);

  if (!times.length) return [];

  const start = Math.floor(times[0] / BUCKET_MS) * BUCKET_MS;
  const end = Math.ceil(times[times.length - 1] / BUCKET_MS) * BUCKET_MS;
  const buckets = new Map<number, number>();

  times.forEach((t) => {
    const bucket = start + Math.floor((t - start) / BUCKET_MS) * BUCKET_MS;
    buckets.set(bucket, (buckets.get(bucket) || 0) + 1);
  });

  const series = [];
  for (let time = start; time <= end; time += BUCKET_MS) {
    series.push({ time, count: buckets.get(time) || 0 });
  }
  return series;
}

export function Admin() {
  const [identifier, setIdentifier] = useState('TASUED-LEC-204');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<any | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [attendance, setAttendance] = useState<any[]>([]);
  const [summary, setSummary] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [qrToken, setQrToken] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [filters, setFilters] = useState({
    studentId: '',
    method: '',
    status: '',
    courseCode: '',
    from: '',
    to: '',
  });
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [form, setForm] = useState({
    courseCode: 'EDU 401',
    courseTitle: 'Curriculum & Instruction',
    room: 'TETFund Hall',
    startTime: '11:00 AM',
    endTime: '1:00 PM',
    expectedCount: 500,
    faceRequired: true,
    qrRotationSeconds: 10,
  });

  const loggedIn = Boolean(token);

  const buildQuery = (withFormat?: string) => {
    const params = new URLSearchParams();
    if (selectedSessionId) params.set('sessionId', selectedSessionId);
    if (filters.studentId) params.set('studentId', filters.studentId);
    if (filters.method) params.set('method', filters.method);
    if (filters.status) params.set('status', filters.status);
    if (filters.courseCode) params.set('courseCode', filters.courseCode);
    if (filters.from) params.set('from', filters.from);
    if (filters.to) params.set('to', filters.to);
    if (withFormat) params.set('format', withFormat);
    const query = params.toString();
    return query ? `?${query}` : '';
  };

  const loadSessions = async () => {
    const data = await api.getSessions();
    setSessions(data);
    if (data.length && !selectedSessionId) {
      setSelectedSessionId(data[data.length - 1].id);
    }
  };

  const loadActive = async () => {
    const data = await api.getActiveSession();
    setActiveSession(data);
  };

  const loadQrToken = async () => {
    if (!activeSession?.id) return;
    try {
      const data = await api.getQrToken(activeSession.id);
      setQrToken(data.token);
      setSecondsLeft(activeSession.qrRotationSeconds || 10);
    } catch (err) {
      console.error('Failed to fetch QR token:', err);
    }
  };

  const loadAttendance = async () => {
    if (!selectedSessionId) return;
    const list = await api.getAttendanceReport(buildQuery());
    setAttendance(list);
    const summaryData = await api.getSummary(selectedSessionId);
    setSummary(summaryData);
  };

  useEffect(() => {
    if (!loggedIn) return;
    loadSessions();
    loadActive();
  }, [loggedIn]);

  useEffect(() => {
    if (!activeSession) {
      setQrToken('');
      return;
    }

    loadQrToken();
    const interval = setInterval(loadQrToken, (activeSession.qrRotationSeconds || 10) * 1000);
    const countdown = setInterval(() => {
      setSecondsLeft(prev => prev <= 1 ? (activeSession.qrRotationSeconds || 10) : prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [activeSession?.id, activeSession?.qrRotationSeconds]);

  useEffect(() => {
    if (!loggedIn || !selectedSessionId) return;
    loadAttendance();
    const interval = setInterval(loadAttendance, 10000);
    return () => clearInterval(interval);
  }, [loggedIn, selectedSessionId]);

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      if (!identifier || !password) {
        setError('Enter staff ID and password.');
        setLoading(false);
        return;
      }
      const data = await api.login({ role: 'lecturer', identifier, password });
      setAuthToken(data.token);
      setToken(data.token);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setError('');
      setLoading(true);
      if (!identifier || !password) {
        setError('Enter staff ID and password.');
        setLoading(false);
        return;
      }
      const data = await api.register({ role: 'lecturer', identifier, password, name });
      setAuthToken(data.token);
      setToken(data.token);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    try {
      setError('');
      setLoading(true);
      await api.startSession({
        ...form,
        expectedCount: Number(form.expectedCount),
      });
      await loadSessions();
      await loadActive();
    } catch (err: any) {
      setError(err.message || 'Could not start session');
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = async () => {
    if (!activeSession) return;
    setLoading(true);
    await api.endSession(activeSession.id);
    await loadActive();
    await loadSessions();
    setQrToken('');
    setLoading(false);
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    if (!selectedSessionId) return;
    setLoading(true);
    const blob = await api.exportAttendance(buildQuery(format));
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance.${format}`;
    link.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken('');
    setSessions([]);
    setActiveSession(null);
    setAttendance([]);
    setQrToken('');
  };

  const sessionOptions = useMemo(() => sessions, [sessions]);
  const methodStats = useMemo(() => {
    const counts = { qr: 0, kiosk: 0 };
    attendance.forEach((row) => {
      if (row.method === 'kiosk') counts.kiosk += 1;
      else counts.qr += 1;
    });
    const total = counts.qr + counts.kiosk;
    return { ...counts, total };
  }, [attendance]);
  const series = useMemo(() => buildTimeSeries(attendance), [attendance]);

  const progress = summary ? Math.min((summary.total / (summary.expected || 1)) * 100, 100) : 0;

  return (
    <div className="page">
      <motion.nav 
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-logo">AttendX</div>
        <div className="nav-links">
          <Link to="/">Landing</Link>
          {loggedIn && (
            <motion.button 
              className="button ghost"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          )}
        </div>
      </motion.nav>

      <div className="admin-container">
        {!loggedIn ? (
          <motion.div
            className="card glass-card"
            style={{ maxWidth: 440, margin: '0 auto' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </motion.h3>
            <p className="notice">
              {mode === 'login'
                ? 'Sign in to manage attendance sessions.'
                : 'Register to start managing attendance.'}
            </p>
            <div className="form-grid" style={{ marginTop: 20 }}>
              {mode === 'register' ? (
                <motion.input
                  className="input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full Name"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                />
              ) : null}
              <motion.input
                className="input"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Staff ID"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              />
              <motion.input
                className="input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              />
              {error ? (
                <motion.span 
                  style={{ color: 'var(--coral)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.span>
              ) : null}
              <motion.button
                className="button primary"
                onClick={mode === 'login' ? handleLogin : handleRegister}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </motion.button>
              <motion.button
                className="button ghost"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                whileHover={{ scale: 1.02 }}
              >
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="admin-header"
              variants={fadeInUp}
            >
              <div>
                <h2 className="admin-title">Dashboard</h2>
                <p style={{ color: 'var(--ink-muted)', marginTop: 4 }}>
                  Monitor sessions, track attendance, and export reports.
                </p>
              </div>
              <motion.div 
                className="hero-actions"
                variants={fadeInUp}
              >
                {activeSession && (
                  <motion.button 
                    className="button secondary" 
                    onClick={handleEndSession}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    End Session
                  </motion.button>
                )}
                <motion.button 
                  className="button ghost" 
                  onClick={() => handleExport('csv')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  CSV
                </motion.button>
                <motion.button 
                  className="button ghost" 
                  onClick={() => handleExport('pdf')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  PDF
                </motion.button>
              </motion.div>
            </motion.div>

            {activeSession ? (
              <motion.div variants={fadeInUp} custom={1}>
                <div className="live-badge" style={{ marginBottom: 20 }}>
                  <span className="dot" />
                  Live Session
                </div>
                
                {/* QR Code Section */}
                <motion.div 
                  className="qr-section glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h4 
                    style={{ marginBottom: 8 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    📱 Project This QR Code
                  </motion.h4>
                  <p style={{ color: 'var(--ink-muted)', marginBottom: 20 }}>
                    Students scan to check in • Updates every {activeSession.qrRotationSeconds}s
                  </p>
                  <motion.div
                    style={{ display: 'inline-block', padding: 20, background: 'white', borderRadius: 20 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <QRCodeSVG 
                      value={qrToken || 'waiting'} 
                      size={220}
                      level="H"
                      includeMargin
                    />
                  </motion.div>
                  <div className="qr-timer">
                    🔄 Refreshing in {secondsLeft}s
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 12, fontFamily: 'monospace' }}>
                    {qrToken ? qrToken.substring(0, 30) + '...' : 'Generating...'}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="notice" 
                style={{ marginBottom: 20 }}
                variants={fadeInUp}
                custom={1}
              >
                No active session. Start one below.
              </motion.div>
            )}

            <div className="admin-grid">
              {/* Start Session Card */}
              <motion.div 
                className="card" 
                variants={fadeInUp}
                custom={2}
              >
                <h4>🚀 Start New Session</h4>
                <div className="form-grid">
                  <input
                    className="input"
                    value={form.courseCode}
                    onChange={(event) => setForm({ ...form, courseCode: event.target.value })}
                    placeholder="Course Code"
                  />
                  <input
                    className="input"
                    value={form.courseTitle}
                    onChange={(event) => setForm({ ...form, courseTitle: event.target.value })}
                    placeholder="Course Title"
                  />
                  <input
                    className="input"
                    value={form.room}
                    onChange={(event) => setForm({ ...form, room: event.target.value })}
                    placeholder="Room"
                  />
                  <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <input
                      className="input"
                      value={form.startTime}
                      onChange={(event) => setForm({ ...form, startTime: event.target.value })}
                      placeholder="Start Time"
                    />
                    <input
                      className="input"
                      value={form.endTime}
                      onChange={(event) => setForm({ ...form, endTime: event.target.value })}
                      placeholder="End Time"
                    />
                  </div>
                  <input
                    className="input"
                    type="number"
                    value={form.expectedCount}
                    onChange={(event) => setForm({ ...form, expectedCount: Number(event.target.value) })}
                    placeholder="Expected Students"
                  />
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
                    <input
                      type="checkbox"
                      checked={form.faceRequired}
                      onChange={(event) => setForm({ ...form, faceRequired: event.target.checked })}
                    />
                    Require face verification
                  </label>
                  <motion.button 
                    className="button primary" 
                    onClick={handleStartSession}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Session
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div 
                className="stat-card" 
                variants={fadeInUp}
                custom={3}
              >
                <h4 style={{ marginBottom: 16 }}>📊 Session Summary</h4>
                {summary ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="stat-value" style={{ color: 'var(--tasued-success)' }}>
                        {summary.total}
                      </div>
                      <div className="stat-label">Checked In</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="stat-value" style={{ color: 'var(--tasued-warning)' }}>
                        {summary.expected - summary.total}
                      </div>
                      <div className="stat-label">Absent</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="stat-value" style={{ color: 'var(--teal)' }}>
                        {summary.fallback}
                      </div>
                      <div className="stat-label">Kiosk</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="stat-value" style={{ fontSize: 32 }}>
                        {summary.expected}
                      </div>
                      <div className="stat-label">Expected</div>
                    </motion.div>
                    <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                        <span style={{ color: 'var(--ink-muted)' }}>Progress</span>
                        <span style={{ fontWeight: 600 }}>{Math.round(progress)}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No summary available.</p>
                )}
              </motion.div>

              {/* Attendance Mix */}
              <motion.div 
                className="card" 
                variants={fadeInUp}
                custom={4}
              >
                <h4>📈 Check-in Methods</h4>
                <div style={{ marginTop: 16 }}>
                  <div className="chart-row">
                    <span>📱 QR Code</span>
                    <div className="bar">
                      <motion.div
                        className="bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${methodStats.total ? (methodStats.qr / methodStats.total) * 100 : 0}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </div>
                    <span>{methodStats.qr}</span>
                  </div>
                  <div className="chart-row">
                    <span>🏪 Kiosk</span>
                    <div className="bar">
                      <motion.div
                        className="bar-fill secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${methodStats.total ? (methodStats.kiosk / methodStats.total) * 100 : 0}%` }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>
                    <span>{methodStats.kiosk}</span>
                  </div>
                </div>
              </motion.div>

              {/* Check-ins Over Time */}
              <motion.div 
                className="card" 
                variants={fadeInUp}
                custom={5}
              >
                <h4>⏱️ Check-ins Over Time</h4>
                {series.length ? (
                  <div className="chart">
                    <svg viewBox="0 0 600 160" className="chart-svg">
                      {(() => {
                        const max = Math.max(...series.map((p) => p.count), 1);
                        const padding = 24;
                        const width = 600 - padding * 2;
                        const height = 160 - padding * 2;
                        const step = series.length > 1 ? width / (series.length - 1) : 0;
                        const points = series.map((point, index) => {
                          const x = padding + index * step;
                          const y = padding + height - (point.count / max) * height;
                          return `${x},${y}`;
                        });
                        return (
                          <>
                            <motion.polyline
                              fill="none"
                              stroke="var(--teal)"
                              strokeWidth="3"
                              points={points.join(' ')}
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, ease: 'easeInOut' }}
                            />
                            {points.map((point, index) => {
                              const [x, y] = point.split(',');
                              return (
                                <motion.circle 
                                  key={series[index].time} 
                                  cx={x} 
                                  cy={y} 
                                  r="5" 
                                  fill="var(--gold)"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1 + index * 0.1 }}
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                    <div className="chart-labels">
                      <span>{new Date(series[0].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>{new Date(series[series.length - 1].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--ink-muted)' }}>No check-in data yet.</p>
                )}
              </motion.div>
            </div>

            {/* Attendance Table */}
            <motion.div 
              className="card" 
              style={{ marginTop: 20, gridColumn: '1 / -1' }}
              variants={fadeInUp}
              custom={6}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4>📋 Attendance Records</h4>
                <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                  {attendance.length} records
                </span>
              </div>
              <div className="form-grid" style={{ marginBottom: 16 }}>
                <select
                  className="input"
                  value={selectedSessionId}
                  onChange={(event) => setSelectedSessionId(event.target.value)}
                >
                  <option value="">Select session</option>
                  {sessionOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.courseCode} · {item.startTime}
                    </option>
                  ))}
                </select>
                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <input
                    className="input"
                    value={filters.studentId}
                    onChange={(event) => setFilters({ ...filters, studentId: event.target.value })}
                    placeholder="Student ID"
                  />
                  <input
                    className="input"
                    value={filters.courseCode}
                    onChange={(event) => setFilters({ ...filters, courseCode: event.target.value })}
                    placeholder="Course Code"
                  />
                </div>
                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <select
                    className="input"
                    value={filters.method}
                    onChange={(event) => setFilters({ ...filters, method: event.target.value })}
                  >
                    <option value="">All Methods</option>
                    <option value="qr">QR</option>
                    <option value="kiosk">Kiosk</option>
                  </select>
                  <select
                    className="input"
                    value={filters.status}
                    onChange={(event) => setFilters({ ...filters, status: event.target.value })}
                  >
                    <option value="">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button className="button secondary" onClick={loadAttendance}>
                    Apply
                  </button>
                </div>
              </div>
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Status</th>
                      <th>Method</th>
                      <th>Time</th>
                      <th>Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {attendance.map((row, index) => (
                        <motion.tr 
                          key={row.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.02 }}
                        >
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div className="attendance-avatar">
                                {row.studentId.slice(0, 2).toUpperCase()}
                              </div>
                              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                {row.studentId}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${row.status === 'Present' ? 'success' : row.status === 'Absent' ? 'error' : 'warning'}`}>
                              {row.status}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${row.method === 'qr' ? 'info' : 'warning'}`}>
                              {row.method.toUpperCase()}
                            </span>
                          </td>
                          <td>{new Date(row.createdAt).toLocaleTimeString()}</td>
                          <td>{row.session?.courseCode || '-'}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {error ? (
              <motion.p 
                style={{ color: 'var(--coral)', marginTop: 16 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            ) : null}
          </motion.div>
        )}
      </div>
    </div>
  );
}
