'use server'
import { cookies } from "next/headers";

export default async function getProjects( dataForm ) {
    const url = "https://bildy-rpmaya.koyeb.app/api/project";
    const token = (await cookies()).get("bytoken")?.value;
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        if(!response.ok){
            throw new Error(`Failed to get projects: ${response.statusText}`);
        }
        const data =  response.json();
        return data;
    }catch(error){
        console.error('Error getting projects:', error);
        throw error;
    }
}