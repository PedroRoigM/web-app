'use server';

import { cookies } from "next/headers";

export default async function changeLogoInfo(dataForm) {
  const url = `https://bildy-rpmaya.koyeb.app/api/user/logo`;
  const token = await cookies().then(c => c.get('bytoken')?.value);
  const body = JSON.stringify({
    logo: dataForm.logo,
  });

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Failed to change logo: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error changing logo:', error);
    throw error;
  }
}