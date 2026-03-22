"use client";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // dados sinmulados
  const USER_LOGIN = "José da Silva";
  const [opcao, setOpcao] = useState("");

  return (
    <main className="flex flex-col h-screen bg-gray-500">
      
      {/* Barra de navegação principal */}
      <header className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-2">
        <div className="flex items-center justify-between mx-auto px-1">
          <Logo className="max-w-20 py-3" />

          {/* Links de navegação interna */}
          <nav className="flex items-center gap-6 text-gray-700">
            <Link href="/" className="font-semibold text-blue-600">Home</Link>
            <Link href="/servicos" className="hover:text-blue-600 transition">Serviços</Link>
            <Link href="/perfil" className="hover:text-blue-600 transition">Perfil</Link>
          </nav>

          {/* id e botão de logout */}
          <div className="flex flex-row items-center gap-4">
            <p className="text-gray-700 font-medium hidden sm:block">
              Olá, {USER_LOGIN}!
            </p>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition shadow-sm">
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* central */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        
        {/* container principal de toda interface do painel */}
        <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-2xl h-[80%] w-full max-w-3xl flex flex-col">
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Painel de Serviços
            </h1>
            <p className="text-gray-400 mb-8 border-b pb-5">
              Bem-vindo ao sistema Protoserv. Selecione uma ação abaixo para continuar.
            </p>

            <div className="flex flex-col bg-amber-500 w-full rounded-2xl p-8 text-amber-950 font-medium shadow-lg">
              <label className="mb-4 block text-lg font-bold">
                O que você deseja fazer?
              </label>

              {/* select de opções*/}
              <div className="relative w-full max-w-md">
                <select
                  value={opcao}
                  onChange={(e) => setOpcao(e.target.value)}
                  className="block w-full appearance-none bg-white border-none text-gray-700 py-4 px-6 pr-12 rounded-xl leading-tight focus:ring-4 focus:ring-amber-600/50 outline-none cursor-pointer shadow-sm font-bold transition-all"
                >
                  <option value="">Selecione uma opção...</option>
                  <option value="abrir">Abrir um protocolo</option>
                  <option value="acompanhar">Acompanhar protocolo aberto</option>
                  <option value="suporte">Pedido de suporte</option>
                </select>

                {/* Seta visual do select */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* botão de confirmação só aparece quando o usuário escolhe algo no select */}
              {opcao && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <Button
                    label="Confirmar Seleção"
                    className="mt-6 w-full max-w-md bg-amber-950 text-white py-4 rounded-xl font-bold hover:bg-black shadow-xl"
                    onClick={() => alert(`selecionado opção: ${opcao}`)}
                  />
                </div>
              )}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}