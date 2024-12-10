"use client";

import { useState } from "react";
import handleVerification from "../lib/validation";

export default function Page() {
    const [code, setCode] = useState(new Array(6).fill("")); // Código dividido en 6 cajas
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState(false); // Estado para errores de validación

    const handleValidation = async (e) => {
        e.preventDefault();
        const codeString = code.join(""); // Combinar los valores en un solo string
        if (codeString.length !== 6 || codeString.match(/\D/)) {
            setMessage("The code must be 6 digits.");
            setErrors(true);
            return;
        }
        try {
            await handleVerification(codeString);
            setMessage("Validation successful!");
            setErrors(false);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error("Error validating user:", error);
        }
    };

    const handleChange = (value, index) => {
        if (!/^\d$/.test(value) && value !== "") return; // Permitir solo números
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setErrors(false); // Limpiar errores en tiempo real

        // Mover el enfoque a la siguiente caja si se ingresa un valor
        if (value && index < code.length - 1) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Enter your code</h1>
                <form onSubmit={handleValidation} className="space-y-4">
                    <div className="flex justify-center space-x-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className={`w-12 h-12 text-center border rounded-md text-lg ${errors ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Validate
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center text-sm ${errors ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
