"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
