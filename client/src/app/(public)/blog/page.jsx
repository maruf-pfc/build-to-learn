"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Plus, ThumbsUp, MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuthStore } from "@/store/useAuthStore";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/community?type=blog&sort=top");
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
            <BookOpen className="text-purple-600" /> Community Blog
          </h1>
          <p className="text-muted-foreground mt-1">
            Stories, tutorials, and updates from the community.
          </p>
        </div>
        {user && (
          <Link href="/community/create?type=blog">
            <Button className="font-bold flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus size={20} /> Write Article
            </Button>
          </Link>
        )}
      </header>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="h-48 flex items-center justify-center">
                Loading...
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/community/${post._id}`}
              key={post._id}
              className="block group h-full"
            >
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-48 bg-muted relative overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <BookOpen size={48} />
                    </div>
                  )}
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-2">
                    {post.tags?.[0] || "Article"}
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {post.content.substring(0, 150)}...
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.author?.avatar} />
                        <AvatarFallback>
                          {post.author?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px] font-medium">
                        {post.author?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={14} /> {post.upvotes?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} /> {post.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No blog posts yet. Be the first to write one!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
