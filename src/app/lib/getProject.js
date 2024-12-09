'use server'
import { cookies } from "next/headers";
export default async function getProject(dataForm) {
    console.log(dataForm);
    const url = `https://bildy-rpmaya.koyeb.app/api/project/one/${dataForm.id}`;
    const cookieStore = await cookies();
    const token = cookieStore.get('bytoken')?.value;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },

        });

        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}