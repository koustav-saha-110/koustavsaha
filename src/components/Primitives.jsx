import { motion } from "framer-motion";

export function ChapterMarker({ number, label }) {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-4 mb-16 md:mb-20" data-testid={`chapter-marker-${label.toLowerCase()}`}>
            <span className="font-mono-jb text-xs tracking-[0.3em] text-(--accent)">[{number}]</span>
            <span className="font-mono-jb text-xs tracking-[0.3em] uppercase text-zinc-500">{label}</span>
            <span className="flex-1 h-px bg-(--border)" />
        </motion.div>
    );
};

export function MaskLine({ children, delay = 0, duration = 1.1 }) {
    return (
        <span className="mask-line">
            <motion.span className="mask-inner" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}>{children}</motion.span>
        </span>
    );
};

export function Reveal({ children, delay = 0, y = 30, className = "" }) {
    return (
        <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>{children}</motion.div>
    );
};
