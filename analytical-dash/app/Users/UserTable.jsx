"use client";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const ROLES = ["admin", "sales", "user"];

export default function UsersTable({ role, user: currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [role]);

  function fetchUsers() {
    setLoading(true);
    let url = "/api/users";
    if (role) url += `?role=${encodeURIComponent(role)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }

  async function handleDelete(user) {
    if (user.id === currentUser.id) {
      alert("You cannot delete your own user account!");
      return;
    }
    if (!confirm(`Delete user "${user.name}" (${user.email})?`)) return;
    await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id: user.id }),
    });
    fetchUsers();
  }

  async function handleChangeRole(user, newRole) {
    if (user.id === currentUser.id) {
      alert("You cannot change your own role!");
      return;
    }
    if (user.role === newRole) return;
    if (
      !confirm(
        `Change role of "${user.name}" from "${user.role}" to "${newRole}"?`
      )
    )
      return;
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, role: newRole }),
    });
    fetchUsers();
  }

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              {currentUser?.role === "admin" && (
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 font-mono text-xs">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.image_url ? (
                    <img
                      src={user.image_url}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      No image
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(user.created_at).toLocaleString()}
                </td>
                {currentUser?.role === "admin" && (
                  <td className="px-4 py-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                          aria-label="Actions"
                        >
                          <EllipsisVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* role change */}
                        <div className="px-2">
                          {ROLES.filter((r) => r !== user.role).map((r) => (
                            <DropdownMenuItem
                              key={r}
                              onClick={() => handleChangeRole(user, r)}
                              disabled={user.id === currentUser.id}
                              className={
                                user.id === currentUser.id
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }
                            >
                              Make {r.charAt(0).toUpperCase() + r.slice(1)}
                            </DropdownMenuItem>
                          ))}
                        </div>
                        <DropdownMenuItem
                          className={`text-red-600 px-4 text-center ${
                            user.id === currentUser.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleDelete(user)}
                          disabled={user.id === currentUser.id}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
