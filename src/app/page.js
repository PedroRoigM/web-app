"use client";

import { useState, useEffect } from "react";
import getUser from "./lib/getUser";
import handleRegistration from "@/app/lib/register";
import handleLogin from "@/app/lib/login";
import LoadingScreen from "./dashboard/components/Loading";

export default function Home() {
    const [isRegister, setIsRegister] = useState(true); // Alterna entre Login y Register
    const [user, setUser] = useState({ email: "", password: "" }); // Estado para el usuario
    const [message, setMessage] = useState(""); // Mensaje para feedback
    const [loading, setLoading] = useState(false); // Estado para el spinner
    const [errors, setErrors] = useState({}); // Para guardar errores de validación

    const validateInputs = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de email

        if (!user) {
            newErrors.general = "User data is missing.";
        } else {
            if (!emailRegex.test(user.email)) {
                newErrors.email = "Please enter a valid email address.";
            }

            if (user.password.length < 9) {
                newErrors.password = "Password must be at least 9 characters long.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateInputs()) {
            setMessage("Please fix the errors before submitting.");
            return;
        }

        try {
            if (isRegister) {
                await handleRegistration(user);
                setMessage("Registration successful! Please log in.");
            } else {
                await handleLogin(user);
                setMessage("Login successful! Redirecting...");
                const token = Cookies.get("token");
                if (token) {
                    window.location.href = "/dashboard";
                }
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const handleGoogleLogin = async () => {
            const response = await getUser();
            if (response) {
                window.location.href = "/dashboard";
            }
            setLoading(true);
        };

        handleGoogleLogin();
    }, []);

    if (!loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    {isRegister ? "Register" : "Login"}
                </h1>
                {message && (
                    <p className="text-center text-sm text-red-500 mb-4">{message}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value });
                                setErrors({ ...errors, email: "" }); // Limpiar error al cambiar
                            }}
                            className={`w-full p-2 border rounded-md ${errors.email ? "border-red-500" : ""
                                }`}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                                setErrors({ ...errors, password: "" }); // Limpiar error al cambiar
                            }}
                            className={`w-full p-2 border rounded-md ${errors.password ? "border-red-500" : ""
                                }`}
                            required
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        {isRegister
                            ? "Already have an account?"
                            : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setMessage("");
                                setErrors({});
                            }}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            {isRegister ? "Login" : "Register"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
