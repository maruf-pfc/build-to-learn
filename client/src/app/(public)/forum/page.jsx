"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Plus, ThumbsUp, MessageSquare, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuthStore } from "@/store/useAuthStore";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/community?type=forum");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="text-primary" /> Discussion Forum
          </h1>
          <p className="text-muted-foreground mt-1">
            Ask questions, share knowledge, and help others.
          </p>
        </div>
        {user && (
          <Link href="/community/create?type=forum">
            <Button className="font-bold flex items-center gap-2">
              <Plus size={20} /> New Discussion
            </Button>
          </Link>
        )}
      </header>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 h-32 flex items-center justify-center text-muted-foreground">
                Loading...
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              href={`/community/${post._id}`}
              key={post._id}
              className="block group"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-6">
                  <div className="flex flex-col items-center gap-1 min-w-[50px] text-muted-foreground">
                    <ThumbsUp
                      size={20}
                      className={post.upvotes?.length > 0 ? "text-primary" : ""}
                    />
                    <span className="font-bold">
                      {(post.upvotes?.length || 0) -
                        (post.downvotes?.length || 0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={post.author?.avatar} />
                          <AvatarFallback>
                            {post.author?.name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">
                          {post.author?.name}
                        </span>
                      </div>
                      <span>
                        posted{" "}
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      <div className="flex gap-2">
                        {post.tags?.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-xs px-2 py-0"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare size={18} />
                    <span>{post.comments?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No discussions yet. Start one!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
