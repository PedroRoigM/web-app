'use server'
import { cookies } from "next/headers";


export default async function postDeliveryNote( dataForm ) {
    const url = "https://bildy-rpmaya.koyeb.app/api/deliverynote";
    const token = (await cookies()).get("bytoken")?.value;
    const body = JSON.stringify({
        clientId: dataForm.clientId,
        projectId: dataForm.projectId,
        format: dataForm.format,
        material: dataForm.material,
        hours: Number(dataForm.hours),
        description: dataForm.description,
        workdate: dataForm.workdate.split('-').reverse().join('/'),
    });
    
    console.log('body:', body);
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body : body,
        })
        if(!response.ok){
            throw new Error(`Failed to post delivery notes: ${response.statusText}`);
        }
        const data =  response.json();
        return data;
    }catch(error){
        console.error('Error postting delivery notes:', error);
        throw error;
    }
}