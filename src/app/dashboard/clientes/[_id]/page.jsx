"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getClient from "@/app/lib/getClient";

export default function DetailUser() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getClient({ id });
                setUser(data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        getUser();
    }, [id]);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Cargando información del usuario...</p>
            </div>
        );
    }

    return (
        <div className="flex  min-h-screen bg-gray-100">
            <div className="p-8  w-full h-full bg-white rounded-2xl shadow-lg space-y-8">
                {/* Header with logo and name */}
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={user.logo}
                        alt={``}
                        className="w-20 h-20 bg-gray-300 rounded-full object-cover shadow-md"
                    />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-500 text-sm">CIF: {user.cif}</p>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2 text-center">
                    <h2 className="text-lg font-semibold text-gray-800">Dirección</h2>
                    <p className="text-gray-600 leading-relaxed">
                        {user.address.street}, Nº {user.address.number}
                        <br />
                        {user.address.city}, {user.address.province} {user.address.postal}
                    </p>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Información adicional
                    </h2>
                    <ul className="text-gray-600 space-y-2 text-sm">
                        <li>
                            <span className="font-medium text-gray-700">ID:</span> {user._id}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">User ID:</span> {user.userId}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">Creado el:</span>{" "}
                            {new Date(user.createdAt).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </li>
                        <li>
                            <span className="font-medium text-gray-700">Última actualización:</span>{" "}
                            {new Date(user.updatedAt).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
}
