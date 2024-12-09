"use server"
import { cookies } from "next/headers";

export default async function getUser() {
    const url = `https://bildy-rpmaya.koyeb.app/api/user`;
    const token = (await cookies()).get('bytoken')?.value;
    if (!token) {
        return null;
    }
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },

        })
        if (!response.ok) {
            throw new Error(`Failed to get clients: ${response.statusText}`);
        }

        const data = response.json()
        return data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
}