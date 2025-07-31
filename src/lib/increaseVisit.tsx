// lib/increaseVisit.ts
import { db } from "@/server/firebaseApi";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const normalizePath = (path: string) => {
  return path === "/" ? "home" : path.replace(/\//g, "_");
};

export const increaseVisit = async (path: string, prevPath: any) => {
  const normalizedPath = normalizePath(path);

  try {
    if (path !== prevPath) {
      const allRef = doc(db, "pageViews", "allView");
      const allSnap = await getDoc(allRef);

      if (allSnap.exists()) {
        await updateDoc(allRef, { count: increment(1) });
      } else {
        await setDoc(allRef, { count: 1 });
      }
    }

    const pageRef = doc(db, "pageViews", normalizedPath);
    const pageSnap = await getDoc(pageRef);

    if (pageSnap.exists()) {
      await updateDoc(pageRef, { count: increment(1) });
    } else {
      await setDoc(pageRef, { count: 1, path });
    }
  } catch (err) {
    console.error("Failed to increase visit:", err);
  }
};