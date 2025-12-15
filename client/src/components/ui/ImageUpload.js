"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
}) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(res.data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-foreground">
        {label}
      </Label>

      {value ? (
        <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden border border-input group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <Button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-6 w-6 p-0"
            variant="destructive"
            type="button"
          >
            <X size={12} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-input border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <Loader2
                  className="animate-spin text-muted-foreground"
                  size={32}
                />
              ) : (
                <Upload className="text-muted-foreground mb-2" size={32} />
              )}
              <p className="mb-2 text-sm text-foreground font-semibold">
                Click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={loading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
