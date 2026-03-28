"use client";

import Sidebar from "@/components/Sidebar";

export default function Protocolos() {
  return (
    <main className="flex h-screen bg-gray-900">
      
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        
        {/* HEADER */}
        <header className="bg-white px-8 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Meus Protocolos
          </h1>
        </header>

        {/* CONTEÚDO */}
        <div className="p-8">
          <p className="text-gray-700">
            Nesta seção você pode acompanhar o status dos seus protocolos, visualizar detalhes das solicitações e verificar o andamento dos serviços solicitados junto à prefeitura.
          </p>
        </div>

      </div>
    </main>
  );
}