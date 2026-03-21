'use client';

import { useEffect, useState } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

interface DeviceRequest {
  id: string;
  imei: string;
  email: string;
  deviceType: string;
  requestDate: string;
}

const SkeletonItem = () => (
  <div className="animate-pulse bg-black/30 backdrop-blur-md p-4 rounded-lg shadow-lg">
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-1" />
    <div className="h-3 bg-gray-700 rounded w-1/3" />
  </div>
);

const DeviceRequests: React.FC = () => {
  const [requests, setRequests] = useState<DeviceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(
          collection(db, 'trialRequests'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const requestsData: DeviceRequest[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          imei: doc.data().imei || 'N/A',
          email: doc.data().email || 'N/A',
          deviceType: doc.data().deviceType || 'Unknown',
          requestDate: doc.data().timestamp?.toDate().toLocaleDateString() || 'N/A',
        }));
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching device requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'trialRequests', id));
      setRequests((prev) => prev.filter((request) => request.id !== id));
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  return (
    <section className="py-12 px-4 border-t border-dashed border-red-500 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl mt-16 font-bold text-red-500 mb-6 text-center">Device Registration Requests</h2>

        <div className="space-y-4">
          {loading
            ? Array.from({ length: 7 }).map((_, index) => <SkeletonItem key={index} />)
            : requests.map((request) => (
                <div
                  key={request.id}
                  className="relative flex items-start justify-between p-4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg hover:bg-red-900/30 transition-all duration-300"
                >
                  <div>
                    <p className="text-white font-medium">IMEI: {request.imei}</p>
                    <p className="text-gray-400 text-sm">Email: {request.email}</p>
                    <p className="text-gray-400 text-sm">Device: {request.deviceType}</p>
                    <p className="text-gray-400 text-sm">Request Date: {request.requestDate}</p>
                  </div>

                  <div className="relative group">
                    <MoreVertical className="text-gray-400 cursor-pointer" />
                    <div className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-black/90 backdrop-blur-md rounded shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceRequests;