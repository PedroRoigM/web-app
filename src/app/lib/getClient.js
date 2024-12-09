'use server'
import { cookies } from "next/headers";

export default async function getClient(formData) {
    const url = `https://bildy-rpmaya.koyeb.app/api/client/${formData.id}`;
    const token = (await cookies()).get('bytoken')?.value;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return "Error getting client data";
        }
        console.log(response);
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}