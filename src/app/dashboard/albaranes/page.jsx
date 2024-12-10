'use client';
import { useState, useEffect } from 'react';
import getDeliveryNotes from '../../lib/getDeliveryNotes';
import getClients from '../../lib/getClients';
import getProjects from '../../lib/getProjects';
import postDeliveryNote from '@/app/lib/postDeliveryNote';
import Link from 'next/link';

export default function Home() {
    const [albaranes, setAlbaranes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        clientId: "",
        projectId: "",
        format: "",
        material: "",
        hours: 0,
        description: "",
        workdate: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDeliveryNote = async () => {
            try {
                const data = await getDeliveryNotes();
                setAlbaranes(data);
            } catch (error) {
                console.error('Error getting delivery notes:', error);
            }
        };
        fetchDeliveryNote();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.clientId) newErrors.clientId = "El cliente es obligatorio.";
        if (!formData.projectId) newErrors.projectId = "El proyecto es obligatorio.";
        if (!formData.format) newErrors.format = "El formato es obligatorio.";
        if (!formData.workdate) newErrors.workdate = "La fecha de trabajo es obligatoria.";
        if (formData.hours < 0) newErrors.hours = "Las horas no pueden ser negativas.";
        if (!formData.description) newErrors.description = "La descripción es obligatoria.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            postDeliveryNote(formData);
            setAlbaranes([...albaranes, formData]);
            setShowModal(false);
            setFormData({
                clientId: "",
                projectId: "",
                format: "",
                material: "",
                hours: 0,
                description: "",
                workdate: "",
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchClients = async () => {
        try {
            const data = await getClients();
            setClients(data);
        } catch (error) {
            console.error('Error getting clients:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error getting projects:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
                <h1 className="text-xl font-semibold">Albaranes</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
                >
                    Añadir Albarán
                </button>
            </div>

            {/* Tabla */}
            <main className="px-6 py-8">
                <div className="bg-white shadow rounded-lg p-8 ">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-700">
                                <th className="p-2 border">Cliente</th>
                                <th className="p-2 border">Proyecto</th>
                                <th className="p-2 border">Formato</th>
                                <th className="p-2 border">Material</th>
                                <th className="p-2 border">Horas</th>
                                <th className="p-2 border">Descripción</th>
                                <th className="p-2 border">Fecha de Trabajo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {albaranes.map((row, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">
                                        <Link href={`/dashboard/clientes/${row.clientId}?id=${row.clientId}`}>
                                            <p className="border px-4 py-2 text-blue-500 cursor-pointer hover:underline">
                                                Ver Cliente
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="p-2">{row.projectId.name || row.projectId}</td>
                                    <td className="p-2">{row.format}</td>
                                    <td className="p-2">{row.material}</td>
                                    <td className="p-2">{row.hours}</td>
                                    <td className="p-2">{row.description}</td>
                                    <td className="p-2">{row.workdate.split('-').reverse().join('/')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                            <h2 className="text-xl font-semibold mb-4">Añadir Albarán</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-gray-700 font-medium">Cliente</label>
                                    <select
                                        onClick={fetchClients}
                                        name="clientId"
                                        value={formData.clientId}
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
                                    {errors.clientId && (
                                        <p className="text-red-500 text-sm">{errors.clientId}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Proyecto</label>
                                    <select
                                        onClick={fetchProjects}
                                        name="projectId"
                                        value={formData.projectId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="" disabled>Seleccione un proyecto</option>
                                        {projects.map((project) => (
                                            <option key={project._id} value={project._id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.projectId && (
                                        <p className="text-red-500 text-sm">{errors.projectId}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">Formato</label>
                                    <select
                                        name="format"
                                        value={formData.format}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="material">Material</option>
                                        <option value="hours">Horas</option>
                                    </select>
                                    {errors.format && (
                                        <p className="text-red-500 text-sm">{errors.format}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={formData.material}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">Horas</label>
                                    <input
                                        type="number"
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        min="0"
                                    />
                                    {errors.hours && (
                                        <p className="text-red-500 text-sm">{errors.hours}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">Descripción</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        rows="3"
                                    ></textarea>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm">{errors.description}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">Fecha de Trabajo</label>
                                    <input
                                        type="date"
                                        name="workdate"
                                        value={formData.workdate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                    {errors.workdate && (
                                        <p className="text-red-500 text-sm">{errors.workdate}</p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
