"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Download, ExternalLink } from "lucide-react";

export default function CertificatePage() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/certificates/${id}`)
      .then((res) => setCert(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        <Loader2 className="animate-spin mr-2" /> Loading Certificate...
      </div>
    );
  if (error)
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!cert)
    return <div className="p-8 text-center">Certificate not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="mb-6 flex gap-4 print:hidden">
        <Button onClick={() => window.print()}>
          <Download className="mr-2 h-4 w-4" /> Download / Print
        </Button>
      </div>

      <div
        id="certificate-view"
        className="bg-white border-8 border-double border-slate-800 p-10 md:p-20 text-center shadow-2xl relative w-full max-w-[1000px] aspect-[1.414/1] flex flex-col items-center justify-center bg-[url('/pattern.png')] bg-contain"
      >
        {/* Decorative Corners */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-yellow-600"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-600"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-yellow-600"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-yellow-600"></div>

        {/* Content */}
        <div className="z-10 bg-white/90 p-8 rounded-xl backdrop-blur-sm w-full h-full flex flex-col items-center justify-center border border-slate-200">
          <img src="/logo.png" alt="" className="h-16 mb-4 opacity-50" />{" "}
          {/* Placeholder for logo if we had one */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-2 uppercase tracking-widest">
            Certificate
          </h1>
          <h2 className="text-xl md:text-2xl text-yellow-600 font-serif uppercase tracking-widest mb-8">
            of Completion
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-2 font-serif italic">
            This certifies that
          </p>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 font-serif border-b-2 border-slate-300 pb-2 px-8 min-w-[50%]">
            {cert.userName}
          </h3>
          <p className="text-lg md:text-xl text-slate-600 mb-2 font-serif italic">
            has successfully completed the course
          </p>
          <h4 className="text-2xl md:text-3xl font-bold text-primary mb-12 font-serif">
            {cert.courseTitle}
          </h4>
          <div className="flex justify-between w-full max-w-2xl mt-8 px-12">
            <div className="text-center">
              <div className="border-b border-slate-400 w-48 mb-2"></div>
              <p className="text-slate-900 font-bold text-lg">
                {cert.instructorName}
              </p>
              <p className="text-slate-500 text-sm uppercase tracking-wider">
                Instructor
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-2 relative">
                {/* Seal Placeholder */}
                <div className="absolute inset-0 border-4 border-yellow-600 rounded-full flex items-center justify-center text-yellow-600 font-bold shadow-inner bg-yellow-50">
                  VERIFIED
                </div>
              </div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mt-2">
                ID: {cert.certificateId.substring(0, 8)}
              </p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                {new Date(cert.issueDate).toLocaleDateString()}
              </p>
            </div>

            <div className="text-center">
              <div className="border-b border-slate-400 w-48 mb-2"></div>
              <p className="text-slate-900 font-bold text-lg">Build 2 Learn</p>
              <p className="text-slate-500 text-sm uppercase tracking-wider">
                Platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body * {
            visibility: hidden;
          }
          #certificate-view,
          #certificate-view * {
            visibility: visible;
          }
          #certificate-view {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            border: none;
            transform: scale(1);
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}
