import { PageHeader } from "@/components/page-header";
import { ContentSection } from "@/components/content-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Server,
  Database,
  Globe,
  Smartphone,
} from "lucide-react";

const systemStatus = [
  {
    name: "Website",
    status: "operational",
    icon: Globe,
    description: "Main website and learning platform",
  },
  {
    name: "API Services",
    status: "operational",
    icon: Server,
    description: "Backend services and API endpoints",
  },
  {
    name: "Database",
    status: "operational",
    icon: Database,
    description: "User data and course content storage",
  },
  {
    name: "Mobile App",
    status: "maintenance",
    icon: Smartphone,
    description: "iOS and Android applications",
  },
];

const recentIncidents = [
  {
    title: "Scheduled maintenance for mobile app updates",
    status: "ongoing",
    date: "2024-01-15",
    time: "14:00 UTC",
    description:
      "We're performing scheduled maintenance to deploy new features to our mobile applications.",
    updates: [
      {
        time: "14:00 UTC",
        message:
          "Maintenance started - Mobile apps may be temporarily unavailable",
      },
      { time: "14:30 UTC", message: "iOS app update deployed successfully" },
      { time: "15:00 UTC", message: "Android app update in progress" },
    ],
  },
  {
    title: "Brief video streaming interruption",
    status: "resolved",
    date: "2024-01-12",
    time: "09:15 UTC",
    description:
      "Some users experienced issues with video playback for approximately 20 minutes.",
    updates: [
      {
        time: "09:15 UTC",
        message: "Issue identified - Video streaming service degraded",
      },
      {
        time: "09:25 UTC",
        message: "Engineering team investigating the root cause",
      },
      {
        time: "09:35 UTC",
        message: "Issue resolved - All video services restored",
      },
    ],
  },
];

const uptime = [
  { period: "Last 24 hours", percentage: "99.98%" },
  { period: "Last 7 days", percentage: "99.95%" },
  { period: "Last 30 days", percentage: "99.92%" },
  { period: "Last 90 days", percentage: "99.89%" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "operational":
      return "bg-green-100 text-green-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    case "degraded":
      return "bg-orange-100 text-orange-800";
    case "outage":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "operational":
      return CheckCircle;
    case "maintenance":
      return Clock;
    case "degraded":
      return AlertCircle;
    case "outage":
      return XCircle;
    default:
      return AlertCircle;
  }
}

export default function StatusPage() {
  return (
    <main>
      <PageHeader
        title="System Status"
        description="Real-time status of Build to Learn services and infrastructure. Stay updated on any ongoing issues or maintenance."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "System Status" }]}
      />

      {/* Overall Status */}
      <ContentSection className="bg-white">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">All Systems Operational</span>
          </div>
          <p className="text-gray-600">
            All services are running normally with no reported issues.
          </p>
        </div>

        {/* System Components */}
        <div className="grid md:grid-cols-2 gap-6">
          {systemStatus.map((system, index) => {
            const StatusIcon = getStatusIcon(system.status);
            return (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <system.icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-lg text-gray-900">
                          {system.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {system.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIcon className="w-5 h-5 text-green-600" />
                      <Badge className={getStatusColor(system.status)}>
                        {system.status.charAt(0).toUpperCase() +
                          system.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContentSection>

      {/* Uptime Statistics */}
      <ContentSection className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Uptime Statistics
          </h2>
          <p className="text-xl text-gray-600">
            Historical uptime data for our services
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {uptime.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="font-poppins font-bold text-3xl text-green-600 mb-2">
                  {stat.percentage}
                </div>
                <div className="text-gray-600">{stat.period}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Recent Incidents */}
      <ContentSection className="bg-white">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Recent Incidents
          </h2>
          <p className="text-xl text-gray-600">
            Latest updates on system incidents and maintenance
          </p>
        </div>

        <div className="space-y-6">
          {recentIncidents.map((incident, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
                      {incident.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{incident.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{incident.date}</span>
                      <span>•</span>
                      <span>{incident.time}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      incident.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {incident.status.charAt(0).toUpperCase() +
                      incident.status.slice(1)}
                  </Badge>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Updates:</h4>
                  <div className="space-y-2">
                    {incident.updates.map((update, updateIndex) => (
                      <div
                        key={updateIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-sm text-gray-500">
                            {update.time}
                          </span>
                          <p className="text-gray-700">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Subscribe to Updates */}
      <ContentSection className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            Stay Informed
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to status updates and get notified about incidents and
            maintenance windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            You can also follow us on social media for real-time updates.
          </p>
        </div>
      </ContentSection>
    </main>
  );
}
