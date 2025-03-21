"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/User"; // Import tipe User

interface UserFormProps {
  user?: User;
  onSubmit: (userData: User) => void;
}

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    id: user?.id || "", // Pastikan ID tidak undefined
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    status: user?.status || "Active",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="field">
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} />
      </div>
      <div className="field">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button className="ui primary button" type="submit">
        {user ? "Update User" : "Create User"}
      </button>
    </form>
  );
}
