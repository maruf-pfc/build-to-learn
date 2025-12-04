export default function CourseItem({ title, code, price, subs }) {
  return (
    <section
      className="
      flex justify-between items-center 
      border-b border-gray-200 
      pb-3 pt-1
      hover:bg-gray-50 transition rounded-lg px-2
    "
    >
      <div className="space-y-0.5">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{code}</p>
      </div>

      <div className="text-right space-y-0.5">
        <p className="font-semibold text-indigo-600">{price}</p>
        <p className="text-xs text-gray-500">{subs}</p>
      </div>
    </section>
  );
}
