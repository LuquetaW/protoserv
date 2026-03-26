"use client";

import Bot from "@/components/bot";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const USER_LOGIN = "José da Silva";

  const [abrir, setAbrir] = useState(false);
  const [suporte, setSuporte] = useState(false);

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

              {/* ABRIR PROTOCOLO */}
              <div
                onClick={() => {
                  setAbrir(!abrir);
                  setSuporte(false);
                }}
                className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <h3 className="text-lg font-bold mb-2">
                  Abrir Protocolo
                </h3>
                <p className="text-sm opacity-90">
                  Registrar uma nova solicitação
                </p>
              </div>

              {/* ACOMPANHAR */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
                <h3 className="text-lg font-bold mb-2">
                  Acompanhar
                </h3>
                <p className="text-gray-500 text-sm">
                  Ver andamento do seu protocolo
                </p>
              </div>

              {/* SUPORTE */}
              <div
                onClick={() => {
                  setSuporte(!suporte);
                  setAbrir(false);
                }}
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

            {/* FORMULÁRIO ABRIR PROTOCOLO */}
            {abrir && (
              <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-in fade-in slide-in-from-top-4">
                
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Novo Protocolo
                </h3>

                <div className="flex flex-col gap-4">

                  <input
                    type="text"
                    placeholder="Título do problema"
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <select className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Selecione o tipo de serviço</option>
                    <option>Iluminação</option>
                    <option>Coleta</option>
                    <option>Infraestrutura</option>
                  </select>

                  <textarea
                    placeholder="Descreva o problema..."
                    className="border border-gray-300 p-3 rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Enviar Protocolo
                  </button>

                </div>
              </div>
            )}

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