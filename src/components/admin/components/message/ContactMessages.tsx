'use client';

import { useEffect, useState } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/server/firebaseApi';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  requestDate: string;
}

const SkeletonItem = () => (
  <div className="animate-pulse bg-black/30 backdrop-blur-md p-4 rounded-lg shadow-lg">
    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-1" />
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-1" />
    <div className="h-3 bg-gray-700 rounded w-2/3 mb-2" />
    <div className="h-3 bg-gray-700 rounded w-full" />
  </div>
);

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, 'contactMessages'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const data: ContactMessage[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Anonymous',
          email: doc.data().email || 'N/A',
          phone: doc.data().phone || 'N/A',
          subject: doc.data().subject || 'No Subject',
          message: doc.data().message || 'No Message',
          requestDate: doc.data().timestamp?.toDate().toLocaleDateString() || 'N/A',
        }));
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contact requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  return (
    <section className="py-12 px-4 border-t border-dashed border-red-500 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl mt-16 font-bold text-red-500 mb-6 text-center">User Contact Requests</h2>

        <div className="space-y-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
            : messages.map((message) => (
                <div
                  key={message.id}
                  className="relative flex flex-col p-4 bg-black/40 backdrop-blur-md rounded-lg shadow-lg hover:bg-red-900/30 transition-all duration-300"
                >
                  <div className="absolute top-3 right-3 group">
                    <MoreVertical className="text-gray-400 cursor-pointer" />
                    <div className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-black/90 backdrop-blur-md rounded shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </div>
                  </div>

                  <h3 className="text-white font-medium">{message.name}</h3>
                  <p className="text-gray-400 text-sm">Email: {message.email}</p>
                  <p className="text-gray-400 text-sm">Phone: {message.phone}</p>
                  <p className="text-gray-400 text-sm">Subject: {message.subject}</p>
                  <p className="text-gray-400 text-sm">Request Date: {message.requestDate}</p>
                  <p className="text-gray-300 text-sm mt-2">{message.message}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMessages;