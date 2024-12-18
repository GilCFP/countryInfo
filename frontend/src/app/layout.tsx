import "./globals.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="flex flex-col items-center p-6 bg-background">
          <h1 className="text-4xl font-bold mb-4">Country Info App</h1>
          <nav className="flex justify-center w-full">
            <Link href="/countries" className="text-blue-500 text-xl hover:text-blue-700 transition-colors">
              Home
            </Link>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="flex justify-center items-center p-4 bg-background">
          <p>© 2024 Country Info App</p>
        </footer>
      </body>
    </html>
  );
}