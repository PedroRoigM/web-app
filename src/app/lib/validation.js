'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
async function validateUser(code) {
  // Obtener el token de las cookies
  const token = await (await cookies()).get('bytoken')?.value;

  // Verificar si el token existe
  if (!token) {
    return { error: "Token not found" };
  }

  const url = `https://bildy-rpmaya.koyeb.app/api/user/validation`;

  const body = JSON.stringify({ code });
  try {
    // Realizar la solicitud PUT a la API
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agregar "Bearer" si es necesario
      },
      body: body,
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      return { error: "Invalid code or server error" };
    }

    // Obtener los datos de la respuesta
    const data = await response.json();

    // Retornar los datos recibidos
    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error:", error);
    return { error: "An error occurred while validating the user." };
  }
}
export default async function handleVerification(code){
  const user = await validateUser(code);
  if(user){
    redirect('/dashboard');
  }
}
