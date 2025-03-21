"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type UserClaims = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  status: string;
};

export default function Navbar() {
  const [user, setUser] = useState<UserClaims | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    router.replace("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="ui menu">
      <Link href="/dashboard" className={`item ${pathname === "/dashboard" ? "active" : ""}`}>
        Home
      </Link>
      <Link href="/dashboard/users" className={`item ${pathname === "/dashboard/users" ? "active" : ""}`}>
        Users
      </Link>
      
      <div className="right menu">
      {user ? (
          <>
            <div className="item">👤 {user.name}</div>
            <button className="ui red button" onClick={handleLogout} style={{ margin: "10px" }}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="item">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
