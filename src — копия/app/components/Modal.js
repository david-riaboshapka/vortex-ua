'use client'
import { z } from "zod";
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { sendRequest } from "@/app/dashboard/action";
import { useModalStore } from '@/store/useModalStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal() {
    const formRef = useRef(null);
    const { isOpen, closeModal } = useModalStore();
    const { data: session } = useSession();
    const [errors, setErrors] = useState({});

    const schema = useMemo(() =>
        z.object({
            title: z.string()
                .min(1, "Title is required")
                .max(20, "Title must be 20 characters or less"),
            budget: z.string()
                .regex(/^\d+$/, "Budget must contain only digits")
                .max(10, "Budget is too large (max 10 digits)"),
            description: z.string()
                .min(5, "Description must be at least 5 characters")
                .max(200, "Description must be 200 characters or less"),
            telegram: z.string().optional(),
            phone: z.string().optional(),
            mail: z.string().email("Please enter a valid email address").optional(),
        }).superRefine((data, ctx) => {
            if (!session) {
                if (!data.telegram) {
                    ctx.addIssue({
                        path: ["telegram"],
                        message: "Telegram is required for guests"
                    });
                }
                if (!data.phone) {
                    ctx.addIssue({
                        path: ["phone"],
                        message: "Phone number is required for guests"
                    });
                }
                if (!data.mail) {
                    ctx.addIssue({
                        path: ["mail"],
                        message: "Email is required for guests"
                    });
                }
            }
        }),
        [session]
    );



    async function handleAction(formData) {
        // 1. Собираем данные в чистый объект
        const rawData = Object.fromEntries(formData);

        // 2. Запускаем валидацию
        const result = schema.safeParse(rawData);

        // 3. ПРОВЕРКА: Если валидация не прошла — ПРЕРЫВАЕМ функцию
        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            console.table(formattedErrors); // Выведет красивую таблицу ошибок в консоль
            setErrors(formattedErrors);
            return; // СТРОГО: дальше код не пойдет, окно не закроется
        }

        // 4. Если мы здесь, значит ошибок НЕТ
        setErrors({});

        try {
            console.log("Отправка на сервер:", result.data);
            await sendRequest(result.data);
            formRef.current?.reset();
            closeModal();
        } catch (e) {
            console.error("Ошибка сервера:", e);
        }
    }

    // Блокировка скролла
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Чистим при размонтировании
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]); // Оставляем ТОЛЬКО isOpen

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    // Добавляем анимацию для самого фона
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={closeModal}
                >
                    <motion.div
                        className="modal"
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <form ref={formRef} action={handleAction}>
                            <h3>Contact <span>us</span></h3>
                            <button type="button" className="close" onClick={closeModal}>
                                <span />
                                <span />
                            </button>

                            <input name='title' placeholder="Project name" required />
                            {errors.title && <p className="error">{errors.title[0]}</p>}
                            <input name='budget' placeholder="Budget" required />
                            {errors.budget && <p className="error">{errors.budget[0]}</p>}
                            <textarea
                                name="description"
                                placeholder="Project description"
                                required
                                rows="4"
                            />
                            {errors.description && <p className="error">{errors.description[0]}</p>}

                            {!session && (
                                <>
                                    <input name='telegram' placeholder="Telegram" required />
                                    {errors.telegram && <p className="error">{errors.telegram[0]}</p>}

                                    <input name='phone' placeholder="Phone" required />
                                    {errors.phone && <p className="error">{errors.phone[0]}</p>}

                                    <input name='mail' placeholder="Mail" required />
                                    {errors.mail && <p className="error">{errors.mail[0]}</p>}
                                </>
                            )}

                            <button className="red" type="submit">Send</button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}