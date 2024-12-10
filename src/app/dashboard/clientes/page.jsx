'use client';
import createClient from "../../lib/createClient";
import getClients from "../../lib/getClients";
import { useState, useEffect } from "react";
import Link from "next/link";
import deleteClient from "@/app/lib/deleteClient";

export default function Page() {
    const [isCreating, setIsCreating] = useState(false); // Controla si se muestra el formulario
    const [clients, setClients] = useState([]);
    const [clientData, setClientData] = useState({
        name: "",
        cif: "",
        logo: "",
        address: {
            street: "",
            number: "",
            postal: "",
            city: "",
            province: ""
        }
    });
    const [errors, setErrors] = useState({}); // Estado para errores

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        fetchClients();
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!clientData.name) newErrors.name = "El nombre es obligatorio.";
        if (!clientData.cif) newErrors.cif = "El CIF es obligatorio.";
        if (clientData.logo && !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/.test(clientData.logo)) {
            newErrors.logo = "El logo debe ser una URL válida.";
        }
        if (!clientData.address.street) newErrors["address.street"] = "La calle es obligatoria.";
        if (!clientData.address.number) newErrors["address.number"] = "El número es obligatorio.";
        if (!clientData.address.postal) newErrors["address.postal"] = "El código postal es obligatorio.";
        if (!clientData.address.city) newErrors["address.city"] = "La ciudad es obligatoria.";
        if (!clientData.address.province) newErrors["address.province"] = "La provincia es obligatoria.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [field, subfield] = name.split('.');
        if (subfield) {
            setClientData((prevData) => ({
                ...prevData,
                [field]: {
                    ...prevData[field],
                    [subfield]: value,
                },
            }));
        } else {
            setClientData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Limpia el error del campo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        try {
            const user = await createClient(clientData);

            setClients((prevClients) => [...prevClients, user]);

            setIsCreating(false);
        } catch (error) {
            console.error("Error al crear el cliente:", error);
        }
    };

    return (
        <div className="flex-1">
            <main className="px-6 py-8">
                {!isCreating ? (
                    <>
                        {clients.length > 0 ? (
                            <div className="bg-white shadow rounded-lg p-8">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                                    Lista de Clientes
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {clients.map((client, index) => (
                                        <li
                                            key={index}
                                            className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col justify-between"
                                        >
                                            <div className="flex items-center mb-4 space-x-4">
                                                {client.logo ? (
                                                    <img
                                                        src={client.logo}
                                                        alt={`${client.name} Logo`}
                                                        className="h-12 w-12 rounded-full border border-gray-300"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                                                        {client.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <h3 className="text-lg font-medium text-gray-700">
                                                    {client.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4">
                                                <span className="font-semibold">CIF:</span> {client.cif}
                                                <br />
                                                <span className="font-semibold">Dirección:</span>{" "}
                                                {client.address.street}, Nº {client.address.number},{" "}
                                                {client.address.city}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <Link
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                    href={`/dashboard/clientes/${client._id}?id=${client._id}`}
                                                >
                                                    Ver Detalles
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={async () => {
                                                        deleteClient(client._id);
                                                        setClients(clients.filter((c) => c._id !== client._id));
                                                    }}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 text-right">
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        + Agregar Cliente
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <div className="bg-white shadow rounded-lg p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="mb-4">
                                        <div className="w-16 h-16 bg-blue-100 text-blue-500 mx-auto rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold">📂</span>
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                        Crea tu primer Cliente
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Para poder generar Albaranes digitales
                                    </p>
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        + Crear Cliente
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Datos del Cliente
                        </h2>
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={clientData.name}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name}</p>
                                )}
                            </div>
                            {/* CIF */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    CIF
                                </label>
                                <input
                                    type="text"
                                    name="cif"
                                    value={clientData.cif}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                {errors.cif && (
                                    <p className="text-red-500 text-sm">{errors.cif}</p>
                                )}
                            </div>
                            {/* Logo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Logo (URL de la imagen)
                                </label>
                                <input
                                    type="url"
                                    name="logo"
                                    placeholder="https://example.com/logo.png"
                                    value={clientData.logo}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                />
                                {errors.logo && (
                                    <p className="text-red-500 text-sm">{errors.logo}</p>
                                )}
                            </div>
                            {/* Address Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Dirección
                                </label>
                                <div className="grid grid-cols-2 gap-4 mt-1">
                                    {/* Calle */}
                                    <div>
                                        <input
                                            type="text"
                                            name="address.street"
                                            placeholder="Calle"
                                            value={clientData.address.street}
                                            onChange={handleInputChange}
                                            className="p-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                        {errors["address.street"] && (
                                            <p className="text-red-500 text-sm">{errors["address.street"]}</p>
                                        )}
                                    </div>
                                    {/* Número */}
                                    <div>
                                        <input
                                            type="number"
                                            name="address.number"
                                            placeholder="Número"
                                            value={clientData.address.number}
                                            onChange={handleInputChange}
                                            className="p-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                        {errors["address.number"] && (
                                            <p className="text-red-500 text-sm">{errors["address.number"]}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {/* Código Postal */}
                                    <div>
                                        <input
                                            type="number"
                                            name="address.postal"
                                            placeholder="Código Postal"
                                            value={clientData.address.postal}
                                            onChange={handleInputChange}
                                            className="p-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                        {errors["address.postal"] && (
                                            <p className="text-red-500 text-sm">{errors["address.postal"]}</p>
                                        )}
                                    </div>
                                    {/* Ciudad */}
                                    <div>
                                        <input
                                            type="text"
                                            name="address.city"
                                            placeholder="Ciudad"
                                            value={clientData.address.city}
                                            onChange={handleInputChange}
                                            className="p-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                        {errors["address.city"] && (
                                            <p className="text-red-500 text-sm">{errors["address.city"]}</p>
                                        )}
                                    </div>
                                    {/* Provincia */}
                                    <div>
                                        <input
                                            type="text"
                                            name="address.province"
                                            placeholder="Provincia"
                                            value={clientData.address.province}
                                            onChange={handleInputChange}
                                            className="p-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                        {errors["address.province"] && (
                                            <p className="text-red-500 text-sm">{errors["address.province"]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>

                )}
            </main>
        </div>
    );
}
