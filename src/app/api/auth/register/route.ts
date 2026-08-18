// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema de validação de segurança
const userSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = userSchema.parse(body);

    // Verifica se o e-mail já existe (Regra de Negócio)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }

    // Criptografa a senha (Segurança/Zero Trust)
    const hashedPassword = await hash(password, 10);

    // Cria o usuário no banco
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Remove a senha do objeto de retorno por segurança
    const { password: _, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "Usuário criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}