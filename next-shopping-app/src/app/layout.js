import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shop Admin",
  description: "admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Navigation />
        <main className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}