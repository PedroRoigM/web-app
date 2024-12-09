'use server';

import { cookies } from "next/headers";

export default async function changeUserInfo(dataForm) {
  const url = `https://bildy-rpmaya.koyeb.app/api/user/register`;
  const token = await cookies().then(c => c.get('bytoken')?.value);
  const body = JSON.stringify({
    email: dataForm.email,
    name: dataForm.name,
    surnames: dataForm.surnames,
    nif: dataForm.nif,
    logo: dataForm.logo,
    address: dataForm.address
  });
  console.log(body)
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: body,
    });
    console.log(`Response: ${response}`)
    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}