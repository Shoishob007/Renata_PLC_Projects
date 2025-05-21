"use client";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";

const emptyCustomer = {
  id: "",
  name: "",
  division: "",
  gender: "",
  marital_status: "",
  age: "",
  income: "",
};

export default function CustomersTable({ user }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("add");
  const [customerForm, setCustomerForm] = useState(emptyCustomer);

  useEffect(() => {
    fetchCustomers();
  }, []);

  function fetchCustomers() {
    setLoading(true);
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }

  function handleOpenAdd() {
    setDialogType("add");
    setCustomerForm(emptyCustomer);
    setDialogOpen(true);
  }

  function handleOpenEdit(customer) {
    setDialogType("edit");
    setCustomerForm({
      ...customer,
      age: String(customer.age),
      income: String(customer.income),
    });
    setDialogOpen(true);
  }

  async function handleDelete(customer) {
    if (!confirm(`Delete customer "${customer.name}"?`)) return;
    await fetch("/api/customers", {
      method: "DELETE",
      body: JSON.stringify({ id: customer.id }),
    });
    fetchCustomers();
  }

  async function handleDialogSubmit(e) {
    e.preventDefault();
    const method = dialogType === "add" ? "POST" : "PUT";
    const body = {
      ...customerForm,
      age: Number(customerForm.age),
      income: Number(customerForm.income),
    };
    await fetch("/api/customers", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setDialogOpen(false);
    fetchCustomers();
  }

  if (loading) return <div className="p-4">Loading customers...</div>;

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
                Division
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Marital Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Age
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Income
              </th>
              {user.role !== "user" && (
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 font-mono text-xs">{customer.id}</td>
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.division}</td>
                <td className="px-4 py-2">{customer.gender}</td>
                <td className="px-4 py-2">{customer.marital_status}</td>
                <td className="px-4 py-2">{customer.age}</td>
                <td className="px-4 py-2">
                  {Number(customer.income).toLocaleString()}
                </td>
                {user.role !== "user" && (
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
                        <DropdownMenuItem
                          onClick={() => handleOpenEdit(customer)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(customer)}
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

      {/* add */}
      {user.role !== "user" && (
        <button
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full shadow-lg p-4 hover:bg-blue-700 focus:outline-none z-10"
          onClick={handleOpenAdd}
          aria-label="Add Customer"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "add" ? "Add Customer" : "Edit Customer"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleDialogSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                className="w-full border rounded px-3 py-2"
                required
                value={customerForm.name}
                onChange={(e) =>
                  setCustomerForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Division</label>
              <input
                className="w-full border rounded px-3 py-2"
                required
                value={customerForm.division}
                onChange={(e) =>
                  setCustomerForm((f) => ({ ...f, division: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                className="w-full border rounded px-3 py-2"
                required
                value={customerForm.gender}
                onChange={(e) =>
                  setCustomerForm((f) => ({ ...f, gender: e.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Marital Status
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                required
                value={customerForm.marital_status}
                onChange={(e) =>
                  setCustomerForm((f) => ({
                    ...f,
                    marital_status: e.target.value,
                  }))
                }
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                min="0"
                className="w-full border rounded px-3 py-2"
                required
                value={customerForm.age}
                onChange={(e) =>
                  setCustomerForm((f) => ({ ...f, age: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Income</label>
              <input
                type="number"
                min="0"
                className="w-full border rounded px-3 py-2"
                required
                value={customerForm.income}
                onChange={(e) =>
                  setCustomerForm((f) => ({ ...f, income: e.target.value }))
                }
              />
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-2">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {dialogType === "add" ? "Add" : "Update"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
