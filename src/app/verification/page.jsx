"use client";
import { useState } from "react";
import handleVerification from "../lib/validation";

export default function Page() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [registration, setRegistration] = useState(false);

    const handleValidation = async (e) => {
        e.preventDefault(); // Prevenir la recarga de la página
        try {
            // Llamar a la función para validar al usuario
            const response = await handleVerification(code);

        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error("Error validating user:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md">

                <div>
                    <h1 className="p-5 text-2xl font-bold text-center">Your code</h1>
                    <input
                        placeholder="000000"
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <button
                        onClick={handleValidation}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Validate
                    </button>
                </div>

                {message && (
                    <p className="mt-4 text-center text-sm text-red-500">{message}</p>
                )}
            </div>
        </div>
    );
}