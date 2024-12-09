'use client'

import Link from "next/link";
import { useEffect } from "react";
import getUser from "../../lib/getUser";
export default function Sidebar() {
    let verified = false;
    useEffect(() => {
        const handleGoogleLogin = async () => {
            const response = await getUser();
            if (!response) {
                window.location.href = "/";
            }
            verified = true;
        }

        handleGoogleLogin();
    }, []);
    if (!verified) {
        return (
            <div>

            </div>
        )
    }
    return (
        <div className="w-40 h-[100vh] bg-white px-4 py-6 flex flex-col border-black">
            <Link href="/dashboard">
                <h2 className="text-lg font-bold text-blue-600 mb-6">Bildy</h2>
            </Link>
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-4">
                    <li>
                        <Link
                            href="/dashboard/clientes"
                            className="text-gray-700 font-medium hover:text-blue-600"
                        >
                            Clientes
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/proyectos"
                            className="text-gray-700 font-medium hover:text-blue-600"
                        >
                            Proyectos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/albaranes"
                            className="text-gray-700 font-medium hover:text-blue-600"
                        >
                            Albaranes
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    );
}
