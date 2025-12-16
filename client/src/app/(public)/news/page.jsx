"use client";

import { useEffect, useState } from "react";
import { Newspaper, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://dev.to/api/articles?tag=programming&top=7&per_page=12"
        );
        const data = await res.json();
        setArticles(data);
      } catch {
        toast.error("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
            <Newspaper className="text-primary h-8 w-8" />
            Tech News
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Curated programming and technology articles from the developer
            community via DEV.to.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Card className="h-full border-border/60 hover:shadow-md transition-shadow overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="h-40 bg-muted overflow-hidden">
                      {article.cover_image ? (
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          <Newspaper className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 flex flex-col h-full">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <img
                          src={article.user.profile_image}
                          alt={article.user.name}
                          className="h-6 w-6 rounded-full"
                        />
                        <span className="truncate max-w-[120px]">
                          {article.user.name}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-primary">
                        Read <ExternalLink size={12} />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= LOADING SKELETON ================= */

function SkeletonCard() {
  return (
    <Card className="border-border/60 overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-3 pt-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
