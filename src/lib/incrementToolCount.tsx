// lib/incrementToolCount.ts
import { db } from "@/server/firebaseApi";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

export const incrementToolCount = async (title: string) => {
  try {
    const ref = doc(db, "toolClicks", title);
    const snap = await getDoc(ref);
    const all = doc(db, "toolClicks", "allDownload");
    const snapshotAll = await getDoc(all);
    
    
    if (snapshotAll.exists()) {
      await updateDoc(all, {
        count: increment(1),
      });
    } else {
      await setDoc(all, {
        allD: "all",
        count: 1,
      });
    }

    if (snap.exists()) {
      await updateDoc(ref, { count: increment(1) });
    } else {
      await setDoc(ref, { count: 1, title });
    }
  } catch (error) {
    console.error("Failed to increment tool count:", error);
  }
};