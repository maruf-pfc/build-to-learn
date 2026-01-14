"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Printer,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Plus,
  Trash,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function CVGeneratorPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
    summary:
      "Passionate software engineer with expertise in building scalable web applications. Dedicated to writing clean, maintainable code and solving complex problems efficiently.",

    technologies: {
      languages: "JavaScript, TypeScript, Python, Java",
      frameworks: "React, Next.js, Node.js, Express, TailwindCSS",
      databases: "PostgreSQL, MongoDB, Redis",
      tools: "Git, Docker, AWS, Linux",
    },

    experience: [
      {
        role: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        duration: "Jan 2023 – Present",
        description:
          "Led the development of a high-traffic e-commerce platform using Next.js.\nOptimized API performance, reducing latency by 40%.\nMentored junior developers and conducted code reviews.",
      },
      {
        role: "Software Developer",
        company: "StartUp Hub",
        location: "Remote",
        duration: "Jun 2021 – Dec 2022",
        description:
          "Collaborated with cross-functional teams to deliver feature-rich web apps.\nImplemented CI/CD pipelines to streamline deployment processes.",
      },
    ],

    projects: [
      {
        name: "Project Alpha",
        link: "https://project-alpha.com",
        techStack: "React, Node.js, MongoDB",
        description:
          "A collaborative task management tool with real-time updates.",
      },
      {
        name: "E-Learning Platform",
        link: "https://learn-xyz.com",
        techStack: "Next.js, Tailwind CSS",
        description:
          "An interactive learning management system with video courses and quizzes.",
      },
    ],

    education: [
      {
        degree: "B.Sc. in Computer Science",
        institution: "University of Technology",
        year: "2017 – 2021",
      },
    ],

    competitive: [
      {
        platform: "Codeforces",
        rank: "Specialist",
        rating: "1450",
        handle: "jdoe_code",
      },
      { platform: "LeetCode", rank: "", rating: "1800", handle: "jdoe" },
    ],

    certifications: [
      "AWS Certified Solutions Architect",
      "Meta Frontend Developer Certificate",
    ],

    publications: [
      {
        title: "Optimizing React Rendering Performance",
        link: "",
        description: "Published on Medium Tech Blog",
      },
    ],

    extracurricular: [
      "Hackathon Winner 2022 - Best UI Design",
      "Open Source Contributor to React ecosystem",
    ],
  });

  const handleChange = (e, section = null, index = null, field = null) => {
    if (section && index !== null && field) {
      const updated = [...formData[section]];
      updated[index] = { ...updated[index], [field]: e.target.value };
      setFormData({ ...formData, [section]: updated });
    } else if (section && field) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleArrayChange = (e, section, index) => {
    const updated = [...formData[section]];
    updated[index] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const addItem = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-8 min-h-screen">
      {/* Editor Sidebar */}
      <div className="w-full xl:w-[450px] space-y-6 print:hidden h-fit xl:sticky xl:top-4 overflow-y-auto max-h-[calc(100vh-2rem)] custom-scrollbar pr-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>CV Details</span>
              <Button
                onClick={handlePrint}
                size="sm"
                variant="default"
                className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
              >
                <Printer size={14} /> Print PDF
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Personal Info
              </h3>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Job Title"
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <div className="grid grid-cols-3 gap-2">
                <Input
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="Portfolio URL"
                />
                <Input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                />
                <Input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="GitHub URL"
                />
              </div>
              <Textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Professional Summary"
                className="h-24 resize-none"
              />
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Technologies
              </h3>
              <Input
                value={formData.technologies.languages}
                onChange={(e) =>
                  handleChange(e, "technologies", null, "languages")
                }
                placeholder="Languages (C, JS...)"
              />
              <Input
                value={formData.technologies.frameworks}
                onChange={(e) =>
                  handleChange(e, "technologies", null, "frameworks")
                }
                placeholder="Frameworks (React, Node...)"
              />
              <Input
                value={formData.technologies.databases}
                onChange={(e) =>
                  handleChange(e, "technologies", null, "databases")
                }
                placeholder="Databases"
              />
              <Input
                value={formData.technologies.tools}
                onChange={(e) => handleChange(e, "technologies", null, "tools")}
                placeholder="Tools"
              />
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Experience
                </h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    addItem("experience", {
                      role: "",
                      company: "",
                      location: "",
                      duration: "",
                      description: "",
                    })
                  }
                >
                  <Plus size={12} />
                </Button>
              </div>
              {formData.experience.map((exp, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg space-y-2 bg-muted/20 relative group"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => removeItem("experience", i)}
                  >
                    <Trash size={12} />
                  </Button>
                  <Input
                    value={exp.role}
                    onChange={(e) => handleChange(e, "experience", i, "role")}
                    placeholder="Role"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(e, "experience", i, "company")
                    }
                    placeholder="Company"
                    className="h-8 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={exp.duration}
                      onChange={(e) =>
                        handleChange(e, "experience", i, "duration")
                      }
                      placeholder="Duration"
                      className="h-8 text-sm"
                    />
                    <Input
                      value={exp.location}
                      onChange={(e) =>
                        handleChange(e, "experience", i, "location")
                      }
                      placeholder="Location"
                      className="h-8 text-sm"
                    />
                  </div>
                  <Textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(e, "experience", i, "description")
                    }
                    placeholder="Description (• bullet points)"
                    className="h-20 text-xs resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Projects
                </h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    addItem("projects", {
                      name: "",
                      link: "",
                      techStack: "",
                      description: "",
                    })
                  }
                >
                  <Plus size={12} />
                </Button>
              </div>
              {formData.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg space-y-2 bg-muted/20 relative group"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => removeItem("projects", i)}
                  >
                    <Trash size={12} />
                  </Button>
                  <Input
                    value={proj.name}
                    onChange={(e) => handleChange(e, "projects", i, "name")}
                    placeholder="Project Name"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={proj.link}
                    onChange={(e) => handleChange(e, "projects", i, "link")}
                    placeholder="Link"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={proj.techStack}
                    onChange={(e) =>
                      handleChange(e, "projects", i, "techStack")
                    }
                    placeholder="Tech Stack"
                    className="h-8 text-sm"
                  />
                  <Textarea
                    value={proj.description}
                    onChange={(e) =>
                      handleChange(e, "projects", i, "description")
                    }
                    placeholder="Description"
                    className="h-16 text-xs resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Publications / Reports */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Publications / Reports
                </h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    addItem("publications", {
                      title: "",
                      link: "",
                      description: "",
                    })
                  }
                >
                  <Plus size={12} />
                </Button>
              </div>
              {formData.publications.map((pub, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg space-y-2 bg-muted/20 relative group"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => removeItem("publications", i)}
                  >
                    <Trash size={12} />
                  </Button>
                  <Input
                    value={pub.title}
                    onChange={(e) =>
                      handleChange(e, "publications", i, "title")
                    }
                    placeholder="Title / Topic"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={pub.link}
                    onChange={(e) => handleChange(e, "publications", i, "link")}
                    placeholder="Link URL"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={pub.description}
                    onChange={(e) =>
                      handleChange(e, "publications", i, "description")
                    }
                    placeholder="Details (e.g. Published in..)"
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Competitive Programming */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Competitive Programming
                </h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    addItem("competitive", {
                      platform: "",
                      rank: "",
                      rating: "",
                      handle: "",
                    })
                  }
                >
                  <Plus size={12} />
                </Button>
              </div>
              {formData.competitive.map((cp, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg grid grid-cols-2 gap-2 bg-muted/20 relative group"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-0 right-0 h-5 w-5 opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => removeItem("competitive", i)}
                  >
                    <Trash size={10} />
                  </Button>
                  <Input
                    value={cp.platform}
                    onChange={(e) =>
                      handleChange(e, "competitive", i, "platform")
                    }
                    placeholder="Platform"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={cp.handle}
                    onChange={(e) =>
                      handleChange(e, "competitive", i, "handle")
                    }
                    placeholder="Handle"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={cp.rank}
                    onChange={(e) => handleChange(e, "competitive", i, "rank")}
                    placeholder="Rank"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={cp.rating}
                    onChange={(e) =>
                      handleChange(e, "competitive", i, "rating")
                    }
                    placeholder="Rating"
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Education & Certs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Education
                </h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    addItem("education", {
                      degree: "",
                      institution: "",
                      year: "",
                    })
                  }
                >
                  <Plus size={12} />
                </Button>
              </div>
              {formData.education.map((edu, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-lg space-y-2 bg-muted/20 relative group"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => removeItem("education", i)}
                  >
                    <Trash size={12} />
                  </Button>
                  <Input
                    value={edu.degree}
                    onChange={(e) => handleChange(e, "education", i, "degree")}
                    placeholder="Degree"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={edu.institution}
                    onChange={(e) =>
                      handleChange(e, "education", i, "institution")
                    }
                    placeholder="Institution"
                    className="h-8 text-sm"
                  />
                  <Input
                    value={edu.year}
                    onChange={(e) => handleChange(e, "education", i, "year")}
                    placeholder="Year"
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Extracurricular */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Extracurricular
                </h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => addItem("extracurricular", "")}
                >
                  <Plus size={12} />
                </Button>
              </div>
              {formData.extracurricular.map((ex, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={ex}
                    onChange={(e) => handleArrayChange(e, "extracurricular", i)}
                    placeholder="Activity"
                    className="h-8 text-sm"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeItem("extracurricular", i)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview (Printable Area) */}
      <div className="flex-1 flex justify-center bg-gray-100 p-4 md:p-8 overflow-auto print:p-0 print:bg-white print:overflow-visible">
        <main
          id="cv-preview"
          className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[10mm] text-slate-900 print:shadow-none print:w-full print:h-auto print:min-h-0 print:p-0 scale-95 origin-top print:scale-100"
        >
          {/* Header */}
          <header className="border-b-2 border-slate-800 pb-2 mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900 leading-none mb-1">
                  {formData.name}
                </h1>
                <p className="text-base font-medium text-slate-700">
                  {formData.title}
                </p>
              </div>
              <div className="text-right text-[10px] text-slate-500 space-y-0.5">
                <p>
                  Updated:{" "}
                  {new Date().toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-700 font-medium">
              {formData.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-slate-500" />{" "}
                  {formData.location}
                </div>
              )}
              {formData.email && (
                <div className="flex items-center gap-1">
                  <Mail size={12} className="text-slate-500" /> {formData.email}
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={12} className="text-slate-500" />{" "}
                  {formData.phone}
                </div>
              )}

              <div className="flex items-center gap-3 ml-auto">
                {formData.portfolio && (
                  <a
                    href={`https://${formData.portfolio}`}
                    target="_blank"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Globe size={12} /> {formData.portfolio}
                  </a>
                )}
                {formData.linkedin && (
                  <a
                    href={`https://${formData.linkedin}`}
                    target="_blank"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Linkedin size={12} /> LinkedIn
                  </a>
                )}
                {formData.github && (
                  <a
                    href={`https://${formData.github}`}
                    target="_blank"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Github size={12} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </header>

          <div className="space-y-3">
            {/* Summary */}
            {formData.summary && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-slate-300 text-slate-800">
                  Summary
                </h2>
                <p className="text-[11px] leading-snug text-slate-700">
                  {formData.summary}
                </p>
              </section>
            )}

            {/* Technologies */}
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-slate-300 text-slate-800">
                Technologies
              </h2>
              <div className="text-[11px] text-slate-700 space-y-0.5">
                {Object.entries(formData.technologies).map(
                  ([key, value]) =>
                    value && (
                      <div key={key} className="flex">
                        <span className="font-bold w-24 capitalize text-slate-800">
                          {key}:
                        </span>
                        <span className="flex-1">{value}</span>
                      </div>
                    )
                )}
              </div>
            </section>

            {/* Competitive Programming */}
            {formData.competitive.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-slate-300 text-slate-800">
                  Competitive Programming
                </h2>
                <ul className="text-[11px] text-slate-700 space-y-0.5">
                  {formData.competitive.map((cp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {cp.platform}:
                      </span>
                      {cp.rank && <span>{cp.rank}</span>}
                      {cp.rating && <span>(Max - {cp.rating})</span>}
                      {cp.handle && (
                        <span className="text-slate-500">- {cp.handle}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Experience */}
            {formData.experience.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2 border-b border-slate-300 text-slate-800">
                  Experience
                </h2>
                <div className="space-y-3">
                  {formData.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-bold text-[12px] text-slate-900">
                          {exp.role}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-600">
                          {exp.duration}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-0.5 text-[11px]">
                        <span className="font-medium italic text-slate-800">
                          {exp.company}
                        </span>
                        <span className="text-slate-500">{exp.location}</span>
                      </div>

                      <ul className="list-disc list-outside ml-3 text-[11px] text-slate-700 leading-tight space-y-0.5 mt-1">
                        {exp.description
                          .split("\n")
                          .map(
                            (line, lIdx) =>
                              line.trim() && <li key={lIdx}>{line}</li>
                          )}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {formData.projects.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2 border-b border-slate-300 text-slate-800">
                  Projects
                </h2>
                <div className="space-y-3">
                  {formData.projects.map((proj, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[12px] text-slate-900">
                            {proj.name}
                          </h3>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5"
                            >
                              <ExternalLink size={8} /> Live
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-600 mb-0.5">
                        {proj.techStack}
                      </p>
                      <ul className="list-disc list-outside ml-3 text-[11px] text-slate-700 leading-tight space-y-0.5">
                        {proj.description
                          .split("\n")
                          .map(
                            (line, lIdx) =>
                              line.trim() && <li key={lIdx}>{line}</li>
                          )}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Publications / Reports */}
            {formData.publications.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-slate-300 text-slate-800">
                  Publications / Reports
                </h2>
                <ul className="text-[11px] text-slate-700 space-y-1">
                  {formData.publications.map((pub, i) => (
                    <li key={i}>
                      <div className="flex flex-wrap gap-2 items-baseline">
                        <span className="font-bold text-slate-900">
                          {pub.title}
                        </span>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            className="text-blue-600 hover:underline text-[10px]"
                          >
                            [Link]
                          </a>
                        )}
                      </div>
                      {pub.description && (
                        <p className="text-slate-600 text-[10px] italic">
                          {pub.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Education & Certs - Flexible Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.education.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-slate-300 text-slate-800">
                    Education
                  </h2>
                  <div className="space-y-1.5">
                    {formData.education.map((edu, i) => (
                      <div key={i}>
                        <h3 className="font-bold text-[11px] text-slate-900">
                          {edu.institution}
                        </h3>
                        <div className="flex justify-between text-[11px] text-slate-700">
                          <span>{edu.degree}</span>
                          <span className="text-slate-500 text-[10px]">
                            {edu.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {(formData.certifications.length > 0 ||
                formData.extracurricular.length > 0) && (
                <section>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-slate-300 text-slate-800">
                    Certifications & Extra
                  </h2>
                  <ul className="list-disc list-outside ml-3 text-[11px] text-slate-700 space-y-0.5">
                    {formData.certifications.map((cert, i) => (
                      <li key={`c-${i}`}>{cert}</li>
                    ))}
                    {formData.extracurricular.map((ex, i) => (
                      <li key={`e-${i}`}>{ex}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body * {
            visibility: hidden;
          }
          #cv-preview,
          #cv-preview * {
            visibility: visible;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 8mm 10mm !important;
            box-shadow: none !important;
            min-height: 100vh;
            height: auto;
            overflow: visible;
            background: white;
          }
          /* Ensure links are handled nicely in print if needed */
          a {
            text-decoration: none !important;
            color: #000 !important;
          }
        }
      `}</style>
    </div>
  );
}
