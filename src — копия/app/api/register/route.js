import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, password, first_name, last_name } = body;

    // 1. валидация
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Пользователь уже существует" },
        { status: 400 }
      );
    }

    // 3. хэшируем пароль
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. сохраняем пользователя
    await db.query(
      `
      INSERT INTO users (email, password_hash, role, first_name, last_name, phone)
      VALUES ($1, $2, 'client', $3, $4, $5)
      `,
      [email, passwordHash, first_name || "", last_name || "", phone]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
