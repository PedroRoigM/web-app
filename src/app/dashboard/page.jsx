'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import getUser from "../lib/getUser";
import LoadingScreen from "./components/Loading";
export default function Dashboard() {
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
            <LoadingScreen />
        )
    }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 text-center space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800">Hola, {user.name} 👋</h2>
                    <p className="text-gray-600">
                        Nos alegra verte de nuevo. Aquí puedes gestionar tus clientes, revisar estadísticas y más.
                    </p>

                </div>

                {/* Quick Links Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Clientes</h3>
                        <p className="text-gray-600 mt-2">
                            Gestiona y revisa los datos de tus clientes fácilmente.
                        </p>

                        <Link
                            href={`/dashboard/clientes`}

                        >
                            <div className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Ver Clientes
                            </div>
                        </Link>

                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Estadísticas</h3>
                        <p className="text-gray-600 mt-2">
                            Consulta tus proyectos.
                        </p>
                        <Link
                            href={`/dashboard/proyectos`}

                        >
                            <div className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Ver proyectos
                            </div>
                        </Link>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Albaranes</h3>
                        <p className="text-gray-600 mt-2">
                            Consulta tus albaranes.
                        </p>
                        <Link
                            href={`/dashboard/albaranes`}

                        >
                            <div className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Ver albaranes
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">© 2024 Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
