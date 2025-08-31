// app/components/windows/Comments.tsx
"use client";

import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
}

export default function Comments() {
  const isColor = useAppSelector((state) => state.color.value);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      name: "Musa Hakilu",
      email: "musahakilu@example.com",
      comment: "This tool is amazing! Helped me fix my issue.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@example.com",
      comment: "Nice work, keep updating!",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">User Comments</h2>



      {/* Comment List */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg border border-gray-300 dark:border-gray-700"
              style={{ backgroundColor: isColor ? "#d7d7d719" : "#72727236" }}
            >
              <p className="text-sm font-semibold ">
                {comment.name}
              </p>
              <p className="text-xs 0">{comment.email}</p>
              <p className="text-sm  mt-1">{comment.comment}</p>
              <p className="text-xs 0 mt-1">
                {new Date(comment.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm ">No comments yet.</p>
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