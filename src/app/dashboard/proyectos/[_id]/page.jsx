'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getProject from "@/app/lib/getProject";
import Link from "next/link";
export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [project, setProject] = useState(null);

    useEffect(() => {
        const hendleGetProject = async () => {
            try {
                const data = await getProject({ id });
                setProject(data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };
        hendleGetProject();
    }, [id]);
    if (!project) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Cargando información del proyecto...</p>
            </div>
        );
    }
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-5">
            <div className="w-full  bg-white rounded-2xl shadow-xl p-8 space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-gray-800">{project.name}</h1>
                    <p className="text-gray-500 text-sm">Código del Proyecto: {project.projectCode}</p>
                </div>

                {/* Address */}
                {project.address && (
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-800">Dirección</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {project.address.street}, Nº {project.address.number}
                            <br />
                            {project.address.city}, {project.address.province} {project.address.postal}
                        </p>
                    </div>
                )}

                {/* Project Details */}
                <div>
                    <h2 className="text-2xl font-semibold text-center mb-4">Detalles del Proyecto</h2>
                    <div className="flex justify-center items-center">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                            <div>

                                <span className="font-medium text-gray-700">ID del Proyecto:</span> {project._id}

                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Código:</span> {project.code}
                            </div>
                            <div>
                                <Link
                                    href={`/dashboard/profile`}
                                >
                                    <span className="font-medium text-blue-500">Ver Usuario</span>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href={`/dashboard/clientes/${project.clientId}?id=${project.clientId}`}
                                >
                                    <span className="font-medium text-blue-500">Ver Cliente</span>
                                </Link>
                            </div>

                            <div className="col-span-full">
                                <span className="font-medium text-gray-700">Notas:</span> {project.notes || "No hay notas disponibles."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timestamps */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Información de Registro</h2>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-700">Creado el:</span>{" "}
                        {new Date(project.createdAt).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium text-gray-700">Última Actualización:</span>{" "}
                        {new Date(project.updatedAt).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                {/* Services Section */}
                {project.servicePrices.length > 0 ? (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Precios de Servicios</h2>
                        <ul className="space-y-2 mt-4">
                            {project.servicePrices.map((service, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between bg-gray-50 p-3 rounded-md shadow-sm text-gray-700"
                                >
                                    <span>{service.name}</span>
                                    <span className="font-medium">{service.price} €</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-600 italic text-center">No hay precios de servicios registrados.</p>
                )}
            </div>
        </div >
    )
}