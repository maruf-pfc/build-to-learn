"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { Trash2, UserCog, Shield } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, currentRole) => {
    const roles = ["student", "instructor", "admin"];
    const nextRole = roles[(roles.indexOf(currentRole) + 1) % roles.length];

    if (!confirm(`Change role to ${nextRole}?`)) return;

    try {
      await api.put(`/users/${userId}/role`, { role: nextRole });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <div className="p-8">Loading users...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">User Management</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Role</th>
              <th className="p-4 font-semibold text-gray-700">Joined</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{u.name}</td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold uppercase
                                        ${
                                          u.role === "admin"
                                            ? "bg-purple-100 text-purple-700"
                                            : u.role === "instructor"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-700"
                                        }
                                    `}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {u._id !== currentUser.id && (
                    <button
                      onClick={() => handleRoleUpdate(u._id, u.role)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded transition"
                      title="Cycle Role"
                    >
                      <UserCog size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
