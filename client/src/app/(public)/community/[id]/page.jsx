"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  User,
  Clock,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function PostDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/community/${id}`);
      setPost(res.data);
    } catch (err) {
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (type) => {
    // 'up' or 'down'
    if (!user) return toast.error("Login to vote");
    try {
      const res = await api.post(`/community/${id}/vote`, { voteType: type });
      setPost(res.data);
      fetchPost();
    } catch (err) {
      toast.error("Vote failed");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    try {
      const res = await api.post(`/community/${id}/comments`, {
        content: commentContent,
      });
      setPost(res.data);
      setCommentContent("");
      toast.success("Comment added");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">Loading...</div>
    );
  if (!post)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Post not found
      </div>
    );

  const isUpvoted = post.upvotes?.includes(user?.id);
  const isDownvoted = post.downvotes?.includes(user?.id);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Post Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author?.avatar} />
                <AvatarFallback>{post.author?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">
                    {post.author?.name}
                  </span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <span>•</span>
                  <Badge
                    variant="secondary"
                    className="uppercase text-xs font-bold"
                  >
                    {post.type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Author Actions */}
            {user && post.author && user.id === post.author._id && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/community/create?edit=${post._id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this post?")) {
                      try {
                        await api.delete(`/community/${post._id}`);
                        toast.success("Post deleted");
                        router.push("/forum");
                      } catch (err) {
                        toast.error("Failed to delete");
                      }
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {post.image && (
            <div className="mb-8 rounded-xl overflow-hidden max-h-96">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground mb-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-bold mt-8 mb-4 border-b pb-2"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside my-4 space-y-1"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside my-4 space-y-1"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary pl-4 italic my-4 bg-muted/30 p-2 rounded-r"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-primary hover:underline font-medium"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6 rounded-lg border">
                    <table className="w-full text-sm text-left" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead
                    className="text-xs text-muted-foreground uppercase bg-muted/50"
                    {...props}
                  />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className="divide-y divide-border" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr
                    className="bg-background hover:bg-muted/50 transition-colors"
                    {...props}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-6 py-3 font-medium text-foreground whitespace-nowrap"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-6 py-4" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="my-6" />

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-muted/40 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("up")}
                className={
                  isUpvoted
                    ? "text-primary bg-background shadow-sm"
                    : "text-muted-foreground"
                }
              >
                <ThumbsUp size={20} />
              </Button>
              <span className="font-bold text-foreground min-w-[20px] text-center">
                {(post.upvotes?.length || 0) - (post.downvotes?.length || 0)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("down")}
                className={
                  isDownvoted
                    ? "text-destructive bg-background shadow-sm"
                    : "text-muted-foreground"
                }
              >
                <ThumbsDown size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare size={20} />
              <span>{post.comments?.length} Comments</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add Comment */}
          <form onSubmit={handleComment} className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                className="min-h-[100px]"
                placeholder="Write a thoughtful comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <div className="flex justify-end">
                <Button type="submit">Post Comment</Button>
              </div>
            </div>
          </form>

          <Separator />

          {/* List */}
          <div className="space-y-6">
            {post.comments?.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.user?.avatar} />
                  <AvatarFallback>
                    {comment.user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">
                      {comment.user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
            {post.comments?.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
