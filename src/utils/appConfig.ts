// App configuration and constants
export const APP_CONFIG = {
  // APK Download Configuration
  APK: {
    DOWNLOAD_URL: 'https://expo.dev/artifacts/eas/3j9p3ixpfTYcbSn4qDBrZ3.apk',
    VERSION: '1.0.0',
    BUILD_ID: '12bad714-c456-4115-9ea4-9338bf9a3478',
    FILE_SIZE: '~20MB',
    MIN_ANDROID_VERSION: '7.0+',
    LAST_UPDATED: '2026-03-26'
  },
  
  // App Information
  APP: {
    NAME: 'AttendX',
    FULL_NAME: 'AttendX - TASUED Smart Attendance',
    ORGANIZATION: 'Tai Solarin University of Education',
    CONTACT_EMAIL: 'attendx@tasued.edu.ng'
  },
  
  // Feature Flags
  FEATURES: {
    IOS_AVAILABLE: false, // Set to true when Apple Developer account is ready
    IOS_COMING_SOON: true,
    KIOSK_MODE: true,
    FACE_VERIFICATION: true,
    QR_ROTATION: true
  },

  // iOS Configuration (for when ready)
  IOS: {
    REQUIRES_DEVELOPER_ACCOUNT: true,
    ESTIMATED_COST: '$99/year',
    TESTFLIGHT_AVAILABLE: false,
    APP_STORE_READY: false
  }
};

// Helper function to get download filename based on app type
export const getDownloadFilename = (appType: 'student' | 'lecturer' | 'kiosk' = 'student'): string => {
  const typeMap = {
    student: 'AttendX-Student.apk',
    lecturer: 'AttendX-Lecturer.apk',
    kiosk: 'AttendX-Kiosk.apk'
  };
  
  return typeMap[appType];
};

// Helper function to check if APK URL is valid
export const isValidAPKUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && url.endsWith('.apk');
  } catch {
    return false;
  }
};

// Helper function to get app info for display
export const getAppInfo = () => ({
  version: APP_CONFIG.APK.VERSION,
  size: APP_CONFIG.APK.FILE_SIZE,
  minAndroid: APP_CONFIG.APK.MIN_ANDROID_VERSION,
  lastUpdated: new Date(APP_CONFIG.APK.LAST_UPDATED).toLocaleDateString()
});