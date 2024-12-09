'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import getUser from "@/app/lib/getUser";
export default function Topbar() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    if (!user) {
        return (
            <div>
                <p>Loading user...</p>
            </div>
        )
    }
    return (
        <header className="bg-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Bienvenido!</h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.name ? user.name : "Nombre de usuario"}</span>
                <Link
                    href="/dashboard/profile"
                    className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer"
                >
                </Link>
            </div>
        </header>
    )
}