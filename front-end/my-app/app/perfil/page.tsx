"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Perfil() {

  // Estado de edição
  const [editando, setEditando] = useState(false);

  // Estado dos dados (simulando dados vindos do backend)
  const [usuario, setUsuario] = useState({
    nome: "Victor Gabriel",
    email: "victor@email.com",
    telefone: "(42) 99999-9999",
    senha: "123456"
  });

  // Atualizar campos
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Salvar (simulação)
  function handleSalvar() {
    console.log("Dados salvos:", usuario);
    setEditando(false);
  }

  // Cancelar edição
  function handleCancelar() {
    setEditando(false);
  }

  return (
    <main className="flex h-screen bg-gray-900">
      
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        
        {/* HEADER */}
        <header className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Meu Perfil
          </h1>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 flex items-center justify-center p-8">
          
          <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
            
            {/* TOPO PERFIL */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
                {usuario.nome.charAt(0)}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Informações do Usuário
                </h2>
                <p className="text-sm text-gray-500">
                  {editando 
                    ? "Edite seus dados abaixo"
                    : "Visualização dos seus dados"}
                </p>
              </div>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* NOME */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={usuario.nome}
                  onChange={handleChange}
                  readOnly={!editando}
                  className={`w-full border rounded-lg px-4 py-2 outline-none 
                  ${editando 
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500" 
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  readOnly={!editando}
                  className={`w-full border rounded-lg px-4 py-2 outline-none 
                  ${editando 
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500" 
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* TELEFONE */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={usuario.telefone}
                  onChange={handleChange}
                  readOnly={!editando}
                  className={`w-full border rounded-lg px-4 py-2 outline-none 
                  ${editando 
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500" 
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* SENHA */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={usuario.senha}
                  onChange={handleChange}
                  readOnly={!editando}
                  className={`w-full border rounded-lg px-4 py-2 outline-none 
                  ${editando 
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500" 
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>

            </div>

            {/* BOTÕES */}
            <div className="flex justify-end gap-4 mt-8">
              
              {editando && (
                <button
                  onClick={handleCancelar}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
              )}

              <button
                onClick={editando ? handleSalvar : () => setEditando(true)}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {editando ? "Salvar Alterações" : "Editar Perfil"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}