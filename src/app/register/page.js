"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.target);

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.get("email"),
                phone: formData.get("phone"),
                password: formData.get("password"),
                first_name: formData.get("first_name"),
                last_name: formData.get("last_name"),
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Ошибка регистрации");
            return;
        }

        router.push("/login");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Регистрация</h1>

            <input name="email" type="email" placeholder="email" />
            <br />

            <input name="phone" type="phone" placeholder="phone" />
            <br />

            <input name="password" type="password" placeholder="password" />
            <br />

            <input name="first_name" placeholder="Имя" />
            <br />

            <input name="last_name" placeholder="Фамилия" />
            <br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}
