import React, { useState } from 'react';
import { API_URL } from '../services/api';

export function ApiDebug() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      console.log('Testing API with URL:', API_URL);
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      setTestResult(`✅ Success: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      console.log('Testing login with URL:', API_URL);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'lecturer',
          identifier: 'TASUED-LEC-001',
          password: 'admin123'
        })
      });
      const data = await response.json();
      setTestResult(`✅ Login Success: User ${data.user?.name || 'Unknown'}`);
    } catch (error) {
      setTestResult(`❌ Login Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '20px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      zIndex: 9999,
      maxWidth: '400px',
      fontSize: '12px'
    }}>
      <h3>API Debug Panel</h3>
      <p><strong>API URL:</strong> {API_URL}</p>
      <p><strong>Hostname:</strong> {window.location.hostname}</p>
      <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={testApi} disabled={loading} style={{ marginRight: '10px' }}>
          Test Health
        </button>
        <button onClick={testLogin} disabled={loading}>
          Test Login
        </button>
      </div>
      
      {testResult && (
        <pre style={{ 
          marginTop: '10px', 
          padding: '10px', 
          background: '#f5f5f5', 
          borderRadius: '4px',
          fontSize: '11px',
          whiteSpace: 'pre-wrap'
        }}>
          {testResult}
        </pre>
      )}
    </div>
  );
}