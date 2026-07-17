import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, GitBranch as Github, Link as Linkedin, Mail } from "lucide-react";
import { profile } from "../data/resume";
import { MaskLine } from "./Primitives";
import { scrollToId } from "../hooks/useLenis";
import { Link } from "react-router-dom";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section id="hero" ref={ref} className="relative min-h-svh flex flex-col justify-end pb-16 md:pb-24 overflow-hidden" data-testid="section-hero">
            <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
                <div className="absolute inset-0 opacity-[0.18] dark:opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBhYnN0cmFjdCUyMGRhcmt8ZW58MHx8fHwxNzg0MjY2MzgzfDA&ixlib=rb-4.1.0&q=85')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(2px)", }} />
                <div className="absolute inset-0 bg-linear-to-bfrom-transparent via-(--bg)/60 to-(--bg)" />
                <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full opacity-40" style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, transparent 60%)", }} />
            </motion.div>

            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-32">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="mb-10 flex items-center gap-4">
                    <span className="font-mono-jb text-[10px] tracking-[0.35em] uppercase text-(--accent)">[portfolio / {new Date().getFullYear()}]</span>
                    <span className="w-16 h-px bg-(--border)" />
                    <span className="font-mono-jb text-[10px] tracking-[0.35em] uppercase text-zinc-500">{profile.location}</span>
                </motion.div>

                <motion.h1 style={{ y: yTitle, opacity }} className="font-serif tracking-tighter leading-[0.92] text-[15vw] md:text-[11vw] lg:text-[10.5rem] font-normal">
                    <MaskLine delay={0.55} duration={1.15}><span className="italic">{profile.firstName}</span></MaskLine>
                    <MaskLine delay={0.7} duration={1.15}><span>{profile.lastName}<span className="text-(--accent)">.</span></span></MaskLine>
                </motion.h1>

                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                    <div className="md:col-span-7">
                        <MaskLine delay={1.05} duration={0.9}>
                            <p className="font-mono-jb text-xs md:text-sm tracking-[0.25em] uppercase text-zinc-400">{profile.headline}</p>
                        </MaskLine>
                        <motion.p initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mt-6 text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed"> {profile.subheading} </motion.p>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="md:col-span-5 flex flex-col items-start md:items-end gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5">
                            <span className="relative flex w-2 h-2">
                                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                                <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
                            </span>
                            <span className="font-mono-jb text-[10px] tracking-[0.2em] uppercase text-emerald-300"> {profile.status} </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button onClick={() => scrollToId("projects")} className="group relative inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-(--text-primary) text-(--bg) font-mono-jb text-[11px] tracking-widest uppercase hover:opacity-90 transition-opacity" data-testid="hero-view-projects-btn">
                                View Projects
                                <span className="w-7 h-7 grid place-items-center rounded-full bg-(--accent) text-white transition-transform duration-500 group-hover:rotate-45"><ArrowDown size={13} className="-rotate-45" /></span>
                            </button>
                            <button onClick={() => scrollToId("contact")} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-(--border) font-mono-jb text-[11px] tracking-widest uppercase hover:border-(--accent) hover:text-(--accent) transition-colors" data-testid="hero-contact-btn">Contact Me</button>
                        </div>
                        <div className="flex items-center gap-5 text-zinc-400">
                            <Link to={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-(--accent) transition-colors" data-testid="hero-github-link" aria-label="GitHub"><Github size={18} /></Link>
                            <Link to={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-(--accent) transition-colors" data-testid="hero-linkedin-link" aria-label="LinkedIn"><Linkedin size={18} /></Link>
                            <Link to={profile.socials.email} className="hover:text-(--accent) transition-colors" data-testid="hero-email-link" aria-label="Email"><Mail size={18} /></Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.8 }} className="mt-16 md:mt-24 pt-6 border-t border-(--border)/60 flex flex-wrap items-center justify-between gap-4 font-mono-jb text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                    <span>Scroll to explore</span>
                    <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="text-(--accent)"> ↓ </motion.span>
                    <span>MERN · React Native · Node · Mongo</span>
                </motion.div>
            </div>
        </section>
    );
};
