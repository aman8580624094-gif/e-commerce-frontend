
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupUser() {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    description: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const data = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        signup,
        {
          withCredentials: true
        }
      );

      console.log("Signup successful:", response.data);
      router.push("new-things");
     sessionStorage.setItem("isLoggedIn", "true");
      router.replace("new-things");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("API Error:", error.response?.data);
        console.log("Status:", error.response?.status);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    router.replace("new-things");
  }
}, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await data();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-center text-3xl font-bold text-black">
          Sign Up
        </h1>

        <div>
          <label className="mb-2 block text-black">Name</label>
          <input
            type="text"
            name="name"
            value={signup.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full rounded border p-3 text-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-black">Email</label>
          <input
            type="email"
            name="email"
            value={signup.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full rounded border p-3 text-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-black">Description</label>
          <textarea
            name="description"
            value={signup.description}
            onChange={handleChange}
            placeholder="Write a short description"
            rows={3}
            className="w-full rounded border p-3 text-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-black">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signup.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded border p-3 pr-16 text-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button

          type="submit"
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </main>
  );
}
