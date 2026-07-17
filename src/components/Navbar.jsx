import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import { navSections, profile } from "../data/resume";
import { scrollToId } from "../hooks/useLenis";
import { useActiveSection } from "../hooks/useActiveSection";
import { Link } from "react-router-dom";

export default function Navbar({ theme, toggle }) {
    const ids = navSections.map((s) => s.id);
    const active = useActiveSection(ids);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-(--bg)/70 border-b border-(--border)/60" : "bg-transparent"}`} data-testid="site-navbar">
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                <button onClick={() => scrollToId("hero")} className="flex items-center gap-2 group" data-testid="nav-logo">
                    <span className="font-serif-i text-2xl leading-none">{profile.firstName.toLowerCase()}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-(--accent)" />
                </button>

                <nav className="hidden lg:flex items-center gap-1">
                    {
                        navSections.map((s) => (
                            <button key={s.id} onClick={() => scrollToId(s.id)} className="relative px-4 py-2 text-xs font-mono-jb tracking-widest uppercase text-zinc-400 hover:text-(--text-primary) transition-colors" data-testid={`nav-${s.id}`}>
                                <span className="text-(--accent) mr-1.5 text-[10px]">{s.number}</span>
                                {s.label}
                                {
                                    active === s.id && (
                                        <motion.span layoutId="active-nav" className="absolute inset-x-2 -bottom-0.5 h-px bg-(--accent)" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                                    )
                                }
                            </button>
                        ))
                    }
                </nav>

                <div className="flex items-center gap-2">
                    <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 grid place-items-center rounded-full border border-(--border) hover:border-(--accent)/60 hover:text-(--accent) transition-colors" data-testid="theme-toggle-btn">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span key={theme} initial={{ rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 60, opacity: 0 }} transition={{ duration: 0.35 }}>{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}</motion.span>
                        </AnimatePresence>
                    </button>

                    <Link to={profile.socials.resume} target="_blank" rel="noreferrer" className="group hidden sm:inline-flex items-center gap-2 pl-4 pr-3 py-2 text-xs font-mono-jb tracking-widest uppercase rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-colors" data-testid="nav-resume-btn">
                        Resume
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    <button onClick={() => setOpen((o) => !o)} className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-(--border)" aria-label="Menu" data-testid="mobile-menu-btn">
                        <div className="space-y-1">
                            <div className={`w-4 h-px bg-current transition-transform ${open ? "translate-y-0.5 rotate-45" : ""}`} />
                            <div className={`w-4 h-px bg-current transition-transform ${open ? "-translate-y-0.5 -rotate-45" : ""}`} />
                        </div>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {
                    open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="lg:hidden overflow-hidden border-t border-(--border)/60 backdrop-blur-xl bg-(--bg)/90">
                            <div className="px-6 py-6 flex flex-col gap-1">
                                {
                                    navSections.map((s) => (
                                        <button key={s.id} onClick={() => { scrollToId(s.id); setOpen(false) }} className="flex items-center justify-between py-3 border-b border-(--border)/50 text-left" data-testid={`mobile-nav-${s.id}`}>
                                            <span className="font-serif-i text-2xl">{s.label}</span>
                                            <span className="font-mono-jb text-[10px] text-(--accent) tracking-widest">{s.number}</span>
                                        </button>
                                    ))}
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.header>
    );
};
