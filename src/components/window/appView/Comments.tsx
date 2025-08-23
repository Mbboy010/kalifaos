// app/components/windows/Comments.tsx
'use client';

import { useAppSelector } from '../../redux/hooks';

interface Comment {
  id: string;
  userName: string;
  comment: string;
  timestamp: string;
}

export default function Comments({ comments, toolId }: { comments: Comment[]; toolId: string }) {
  const isColor = useAppSelector((state) => state.color.value);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-blue-500 mb-4">User Comments</h2>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg border border-gray-300 dark:border-gray-700"
              style={{ backgroundColor: isColor ? '#d7d7d719' : '#72727236' }}
            >
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {comment.userName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{comment.comment}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(comment.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">No comments yet.</p>
      )}
    </div>
  );
}