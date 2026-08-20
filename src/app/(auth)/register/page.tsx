"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastrando:", { name, email, password });
    
    // Aqui você vai colocar a lógica para enviar os dados para sua API de registro
    // Exemplo: await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar
        </button>

      </form>
    </div>
  );
}