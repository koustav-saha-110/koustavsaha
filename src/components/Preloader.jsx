import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/resume";

export default function Preloader() {
    const [gone, setGone] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setGone(true), 1400);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {
                !gone && (
                    <motion.div initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-100 bg-(--bg) grid place-items-center" data-testid="preloader">
                        <div className="relative overflow-hidden">
                            <motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} exit={{ y: "-110%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="block font-serif italic text-6xl md:text-8xl tracking-tighter">{profile.firstName.toLowerCase()}<span className="text-(--accent)">.</span></motion.span>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
};
