interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="font-poppins font-bold text-4xl text-blue-600 mb-2">
            {stat.value}
          </div>
          <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
          {stat.description && (
            <div className="text-sm text-gray-600">{stat.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
