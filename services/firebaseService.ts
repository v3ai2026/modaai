
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

/**
 * moda AI Studio - Firebase 核心集成
 * 项目 ID: gen-lang-client-0654563230
 */
export const firebaseConfig = {
  apiKey: "AIzaSyAKWNQ6qq-3FdCZT-gm-lVqWw_VmLo3UZY",
  authDomain: "gen-lang-client-0654563230.firebaseapp.com",
  projectId: "gen-lang-client-0654563230",
  storageBucket: "gen-lang-client-0654563230.firebasestorage.app",
  messagingSenderId: "681432862802",
  appId: "1:681432862802:web:d7d92025fb00c91a394f8b",
  measurementId: "G-Z2SH7YTSJ2"
};

// Web 推送证书 (VAPID Key)
export const VAPID_KEY = "BO1MAeKl2NDHzGrW1iF9R6-53iPbJltBfp0W_sPRVDEqTfPFX52UhyufuBAc4DhNsTYs0BiEGaQasHumJtHGmOw";

// 初始化实例
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// 异步初始化 Analytics
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

// 云消息推送 (FCM) 初始化与监听
export const requestNotificationPermission = async () => {
  try {
    if (!('Notification' in window)) return null;
    
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log('FCM Token generated:', token);
      
      // 前台消息监听
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // 这里可以触发 UI 上的通知弹窗
      });
      
      return token;
    }
  } catch (error) {
    console.error('Push Notification Subscription Error:', error);
  }
  return null;
};
