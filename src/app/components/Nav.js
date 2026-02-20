"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
    motion,
    useScroll,
    AnimatePresence,
    useMotionValueEvent,
} from "framer-motion";

import { useRef, useState, useEffect } from "react";

const Nav = () => {
    const { data: session, status } = useSession();
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Функция для закрытия меню
    const handleClose = () => setMenuOpen(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const onKey = (e) => {
            if (e.key === "Escape") handleClose();
        };

        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Если меню открыто, не скрываем навигацию
        if (menuOpen) return;

        if (latest > lastScrollY.current && latest > 100) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        lastScrollY.current = latest;
    });

    return (
        <motion.nav
            animate={{ y: hidden ? "-120%" : "0%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
                position: "sticky",
                top: "1vw",
                marginLeft: "1.5vw",
                marginRight: "1.5vw",
                zIndex: 99,
            }}
        >
            <Link href="/" className="logo-cont" aria-label="logo_aria_label">
                <div className="logo">VORTEX</div>
                <div className="inner-nav">
                    {/* Твой SVG без изменений */}
                    <svg className="brave_with_ukraine" width="50" height="100%" viewBox="0 0 170 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="170" height="38" fill="#0E69BB"></rect>
                        <rect y="38" width="170" height="38" fill="#FFD801"></rect>
                        <path d="M44.152 21.014C..." fill="#FFD801"></path>
                        <path d="M21.6183 59.096H..." fill="#0E69BB"></path>
                    </svg>
                    <span data-translate="web_production">web production</span>
                </div>
            </Link>

            <div className="list-link">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/reviews">Reviews</Link>
                <Link href="/projects">Projects</Link>
                {session?.user.role === "admin" && (
                    <Link href="/admin" onClick={handleClose}>admin</Link>
                )}

                {session && (
                    <Link href="/dashboard" onClick={handleClose}>my page</Link>
                )}

                {!session && status !== "loading" && (
                    <>
                        <Link className="button red" href="/login" onClick={handleClose}>Войти</Link>
                        <Link className="button red" href="/register" onClick={handleClose}>Регистрация</Link>
                    </>
                )}

                {session && (
                    <button onClick={() => { signOut({ callbackUrl: "/" }); handleClose(); }} className="animated-button-m">
                        <span></span><span></span><span></span><span></span>
                        Log out
                    </button>
                )}
            </div>

            <button
                className="burger-btn"
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
            >
                ☰
            </button>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <div className="mobile-menu-cont">
                            <div className='mobile-menu-top'>
                                {/* Полностью сохраненный логотип внутри меню */}
                                <Link href="/" className="logo-cont" aria-label="logo_aria_label" onClick={handleClose}>
                                    <div className="logo">VORTEX</div>
                                    <div className="inner-nav">
                                        <svg className="brave_with_ukraine" width="50" height="100%" viewBox="0 0 170 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="170" height="38" fill="#0E69BB"></rect>
                                            <rect y="38" width="170" height="38" fill="#FFD801"></rect>
                                            <path d="M44.152 21.014C..." fill="#FFD801"></path>
                                            <path d="M21.6183 59.096H..." fill="#0E69BB"></path>
                                        </svg>
                                        <span data-translate="web_production">web production</span>
                                    </div>
                                </Link>
                                {/* РАБОЧАЯ КНОПКА ЗАКРЫТИЯ */}
                                <button type="button" className="close" onClick={handleClose}>
                                    <span></span><span></span>
                                </button>
                            </div>

                            <div className="mobile-menu-bottom">
                                <Link href="/" onClick={handleClose}>Home</Link>
                                <Link href="/about" onClick={handleClose}>About</Link>
                                <Link href="/reviews" onClick={handleClose}>Reviews</Link>
                                <Link href="/projects" onClick={handleClose}>Projects</Link>

                                {session?.user.role === "admin" && (
                                    <Link href="/admin" onClick={handleClose}>admin</Link>
                                )}

                                {session && (
                                    <Link href="/dashboard" onClick={handleClose}>my page</Link>
                                )}

                                {!session && status !== "loading" && (
                                    <>
                                        <Link className="button" href="/login" onClick={handleClose}>Войти</Link>
                                        <Link className="button" href="/register" onClick={handleClose}>Регистрация</Link>
                                    </>
                                )}

                                {session && (
                                    <button onClick={() => { signOut({ callbackUrl: "/" }); handleClose(); }} className="animated-button-m">
                                        <span></span><span></span><span></span><span></span>
                                        Log out
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Nav;