"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    const LoginData = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/signIn`,
                login,
                {
                    withCredentials: true
                }
            );
            router.push("new-things/home");
            sessionStorage.setItem("isLoggedIn", "true");
            router.replace("new-things/home");
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data)
                console.log(error.response?.status)
            }
            else {
                console.log("error")
            }

        }
    }
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn === "true") {
            router.replace("/new-things/home");
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await LoginData()
        console.log("Email:", login.email);
        console.log("Password:", login.password);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
                    Welcome Back
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Please login to your account
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={login.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <div className="flex items-center rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={login.password}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg px-4 py-3 text-gray-900 outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-4 text-sm text-blue-600 hover:text-blue-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
