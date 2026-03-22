// app/server/firebaseApi.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const logoutUser = async () => {
  try {
    // 1. Terminate Firebase Client Session
    await signOut(auth);

    // 2. Terminate Middleware Access Cookies
    const isProduction = process.env.NODE_ENV === 'production';
    const rootDomain = isProduction ? '.kalifaos.site' : 'localhost';

    // To delete a cookie, we set its 'expires' date to the past (1970).
    // The path and domain MUST match exactly how it was set during login.
    document.cookie = `admin-token=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax`;
    
    // (Optional) Clear __session if you ever use Firebase Hosting session cookies
    document.cookie = `__session=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax`;

    console.log("System Status: Session and tokens successfully terminated.");

    // 3. Force Redirect to App Login
    // This ensures they are kicked out of the admin interface immediately
    if (typeof window !== 'undefined') {
      window.location.href = isProduction ? "https://app.kalifaos.site/login" : "/login";
    }

  } catch (error) {
    console.error("System Status: Logout Error", error);
    throw error;
  }
};
