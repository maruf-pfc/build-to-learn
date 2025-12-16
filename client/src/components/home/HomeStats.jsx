"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Award, Layers } from "lucide-react";
import api from "@/lib/api";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export default function HomeStats() {
  const [stats, setStats] = useState({
    activeLearners: "10K+",
    courses: "300+",
    certificatesIssued: "5K+",
    instructors: "100+",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/public");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
    return num + "+";
  };

  return (
    <Section variant="muted" className="py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat icon={Users} value={formatNumber(stats.activeLearners)} label="Active Learners" color="text-blue-600" />
          <Stat icon={BookOpen} value={formatNumber(stats.courses)} label="Courses" color="text-green-600" />
          <Stat icon={Award} value={formatNumber(stats.certificatesIssued)} label="Certificates Issued" color="text-yellow-600" />
          <Stat icon={Layers} value={formatNumber(stats.instructors)} label="Instructors" color="text-purple-600" />
        </div>
      </Container>
    </Section>
  );
}

function Stat({ icon: Icon, value, label, color }) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn("mb-3 p-3 rounded-full bg-muted", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
