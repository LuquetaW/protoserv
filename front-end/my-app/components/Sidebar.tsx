"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const USER_LOGIN = "José da Silva";
  const pathname = usePathname(); // 🔥 pega rota atual

  const linkClass = (path: string) =>
    pathname === path
      ? "bg-blue-600 px-4 py-2 rounded-lg font-semibold"
      : "px-4 py-2 rounded-lg hover:bg-gray-700 transition";

  return (
    <aside className="w-64 bg-gray-800 flex flex-col p-6 text-white">
      
      <div className="mb-10">
        <Logo className="max-w-24" />
      </div>

      <nav className="flex flex-col gap-3">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        <Link href="/servicos" className={linkClass("/servicos")}>
          Serviços
        </Link>

        <Link href="/protocolos" className={linkClass("/protocolos")}>
          Protocolos
        </Link>

        <Link href="/perfil" className={linkClass("/perfil")}>
          Perfil
        </Link>
      </nav>

      <div className="mt-auto">
        <p className="text-gray-400 text-sm mb-2">{USER_LOGIN}</p>
        <button className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition">
          Sair
        </button>
      </div>
    </aside>
  );
}