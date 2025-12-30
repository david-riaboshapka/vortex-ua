"use client";

import { sendRequest } from "@/app/dashboard/action";
import { useRef } from "react";

export default function ProjectForm() {
  const formRef = useRef(null);

  async function handleAction(formData) {
    await sendRequest(formData);
    formRef.current?.reset(); // Очищаем форму после успешной отправки
  }

  return (
    <form ref={formRef} action={handleAction}>
      <input name="title" placeholder="название проекта" required />
      <input name="description" placeholder="описание проекта" required />
      <input name="budget" placeholder="бюджет" />
      <button type="submit">Отправить</button>
    </form>
  );
}