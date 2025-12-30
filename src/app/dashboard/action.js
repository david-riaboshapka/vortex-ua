"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function sendToTelegram(text) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    throw new Error("Ошибка отправки в Telegram");
  }
}

export async function sendRequest(formData) {
  const session = await getServerSession(authOptions);

  const title = formData.get("title");
  const description = formData.get("description");
  const budget = formData.get("budget");

  const phone = formData.get("phone");
  const mail = formData.get("mail");
  const telegram = formData.get("telegram");

  if (!title || !description) {
    throw new Error("Заполните обязательные поля");
  }

  // 🔹 АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ → БД
  if (session) {
    await db.query(
      `INSERT INTO project_requests (user_id, title, description, budget)
       VALUES ($1, $2, $3, $4)`,
      [session.user.id, title, description, budget || null]
    );

    revalidatePath("/dashboard");
    return;
  }

  // 🔹 ГОСТЬ → TELEGRAM BOT
  if (!phone || !mail) {
    throw new Error("Введите телефон и email");
  }

  const message = `
🆕 Заявка с сайта

📌 Проект: ${title}
📝 Описание: ${description}
💰 Бюджет: ${budget || "не указан"}

📞 Телефон: ${phone}
📧 Email: ${mail}
📧 telegram: ${telegram}
  `;

  await sendToTelegram(message);
}
