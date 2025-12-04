export default function StatCard({ icon, title, value, accent }) {
  return (
    <section
      className={`flex items-center justify-between rounded-[var(--radius-card)] p-5 transition-all shadow-sm border 
      ${
        accent
          ? "text-white bg-gradient-to-r from-indigo-600 to-indigo-500 border-none shadow-md"
          : "bg-white border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Text */}
      <div className="flex flex-col">
        <span
          className={`text-sm ${
            accent ? "opacity-90 text-indigo-100" : "text-gray-500"
          }`}
        >
          {title}
        </span>

        <span
          className={`text-2xl font-bold ${
            accent ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </span>
      </div>

      {/* Icon */}
      <div
        className={`text-3xl ${
          accent ? "text-indigo-100" : "text-indigo-600 opacity-80"
        }`}
      >
        {icon}
      </div>
    </section>
  );
}
