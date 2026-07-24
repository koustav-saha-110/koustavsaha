import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ArrowUpRight, Menu, X } from "lucide-react";
import { navSections, profile } from "../data/resume";
import { scrollToId } from "../hooks/useLenis";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Navbar({ theme, toggle }) {
    const ids = navSections.map((s) => s.id);
    const active = useActiveSection(ids);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 25);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-3 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl"
            data-testid="site-navbar"
        >
            {/* Floating Island Container */}
            <div
                className={`relative rounded-full border transition-all duration-500 px-4 md:px-6 py-2 flex items-center justify-between gap-3 md:gap-6 ${scrolled
                    ? "border-(--border) bg-(--surface)/85 backdrop-blur-2xl shadow-2xl shadow-black/10"
                    : "border-(--border)/60 bg-(--surface)/60 backdrop-blur-xl shadow-lg"
                    }`}
            >
                {/* Brand Logo */}
                <button
                    onClick={() => scrollToId("hero")}
                    className="flex items-center gap-2 group cursor-pointer shrink-0"
                    data-testid="nav-logo"
                >
                    <span className="font-serif-i text-xl leading-none">
                        {profile.firstName.toLowerCase()}
                        <span className="text-(--accent)">.</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse" />
                </button>

                {/* Desktop Pill Navigation Bar */}
                <nav className="hidden lg:flex items-center gap-1 bg-(--bg)/40 p-1 rounded-full border border-(--border)/40">
                    {navSections.map((s) => {
                        const isActive = active === s.id;

                        return (
                            <button
                                key={s.id}
                                onClick={() => scrollToId(s.id)}
                                className={`relative px-3.5 py-1.5 text-xs font-mono-jb tracking-wider uppercase transition-colors duration-300 z-10 ${isActive
                                    ? "text-white font-bold"
                                    : "text-zinc-400 hover:text-(--text-primary)"
                                    }`}
                                data-testid={`nav-${s.id}`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 rounded-full bg-(--accent) shadow-lg shadow-(--accent)/35 -z-10"
                                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                    />
                                )}
                                <span className="mr-1 text-[10px] opacity-70">{s.number}.</span>
                                {s.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Action Controls */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggle}
                        aria-label="Toggle theme"
                        className="w-8 h-8 md:w-9 md:h-9 grid place-items-center rounded-full border border-(--border) bg-(--bg)/40 hover:border-(--accent) hover:text-(--accent) transition-all duration-300"
                        data-testid="theme-toggle-btn"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={theme}
                                initial={{ rotate: -60, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 60, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                            </motion.span>
                        </AnimatePresence>
                    </button>

                    {/* Resume CTA Button */}
                    <a
                        href={profile.socials.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="group hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--accent) text-white text-[11px] font-mono-jb tracking-widest uppercase hover:bg-(--accent)/90 hover:shadow-lg hover:shadow-(--accent)/30 transition-all duration-300"
                        data-testid="nav-resume-btn"
                    >
                        <span>Resume</span>
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="lg:hidden w-8 h-8 md:w-9 md:h-9 grid place-items-center rounded-full border border-(--border) bg-(--bg)/40 text-(--text-primary)"
                        aria-label="Toggle mobile menu"
                        data-testid="mobile-menu-btn"
                    >
                        {open ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1.0 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden mt-3 p-4 rounded-3xl border border-(--border) bg-(--surface)/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-1.5"
                    >
                        {navSections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    scrollToId(s.id);
                                    setOpen(false);
                                }}
                                className={`flex items-center justify-between px-4 py-3 rounded-2xl font-mono-jb text-xs tracking-wider uppercase transition-colors ${active === s.id
                                    ? "bg-(--accent) text-white font-bold"
                                    : "text-zinc-400 hover:text-(--text-primary) hover:bg-(--bg)/50"
                                    }`}
                                data-testid={`mobile-nav-${s.id}`}
                            >
                                <span>{s.label}</span>
                                <span className="text-[10px] opacity-70">[{s.number}]</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
