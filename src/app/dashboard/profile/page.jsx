'use client';
import getUser from "@/app/lib/getUser";
import { useEffect, useState } from "react";
import changeUserInfo from "@/app/lib/changeUserInfo";
import changeLogoInfo from "@/app/lib/changeLogoInfo";
import LoadingScreen from "../components/Loading";
export default function Profile() {
    const [hasUser, setHasUser] = useState(false);
    const [user, setUser] = useState({});
    const [change, setChange] = useState(false);
    const [changeLogo, setChangeLogo] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        role: "",
        logo: "",
        name: "",
        surnames: "",
        nif: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            setUser(userData);
            setHasUser(true);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (hasUser) {
            setFormData({
                email: user.email || "",
                role: user.role || "",
                logo: user.logo || "",
                name: user.name || "",
                surnames: user.surnames || "",
                nif: user.nif || "",
                logo: user.logo || "",
            });
        }
    }, [hasUser, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await changeUserInfo(formData);
        setChange(false);
    };

    const handleLogoSubmit = async () => {
        await changeUserInfo(formData);
        setChangeLogo(false);
    };

    return (
        <div className="flex flex-col items-center w-full p-6 space-y-6 border rounded-lg shadow-lg  h-full">
            {hasUser ? (
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                    {/* Imagen del usuario */}
                    <div
                        className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-6 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => setChangeLogo(true)}
                    >
                        {user.logo ? (
                            <img
                                src={user.logo}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-500 font-bold text-lg">N/A</span>
                        )}
                    </div>

                    {/* Información del usuario */}
                    <div className="text-center space-y-2">
                        {/* Nombre */}
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {user.name || "Nombre de usuario"}
                        </h1>

                        {/* Correo electrónico */}
                        <p className="text-gray-600">
                            <span className="font-medium">Correo: </span>
                            {user.email || "Sin correo electrónico"}
                        </p>

                        {/* Rol */}
                        <p className="text-gray-600">
                            <span className="font-medium">Rol: </span>
                            {user.role || "Sin rol asignado"}
                        </p>

                        {/* NIF */}
                        <p className="text-gray-600">
                            <span className="font-medium">NIF: </span>
                            {user.nif || "Sin NIF"}
                        </p>
                    </div>

                    {/* Botón de edición */}
                    <div className="mt-6">
                        <button
                            onClick={() => setChange(true)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Editar Información
                        </button>
                    </div>
                </div>

            ) : (
                <LoadingScreen />
            )}



            {/* Modal para cambiar la imagen (logo) */}
            {
                changeLogo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Cambiar Imagen</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Nuevo Logo (URL)</label>
                                    <input
                                        type="text"
                                        name="logo"
                                        value={formData.logo}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setChangeLogo(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        onClick={handleLogoSubmit}
                                    >
                                        Guardar Logo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>)

            }

            {/* Modal para cambiar la información personal */}
            {
                change && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Editar Parámetros</h2>
                            <form className="space-y-4">
                                {/* Campos de formulario */}
                                <div>
                                    <label className="block text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Apellidos</label>
                                    <input
                                        type="text"
                                        name="surnames"
                                        value={formData.surnames}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Rol</label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">NIF</label>
                                    <input
                                        type="text"
                                        name="nif"
                                        value={formData.nif}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                {/* Botones de cancelar y guardar */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setChange(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        onClick={handleSubmit}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
