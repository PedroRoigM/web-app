import { NextResponse } from 'next/server';

export default function middleware(request) {
  console.log('Middleware ejecutado');

  // Obtener el token desde las cookies de la solicitud
  const token = request.cookies.get('token');
  console.log('Token:', token);

  // Si el token existe y la ruta no es /dashboard, /validation ni /register
  if (token && !request.nextUrl.pathname.startsWith('/dashboard') &&
    !request.nextUrl.pathname.startsWith('/validation') &&
    !request.nextUrl.pathname.startsWith('/register')) {
    console.log('Redirigiendo al dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));  // Redirigir a /dashboard
  }

  // Si no hay token y la ruta es /dashboard, redirigir a la página de inicio
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Redirigiendo a la página de inicio');
    return NextResponse.redirect(new URL('/', request.url));  // Redirigir a la página principal
  }

  console.log('Continuando con la solicitud normal');
  return NextResponse.next();  // Continuar con la solicitud sin redirección
}

// Configuración del matcher para aplicar el middleware a todas las rutas, excepto a archivos estáticos
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],  // No aplicar a estos recursos
};
