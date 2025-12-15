"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageSquare, User, Send } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function PostDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [data, setData] = useState(null); // { post, comments }
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const fetchPost = () => {
    api
      .get(`/forum/posts/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await api.post(`/forum/posts/${id}/comments`, { content: commentText });
      setCommentText("");
      fetchPost(); // Refresh comments
    } catch (err) {
      alert("Failed to comment");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Post not found</div>;

  const { post, comments } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Post Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 border-b pb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {post.author?.name?.[0]}
            </div>
            <span className="font-semibold text-gray-900">
              {post.author?.name}
            </span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="ml-auto bg-gray-100 px-2 py-1 rounded text-xs uppercase">
              {post.type}
            </span>
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare size={20} /> Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={submitComment} className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full border rounded-lg p-3 min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm hover:bg-blue-700"
                >
                  <Send size={16} /> Post Comment
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-lg mb-8">
              Please login to comment
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {comment.author?.name?.[0]}
                </div>
                <div>
                  <div className="bg-gray-50 p-4 rounded-xl rounded-tl-none">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {comment.author?.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                  {/* Reply button could go here */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
