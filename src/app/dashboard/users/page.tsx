"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { User } from "@/types/User"; // Pastikan semua file pakai tipe yang sama
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (userData: User) => {
    if (editingUser) {
      // Update User
      fetch(`${API_URL}/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      })
        .then(() => {
          setUsers(users.map((user) => (user.id === editingUser.id ? userData : user)));
          setEditingUser(null);
        })
        .catch((err) => console.error(err));
    } else {
      // Create New User
      fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
        <Navbar />
        <div className="ui container" style={{ marginTop: "20px" }}>
            <h1>Manage Users</h1>
            <UserForm user={editingUser ?? undefined} onSubmit={handleSubmit} />
            <UserTable users={users} setEditingUser={setEditingUser} />
        </div>
    
    </>
  );
}
