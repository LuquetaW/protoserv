"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Informa a tipo de evento e preventDefault para não renderizar toda a tela
  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Tentando logar com:", { email, password });
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-500 p-4">
      <Logo />
      
      <div className="w-full max-w-sm flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
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

          <Button label="Acessar" type="submit" />
        </form>
      </div>
    </main>
  );
}
