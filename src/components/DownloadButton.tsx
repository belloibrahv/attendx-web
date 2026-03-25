import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  url: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function DownloadButton({ 
  url, 
  filename = 'AttendX.apk', 
  children, 
  className = '', 
  variant = 'primary' 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadStatus('downloading');

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Simulate download progress (since we can't track actual progress for external URLs)
      setTimeout(() => {
        setDownloadStatus('success');
        setTimeout(() => {
          setDownloadStatus('idle');
        }, 2000);
      }, 1000);

    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const getButtonContent = () => {
    switch (downloadStatus) {
      case 'downloading':
        return (
          <>
            <Loader2 size={16} className="animate-spin" style={{ marginRight: '0.5rem' }} />
            Downloading...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle size={16} style={{ marginRight: '0.5rem' }} />
            Downloaded!
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle size={16} style={{ marginRight: '0.5rem' }} />
            Download Failed
          </>
        );
      default:
        return children;
    }
  };

  const getButtonClass = () => {
    const baseClass = `button ${variant}`;
    const statusClass = downloadStatus === 'error' ? ' error' : 
                       downloadStatus === 'success' ? ' success' : '';
    return `${baseClass}${statusClass} ${className}`.trim();
  };

  return (
    <motion.button
      className={getButtonClass()}
      onClick={handleDownload}
      disabled={isDownloading}
      whileHover={{ scale: isDownloading ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {getButtonContent()}
    </motion.button>
  );
}