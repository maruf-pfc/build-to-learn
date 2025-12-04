"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Star,
  Calendar,
  BookOpen,
  Activity,
  Edit,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useInstructorCourses } from "@/hooks/useCourse";
import { StatBadge } from "@/components/modules/dashboard/instructorr/StatBadge";
import StatusPill from "@/components/modules/dashboard/instructorr/StatusPill";
import { useAuth } from "@/hooks/useAuth";

const PAGE_SIZE = 6;
const STATUS_OPTIONS = ["All", "Published", "Pending", "Draft"];

export default function InstructorCourses() {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const qc = useQueryClient();

  const {
    data: courses = [],
    isLoading,
    isFetching,
  } = useInstructorCourses({
    search: query,
    status: statusFilter,
    instructor: user?._id,
  });

  // FILTER ONLY THIS INSTRUCTOR’S COURSES
  const filteredCourses = useMemo(
    () => courses.filter((c) => c?.instructor?._id === user?._id),
    [courses, user]
  );

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, page]);

  function gotoPage(n) {
    setPage(Math.max(1, Math.min(totalPages, n)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="p-6 lg:p-10 min-h-screen text-gray-900">
      {/* ---------------- Header ---------------- */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Instructor</h3>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Your Courses
            </h1>
          </div>

          <Link
            href="/dashboard/instructor/courses/add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-sm font-semibold shadow-md transition"
          >
            + Add New Course
          </Link>
        </div>

        {/* ---------------- Stats ---------------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatBadge
            label="Active Courses"
            value="45"
            colorClass="bg-indigo-600"
          />
          <StatBadge label="Free Courses" value="16" colorClass="bg-sky-500" />
          <StatBadge
            label="Paid Courses"
            value="21"
            colorClass="bg-purple-600"
          />
        </div>

        {/* ---------------- Filters ---------------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                  qc.invalidateQueries(["instructorCourses"]);
                }}
                className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-indigo-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {/* <Filter
                size={16}
                className="absolute right-3 bottom-3 text-gray-400"
              /> */}
            </div>

            {/* Search Bar */}
            <div className="md:col-span-2 relative">
              <label className="text-sm font-medium text-gray-600">
                Search
              </label>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search courses..."
                className="mt-1 w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-indigo-500"
              />
              <Search
                size={18}
                className="absolute left-3 bottom-[14px] text-gray-400"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("All");
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* ---------------- Table ---------------- */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        {/* -------- Loading / Empty -------- */}
        {isLoading || isFetching ? (
          <div className="p-10 text-center text-gray-500">
            Loading courses...
          </div>
        ) : paginated.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No courses found.
          </div>
        ) : (
          <>
            {/* -------- DESKTOP TABLE -------- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                    <th className="py-3 px-4 text-left w-[38%]">Course</th>
                    <th className="py-3 px-4 text-center w-[10%]">Students</th>
                    <th className="py-3 px-4 text-center w-[10%]">Price</th>
                    <th className="py-3 px-4 text-center w-[10%]">Rating</th>
                    <th className="py-3 px-4 text-center w-[12%]">Status</th>
                    <th className="py-3 px-4 text-right w-[15%]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      {/* ----- Course Column ----- */}
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-14 relative rounded-lg overflow-hidden bg-gray-100 shadow-sm shrink-0">
                            {c.thumbnail ? (
                              <Image
                                src={c.thumbnail}
                                alt={c.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-xs text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              {c.title}
                            </p>
                            <div className="text-xs text-gray-500 flex flex-wrap gap-3">
                              <span className="flex items-center gap-1">
                                <BookOpen size={13} /> {c.lessonCount || 0}{" "}
                                Lessons
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity size={13} /> {c.quizCount || 0}{" "}
                                Quizzes
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={13} /> {c.duration || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ----- Students ----- */}
                      <td className="py-4 px-4 text-center text-sm">
                        {c.studentCount || 0}
                      </td>

                      {/* ----- Price ----- */}
                      <td className="py-4 px-4 text-center font-semibold text-sm">
                        ৳{c.price}
                      </td>

                      {/* ----- Rating ----- */}
                      <td className="py-4 px-4 text-center text-amber-600 text-sm">
                        <Star size={14} className="inline mr-1" />{" "}
                        {c.rating || "—"}
                      </td>

                      {/* ----- Status ----- */}
                      <td className="py-4 px-4 text-center">
                        <StatusPill status={c.status} />
                      </td>

                      {/* ----- Actions ----- */}
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/instructor/courses/${c._id}/units`}
                            className="p-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition flex justify-center items-center w-9 h-9"
                          >
                            <Edit size={16} />
                          </Link>

                          <button
                            onClick={() => alert("Delete course soon")}
                            className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition flex justify-center items-center w-9 h-9"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* -------- MOBILE CARDS -------- */}
            <div className="md:hidden space-y-4 mt-4">
              {paginated.map((c) => (
                <div
                  key={c._id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  {/* Thumbnail + Title */}
                  <div className="flex gap-3">
                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                      {c.thumbnail ? (
                        <Image
                          src={c.thumbnail}
                          alt={c.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {c.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {c.lessonCount || 0} Lessons • {c.quizCount || 0}{" "}
                        Quizzes
                      </p>
                      <p className="text-xs text-gray-500">
                        Duration: {c.duration || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 text-center text-sm py-3">
                    <div>
                      <p className="font-semibold">{c.studentCount || 0}</p>
                      <span className="text-xs text-gray-500">Students</span>
                    </div>

                    <div>
                      <p className="font-semibold">৳{c.price}</p>
                      <span className="text-xs text-gray-500">Price</span>
                    </div>

                    <div className="text-amber-600">
                      <p className="font-semibold flex justify-center items-center gap-1">
                        <Star size={14} /> {c.rating || "—"}
                      </p>
                      <span className="text-xs text-gray-500">Rating</span>
                    </div>
                  </div>

                  {/* Footer: Status + Actions */}
                  <div className="flex items-center justify-between mt-3">
                    <StatusPill status={c.status} />

                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/instructor/courses/${c._id}/units`}
                        className="p-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition flex justify-center items-center w-9 h-9"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        onClick={() => alert("Delete course soon")}
                        className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition flex justify-center items-center w-9 h-9"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
