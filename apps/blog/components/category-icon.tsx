import {
  Globe,
  Atom,
  Code,
  Monitor,
  Server,
  Palette,
  FileText,
  Zap,
  Terminal,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Clock,
  GitBranch,
  Gauge,
  Link,
  Package,
} from "lucide-react"

interface CategoryIconProps {
  name: string
  className?: string
}

const iconMap = {
  Globe,
  Atom,
  Code,
  Monitor,
  Server,
  Palette,
  FileText,
  Zap,
  Terminal,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Clock,
  GitBranch,
  Gauge,
  Link,
  Package,
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap] || BookOpen
  return <IconComponent className={className} />
}
