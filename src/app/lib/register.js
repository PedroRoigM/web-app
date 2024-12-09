'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function registerUser(dataForm) {
  const url = `https://bildy-rpmaya.koyeb.app/api/user/register`;
  const body = JSON.stringify({
    email: dataForm.email,
    password: dataForm.password,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

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


export default async function handleRegistration(dataForm) {
  try {
    const user = await registerUser(dataForm);
    if (user && user.token) {
      (await cookies()).set({
        name: 'bytoken',
        value: user.token,
        path: '/',
      });
      redirect('/verification');
    }
    return null;
  } catch (error) {
    console.error('Error handling registration:', error);
    throw error;
  }
}