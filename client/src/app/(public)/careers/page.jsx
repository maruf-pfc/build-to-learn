import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="container py-20 max-w-5xl">
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl font-bold tracking-tight">Join Our Mission</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're building the future of education. Come help us empower learners
          around the world.
        </p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
        {/* Job 1 */}
        <JobCard
          title="Senior Frontend Engineer"
          department="Engineering"
          location="Remote / San Francisco"
          type="Full-time"
        />
        {/* Job 2 */}
        <JobCard
          title="Product Designer"
          department="Design"
          location="New York, NY"
          type="Full-time"
        />
        {/* Job 3 */}
        <JobCard
          title="Community Manager"
          department="Marketing"
          location="London, UK"
          type="remote"
        />
      </div>

      <div className="mt-20 text-center bg-muted/50 p-12 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Don't see a fit?</h3>
        <p className="text-muted-foreground mb-6">
          We are always looking for talented individuals. Send us your resume.
        </p>
        <Button asChild size="lg">
          <Link href="mailto:careers@lmsplatform.com">Email Us</Link>
        </Button>
      </div>
    </div>
  );
}

function JobCard({ title, department, location, type }) {
  return (
    <Card className="hover:border-primary transition-colors cursor-pointer">
      <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium px-3 py-1 bg-muted rounded-full uppercase text-xs tracking-wider">
            {type}
          </span>
          <Button variant="outline" size="sm">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
