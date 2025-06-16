import type { LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {features.map((feature, index) => (
        <div key={index} className="text-center group">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <feature.icon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
