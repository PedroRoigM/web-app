'use client';
import { useEffect, useState } from 'react';
import getProjects from '@/app/lib/getProjects';
import postProject from '@/app/lib/postProject';
import getClients from '@/app/lib/getClients';
import Link from 'next/link';
export default function Home() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: "",
        projectCode: "",
        email: "",
        address: {
            street: "",
            number: "",
            postal: "",
            city: "",
            province: ""
        },
        code: "",
        clientId: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState({});

    // Manejar cambios en el formulario de nuevo proyecto
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Actualizar valores de `address` si corresponde
        if (name.includes("address.")) {
            const key = name.split(".")[1];
            setNewProject((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [key]: value
                }
            }));
        } else {
            setNewProject((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Simular la carga inicial de proyectos
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        fetchClients().then(() => {
            fetchProjects();
        });

    }, []);

    // Guardar un nuevo proyecto
    const handleAddProject = () => {
        try {
            postProject(newProject);
            setProjects((prev) => [
                ...prev,
                { ...newProject, id: projects.length + 1, status: "Nuevo" }
            ]);
            setShowModal(false); // Cerrar el modal
            setNewProject({
                name: "",
                projectCode: "",
                email: "",
                address: {
                    street: "",
                    number: "",
                    postal: "",
                    city: "",
                    province: ""
                },
                code: "",
                clientId: "",
                logo: ""
            });

        } catch (error) {
            console.error("Error al crear el proyecto:", error);
        }
    };
    const fetchClients = async () => {
        try {
            const data = await getClients();
            setClients(data);

        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };


    return (
        <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
                <h1 className="text-xl font-semibold">Proyectos</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
                >
                    Añadir Proyecto
                </button>
            </div>
            {/* Content */}
            <main className="px-6 py-8">
                <div className="bg-white shadow rounded-lg p-8">
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Código</th>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Cliente</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Dirección</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Visualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project._id}>
                                    <td className="border px-4 py-2">{project.projectCode}</td>
                                    <td className="border px-4 py-2">{project.name}</td>
                                    <td className="border px-4 py-2">
                                        <Link href={`/dashboard/clientes/${project.clientId}?id=${project.clientId}`}>
                                            <p className="border px-4 py-2 text-blue-500 cursor-pointer hover:underline">
                                                Ver Cliente
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="border px-4 py-2">{project.email}</td>
                                    <td className="border px-4 py-2">
                                        {`${project.address.street} ${project.address.number}, ${project.address.postal}, ${project.address.city}, ${project.address.province}`}
                                    </td>
                                    <td className="border px-4 py-2">{project.status}</td>
                                    <td className="border px-4 py-2">
                                        <Link href={`/dashboard/proyectos/${project._id}?id=${project._id}`}>
                                            <p className="border px-4 py-2 text-blue-500 cursor-pointer hover:underline">
                                                Ver
                                            </p>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal para añadir proyecto */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Añadir Nuevo Proyecto</h2>
                        <form className="grid grid-cols-2 gap-6">
                            {/* Primera columna de inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newProject.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Código del Proyecto</label>
                                    <input
                                        type="text"
                                        name="projectCode"
                                        value={newProject.projectCode}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newProject.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Código Interno</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={newProject.code}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Segunda columna de inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">Calle</label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={newProject.address.street}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Número</label>
                                    <input
                                        type="number"
                                        name="address.number"
                                        value={newProject.address.number}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Código Postal</label>
                                    <input
                                        type="number"
                                        name="address.postal"
                                        value={newProject.address.postal}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Ciudad</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={newProject.address.city}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Provincia</label>
                                    <input
                                        type="text"
                                        name="address.province"
                                        value={newProject.address.province}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Cliente</label>
                                    <select
                                        name="clientId"
                                        value={newProject.clientId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="" disabled>Seleccione un cliente</option>
                                        {clients.map((cliente) => (
                                            <option key={cliente._id} value={cliente._id}>
                                                {cliente.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>

                        {/* Botones */}
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                onClick={handleAddProject}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
