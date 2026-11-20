"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {},
      {
        withCredentials: true
      }
    );

    if (response.status === 200) {
      sessionStorage.removeItem("isLoggedIn");

     router.replace("/login");
    }

  } catch (error) {
    console.log("Logout error:", error);
  }
};

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-blue-600"
          aria-label="Home"
        >
          {"<>"}
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5 sm:gap-8">

          <Link
            href="/home"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
          </Link>

          {/* Profile Icon */}
          <div className="relative">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
              aria-label="User profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            </button>

            {/* Logout Popup */}
            {isOpen && (
              <div className="absolute right-0 top-12 z-50 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>

                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;