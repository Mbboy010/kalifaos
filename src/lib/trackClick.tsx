// lib/trackClick.ts
import { db } from "@/server/firebaseApi";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

export const trackClick = async (path: string) => {
  try {
    const normalizedPath = path.replace(/\//g, "_");
    const ref = doc(db, "clicks", normalizedPath);
    const all = doc(db, "clicks", "allCheck");
    const snapshot = await getDoc(ref);
    const snapshotAll = await getDoc(all);
    
    
    if (snapshotAll.exists()) {
      await updateDoc(all, {
        count: increment(1),
      });
    } else {
      await setDoc(all, {
        allC: "all",
        count: 1,
      });
    }
    

    if (snapshot.exists()) {
      await updateDoc(ref, {
        count: increment(1),
      });
    } else {
      await setDoc(ref, {
        path,
        count: 1,
      });
    }
  } catch (err) {
    console.error("Click tracking failed:", err);
  }
};