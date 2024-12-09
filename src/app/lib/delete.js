'use server'
import { cookies } from "next/headers";
export default async function deleteUser() {
  const url = `https://bildy-rpmaya.koyeb.app/api/user/register`;
  const cookieStore = await cookies();
  const token = cookieStore.get('bytoken')?.value;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },

  });

  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data;
}
