import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav({ items }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2 px-4 py-6 text-[var(--color-text)]">
      {/* Menu Items */}
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-indigo-50 hover:text-indigo-700"
              }`}
          >
            {Icon && <Icon size={18} />}
            <span>{item.title}</span>
          </Link>
        );
      })}

      {/* Home / Logout Section */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all 
                   border border-gray-300 hover:bg-red-50 hover:text-red-600 mt-4"
      >
        <LogOut size={18} />
        <span>Home</span>
      </Link>
    </nav>
  );
}
