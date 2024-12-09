"use server"
import { cookies } from "next/headers";

export default async function getClients(){
    const url = `https://bildy-rpmaya.koyeb.app/api/client`;
    const token = (await cookies()).get('bytoken')?.value;
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            },
            
        })
        if(!response.ok){
            throw new Error(`Failed to get clients: ${response.statusText}`);
        }
        
        const data = response.json()
        return data;
    }catch(error){
        console.error('Error getting clients:', error);
        throw error;
    }
}