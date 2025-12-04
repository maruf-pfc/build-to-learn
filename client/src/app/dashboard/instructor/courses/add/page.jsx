"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, XCircle } from "lucide-react";

export default function AddCoursePage() {
  const { register, handleSubmit, setValue } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // ---------------- Thumbnail Upload ----------------
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data?.data?.url;
      setThumbnail(url);
      setValue("thumbnail", url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // ---------------- Create Course ----------------
  const onSubmit = async (data) => {
    try {
      const payload = { ...data, price: parseInt(data.price, 10) };
      const res = await api.post("/courses/create", payload);
      toast.success("Course created successfully!");
      router.push(`/dashboard/instructor/courses/${res.data.data._id}/units`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
    }
  };

  // ---------------- Bangladesh LMS Categories ----------------
  const categories = [
    "Web Development",
    "App Development",
    "Programming for Beginners",
    "Digital Marketing",
    "Graphic Design",
    "UI/UX Design",
    "IELTS Preparation",
    "Spoken English",
    "Freelancing & Outsourcing",
    "Cyber Security",
    "Cloud Computing & DevOps",
    "Data Science & ML",
    "Accounting & Microsoft Office",
  ];

  return (
    <div className="flex items-center justify-center p-6 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-xl border border-gray-200 shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create a New Course
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* ---------------- Thumbnail Upload ---------------- */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Course Thumbnail
            </label>

            {thumbnail ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                <Image
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setThumbnail(null)}
                  className="absolute top-3 right-3 bg-white/90 shadow p-1.5 rounded-full text-red-600 hover:bg-white transition"
                >
                  <XCircle size={20} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="thumbnailInput"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-indigo-400 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
              >
                <Upload className="text-indigo-600 mb-2" size={30} />
                <span className="text-sm text-gray-600">
                  {isUploading ? "Uploading..." : "Click to upload image"}
                </span>
                <input
                  id="thumbnailInput"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* ---------------- Course Info Inputs ---------------- */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-sm font-medium">Course Title</label>
              <input
                {...register("title", { required: true })}
                placeholder="e.g. Complete Web Development Bootcamp"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                {...register("category")}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="text-sm font-medium">Level</label>
              <select
                {...register("level")}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium">Price (BDT)</label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="e.g. 1500"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                {...register("status")}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* ---------------- Description ---------------- */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Short Description</label>
            <textarea
              {...register("description")}
              placeholder="Briefly describe what students will learn in this course"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm min-h-[120px] focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* ---------------- Submit Button ---------------- */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
            >
              Create Course
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
