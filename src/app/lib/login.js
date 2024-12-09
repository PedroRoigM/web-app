'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loginUser(dataForm) {
  const url = `https://bildy-rpmaya.koyeb.app/api/user/login`;
  const body = JSON.stringify({
    email: dataForm.email,
    password: dataForm.password,
  });
  console.log(body)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to login user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}


export default async function handleLogin(dataForm) {
  try {
    const user = await loginUser(dataForm);
    if (user && user.token) {
      (await cookies()).set({
        name: 'bytoken',
        value: user.token,
        path: '/',
      });
      redirect('/dashboard');
    }
    return null;
  } catch (error) {
    console.error('Error handling registration:', error);
    throw error;
  }
}