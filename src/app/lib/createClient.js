"use server"

import { cookies } from "next/headers";
export default async function createClient(userForm) {
    const url = `https://bildy-rpmaya.koyeb.app/api/client`;
    const token = (await cookies()).get('bytoken')?.value;
    const body = JSON.stringify({
        name: userForm.name,
        cif: userForm.cif,
        address: {
            street: userForm.address.street,
            number: userForm.address.number,
            postal: userForm.address.postal,
            city: userForm.address.city,
            province: userForm.address.province
        },
        logo: userForm.logo,
    });
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body,
        })

        if (!response.ok) {
            throw new Error(`Error al crear usuario: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Cliente creado con éxito:", data);

        return data; // Retornar datos de la respuesta si se requiere
    } catch (error) {
        console.error("Error al crear el usuario.")
        throw error;

    }
}