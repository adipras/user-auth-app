"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi konfirmasi password
    if (form.password !== form.confirmPassword) {
      setError("Password dan Konfirmasi Password harus sama!");
      return;
    }

    setError(""); // Reset error jika tidak ada masalah

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      }),
    });

    if (response.ok) {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } else {
      alert("Registrasi gagal. Periksa kembali data Anda.");
    }
  };

  return (
    <div className="ui container">
      <h2 className="ui header">Register</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Nama</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Nomor Telepon</label>
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Konfirmasi Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        {error && <div className="ui red message">{error}</div>}
        <button className="ui button primary" type="submit">Register</button>
      </form>
      <div className="ui message" style={{ marginTop: "10px" }}>
          Sudah punya akun? <Link href="/login">Login di sini</Link>
        </div>
    </div>
  );
}
