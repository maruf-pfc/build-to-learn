"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import { Image as ImageIcon, Code, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

function CreatePostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const defaultType = searchParams.get("type") || "forum";

  const [postData, setPostData] = useState({
    title: "",
    type: defaultType,
    content: "",
    tags: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/community/${editId}`);
          const p = res.data;
          setPostData({
            title: p.title,
            type: p.type,
            content: p.content,
            tags: p.tags?.join(", ") || "",
            image: p.image || "",
          });
        } catch (err) {
          toast.error("Failed to load post for editing");
          router.push("/forum");
        }
      };
      fetchPost();
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...postData,
        tags: postData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (editId) {
        await api.put(`/community/${editId}`, payload);
        toast.success("Post updated!");
      } else {
        await api.post("/community", payload);
        toast.success("Post created!");
      }
      if (editId) router.push(`/community/${editId}`);
      else router.push(postData.type === "blog" ? "/blog" : "/forum");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          `Failed to ${editId ? "update" : "create"} post`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const toastId = toast.loading("Uploading image...");
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPostData({ ...postData, image: res.data.secure_url || res.data.url });
      toast.success("Image uploaded", { id: toastId });
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={postData.type === "forum" ? "default" : "outline"}
              onClick={() => setPostData({ ...postData, type: "forum" })}
              className="flex-1"
            >
              Forum
            </Button>
            <Button
              type="button"
              variant={postData.type === "blog" ? "default" : "outline"}
              onClick={() => setPostData({ ...postData, type: "blog" })}
              className="flex-1"
            >
              Blog
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              className="text-lg font-semibold"
              placeholder="Enter a descriptive title..."
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Content (Markdown Supported)</Label>
            <MarkdownEditor
              value={postData.content}
              onChange={(val) => setPostData({ ...postData, content: val })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="javascript, react, help..."
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="Image URL (or upload)"
                  value={postData.image}
                  onChange={(e) =>
                    setPostData({ ...postData, image: e.target.value })
                  }
                />
                <Label className="cursor-pointer">
                  <div className="flex items-center justify-center p-2 border rounded-md hover:bg-muted/50 h-10 w-10">
                    <ImageIcon size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Publishing...
                </>
              ) : editId ? (
                "Update Post"
              ) : (
                "Publish Post"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function CreatePostPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Create Post</h1>
      </div>
      <Suspense
        fallback={<div className="p-8 text-center">Loading editor...</div>}
      >
        <CreatePostContent />
      </Suspense>
    </div>
  );
}
