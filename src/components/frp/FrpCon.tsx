"use client";

import { Download, ShieldAlert, Smartphone } from "lucide-react";
import { useAppSelector } from "../redux/hooks";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/server/firebaseApi";
import { incrementToolCount } from "@/lib/incrementToolCount";

interface ToolData {
  id: string;
  title: string;
  version: string;
  link: string;
}

export default function FrpCon() {
  const isColor = useAppSelector((state) => state.color.value);
  const [data, setData] = useState<ToolData[]>([]);
  const [istrue, setIstrue] = useState<boolean>(false);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "download"));
        const sortedData: ToolData[] = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as ToolData))
          .sort((a, b) => a.title.localeCompare(b.title));

        setData(sortedData);
        setIstrue(sortedData.length > 0);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    }

    fetchData();
  }, []);

  const handleDownload = async (title: string, url: string) => {
    try {
      setLoading((prev) => ({ ...prev, [title]: true }));
      await incrementToolCount(title);

      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch file.");

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${title}.apk`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      try {
        window.open(url, "_blank");
      } catch (fallbackError) {
        console.error("Fallback download also failed:", fallbackError);
      }
    } finally {
      setLoading((prev) => ({ ...prev, [title]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 py-8">
      {/* Header */}
      <div className="text-center mt-10 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Smartphone className="w-6 h-6 text-blue-600" />
          FRP Bypass Tools
        </h1>
        <p className="text-base max-w-xl mx-auto ">
          Download specialized tools to bypass Factory Reset Protection (FRP) on
          Android devices. Use with caution and only on devices you legally own.
        </p>
      </div>

      {/* Warning */}
      <div
        style={{ backgroundColor: isColor ? "#4f16164c" : "#f0cece4c" }}
        className="rounded-lg border-l-4 border-red-500 p-3 mb-6"
      >
        <div className="flex items-start">
          <ShieldAlert className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-500 text-sm">
              Important Legal Notice
            </h3>
            <ul className="list-disc pl-5 mt-1 text-red-500 text-xs space-y-0.5">
              <li>FRP bypass may violate terms of service</li>
              <li>Only use on devices you legally own</li>
              <li>Some tools may trigger security warnings</li>
              <li>We are not responsible for bricked devices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tools List */}
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col gap-2">
          {istrue ? (
            data.map((element: ToolData, index: number) => (
              <button
                className="px-1 py-1 block text-left w-full"
                key={index}
                onClick={() => handleDownload(element.title, element.link)}
                disabled={loading[element.title]}
              >
                <div
                  
                  className="flex items-center p-2 "
                >
                  <div className="p-1 mr-2">
                    {loading[element.title] ? (
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      <Download className="w-8 h-8 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-green-500">
                      {element.title}
                    </h2>
                    <p className="text-xs ">
                      version: {element.version}
                    </p>
                    {loading[element.title] && (
                      <p className="text-xs ">Downloading...</p>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            // Skeleton Loader
            <div className="w-full flex flex-col gap-2">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
                  className="flex items-center p-2 shadow rounded-md border border-gray-300 dark:border-gray-700"
                >
                  <div className="p-2 mr-3">
                    <div className="w-8 h-8 bg-gray-300 animate-pulse rounded" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="h-3 w-[50%] bg-gray-300 animate-pulse rounded" />
                    <div className="h-2 w-[70%] bg-gray-300 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
        className="mt-8 p-3 rounded-md text-center text-xs border border-gray-300 dark:border-gray-700"
      >
        <p>
          These tools are provided for educational purposes only. Use at your
          own risk. We do not condone illegal use of FRP bypass tools.
        </p>
      </div>
    </div>
  );
}