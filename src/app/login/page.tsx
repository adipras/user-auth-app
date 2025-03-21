"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UserClaims = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  status: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // 🔄 Auto-redirect jika sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Simpan token ke localStorage
      const token = res.data.token;
      Cookies.set("token", token, { expires: 1 });
      localStorage.setItem("token", token);

      const decoded: UserClaims = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decoded));

      // Redirect ke dashboard
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="ui container" style={{ maxWidth: 400, marginTop: "100px" }}>
      <h2 className="ui header">Login</h2>
      {error && <div className="ui red message">{error}</div>}
      <div className="ui form">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="ui button primary" onClick={handleLogin}>
          Login
        </button>
        <div className="ui message" style={{ marginTop: "10px" }}>
          Belum punya akun? <Link href="/register">Daftar di sini</Link>
        </div>
      </div>
    </div>
  );
}
