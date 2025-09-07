'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { db } from '@/server/firebaseApi';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  timestamp?: any;
}

export default function Comments({ contentId }: { contentId: string }) {
  const isColor = useAppSelector((state) => state.color.value);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  // 🔹 Fetch comments in real-time
  useEffect(() => {
    if (!contentId) return;

    const q = query(
      collection(db, 'Windows-tools', contentId, 'comments'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, 'id'>), // ✅ Fix: exclude duplicate id
      }));
      setComments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [contentId]);

  // 🔹 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment) return;

    try {
      await addDoc(collection(db, 'Windows-tools', contentId, 'comments'), {
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        timestamp: serverTimestamp(),
      });

      setFormData({ name: '', email: '', comment: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">User Comments</h2>

      {/* Comment List */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg border border-gray-300 dark:border-gray-700"
              style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
            >
              <p className="text-sm font-semibold">{comment.name}</p>
              <p className="text-xs">{comment.email}</p>
              <p className="text-sm mt-1">{comment.comment}</p>
              <p className="text-xs mt-1">
                {comment.timestamp?.toDate
                  ? comment.timestamp.toDate().toLocaleString()
                  : 'Just now'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm">No comments yet.</p>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mt-6 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
        />
        <textarea
          name="comment"
          placeholder="Write a comment..."
          value={formData.comment}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}