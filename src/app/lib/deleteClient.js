'use server';
import { cookies } from "next/headers";
export default async function deleteClient(dataForm) {
    const url = `https://bildy-rpmaya.koyeb.app/api/client/${dataForm}`;
    const cookieStore = await cookies();
    const token = cookieStore.get('bytoken')?.value;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },

        });
        console.log(response);
        if (!response.ok) {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}