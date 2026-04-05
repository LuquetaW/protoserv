"use client";

import Bot from "@/components/bot";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; //  ADICIONADO

export default function Home() {
  const USER_LOGIN = "José da Silva";

  const [suporte, setSuporte] = useState(false);
  const router = useRouter(); //  ADICIONADO

  return (
    <main className="flex h-screen bg-gray-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 flex flex-col p-6 text-white">
        <div className="mb-10">
          <Logo className="max-w-24" />
        </div>

        <nav className="flex flex-col gap-3">
          <Link href="/" className="bg-blue-600 px-4 py-2 rounded-lg font-semibold">
            Home
          </Link>
          <Link href="/servicos" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Serviços
          </Link>
          <Link href="/protocolos" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Protocolos
          </Link>
          <Link href="/perfil" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
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

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col bg-gray-100">
        
        {/* HEADER */}
        <header className="bg-white px-8 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Painel de Serviços
          </h1>
        </header>

        {/* CONTEÚDO CENTRAL */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          
          <div className="w-full max-w-5xl">
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              O que você deseja fazer?
            </h2>

            <p className="text-gray-600 mb-8">
              Escolha uma das opções abaixo para continuar
            </p>

            <div className="grid grid-cols-3 gap-6">

              {/*  SOLICITAR SERVIÇO */}
              <div
                onClick={() => router.push("/servicos")}
                className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <h3 className="text-lg font-bold mb-2">
                  Solicitar Serviço
                </h3>
                <p className="text-sm opacity-90">
                  Escolher e registrar uma solicitação
                </p>
              </div>

              {/* ACOMPANHAR */}
              <div
                onClick={() => router.push("/protocolos")}
                className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
                <h3 className="text-lg font-bold mb-2">
                  Acompanhar
                </h3>
                <p className="text-sm opacity-90">
                  Ver andamento do seu protocolo
                </p>
              </div>
              {/* SUPORTE */}
              <div
                onClick={() => setSuporte(!suporte)}
                className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <h3 className="text-lg font-bold mb-2">
                  Suporte
                </h3>
                <p className="text-gray-500 text-sm">
                  Solicitar ajuda ou atendimento
                </p>
              </div>

            </div>

            {/* BOT DE SUPORTE */}
            {suporte && (
              <div className="mt-8">
                <Bot />
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}