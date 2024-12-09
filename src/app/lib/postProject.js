'use server';
import { cookies } from 'next/headers';

export default async function postProject(dataForm) {
    const url = 'https://bildy-rpmaya.koyeb.app/api/project';
    const token = (await cookies()).get('bytoken')?.value;
    const body = JSON.stringify({
        name: dataForm.name,
        projectCode: dataForm.projectCode,
        email: dataForm.email,
        address: {
            street: dataForm.address.street,
            number: Number(dataForm.address.number),
            postal: Number(dataForm.address.postal),
            city: dataForm.address.city,
            province: dataForm.address.province
        },
        code: dataForm.code,
        clientId: dataForm.clientId,
        status: "Nuevo",
    });
    console.log('body:', body);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: body,
        })
        if (!response.ok) {
            throw new Error(`Failed to create project: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}