import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

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

export function Interactive3DTilt({ children, className = "", maxRotation = 0, scale = 1.0, showGlow = false }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxRotation}deg`, `${-maxRotation}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${-maxRotation}deg`, `${maxRotation}deg`]);

    const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        x.set((mouseXVal / width) - 0.5);
        y.set((mouseYVal / height) - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`group/tilt relative ${className}`}
        >
            {showGlow && (
                <motion.div
                    style={{
                        background: useMotionTemplate`radial-gradient(350px circle at ${glowX} ${glowY}, var(--accent-glow) 0%, transparent 80%)`,
                        transform: "translateZ(1px)",
                    }}
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
                />
            )}
            {children}
        </motion.div>
    );
}

