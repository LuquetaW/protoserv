"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  // Função pra formatar o CPF (999.999.999-99)
  const handleCpfChange = (v: string) => {
    const rawValue = v.replace(/\D/g, "").slice(0, 11) // Trata deixando apenas nr
    const formatted = rawValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(formatted);
  };

  const handleRegister = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Dados do banco:", { name, email, cpf, password });
  };

  return (
    <main className= "flex flex-col items-center min-h-screen bg-gray-500 p-4">
      <Logo />

      <div className="w-full max-w-sm flex flex-col gap-6 bg-white! p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Cadastro
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={setName}
            required
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={setEmail}
            required
          />
          <Input
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            required
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            required
          />

          <Button label="Criar Conta" type="submit" />
        </form>

        <Link href={"/login"}>
          <Button 
            label="Já possuo uma conta"
          />
        </Link>
        
      </div>
    </main>
  );
}
