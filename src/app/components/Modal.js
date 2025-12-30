'use client'
import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { sendRequest } from "@/app/dashboard/action";
import { useModalStore } from '@/store/useModalStore';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Импортируем

export default function Modal() {
    const formRef = useRef(null);
    const { isOpen, closeModal } = useModalStore();
    const { data: session } = useSession();

    async function handleAction(formData) {
        try {
            await sendRequest(formData);
            formRef.current?.reset();
            closeModal(); // Закрываем после успеха
        } catch (e) {
            console.error(e);
        }
    }

    // Блокировка скролла
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
                            <input name='budget' placeholder="Budget" required />
                            <textarea 
                            name="description" 
                            placeholder="Project description" 
                            required 
                            rows="4" 
                            />
                            {/* <input type='textarea' name='description' placeholder="Project description" required /> */}

                            {!session && (
                                <>
                                    <input name='telegram' placeholder="Telegram" required />
                                    <input name='phone' placeholder="Phone" required />
                                    <input name='mail' placeholder="Mail" required />
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