import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Currículos",
  description: "Gerencie currículos de forma simples e eficiente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.className} flex flex-col min-h-screen bg-purple-50`}>
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full p-6">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}