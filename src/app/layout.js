import "@/app/globals.css";

export const metadata = {
  title: "My App",
  description: "Description of my app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
