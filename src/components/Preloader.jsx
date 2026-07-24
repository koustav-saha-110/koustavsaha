import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/resume";
import { stopLenis, startLenis } from "../hooks/useLenis";

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [gone, setGone] = useState(false);
    const [statusText, setStatusText] = useState("INITIALIZING_3D_ENGINE");

    useEffect(() => {
        if (!gone) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            stopLenis();
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            startLenis();
            if (onComplete) onComplete();
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            startLenis();
        };
    }, [gone, onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setGone(true), 400);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 8) + 4;
                const next = Math.min(prev + increment, 100);

                if (next < 30) {
                    setStatusText("INITIALIZING_3D_ENGINE");
                } else if (next < 65) {
                    setStatusText("COMPILING_GLSL_SHADERS");
                } else if (next < 95) {
                    setStatusText("PRELOADING_CANVAS_MODELS");
                } else {
                    setStatusText("SYSTEM_READY");
                }

                return next;
            });
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {!gone && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-(--bg) text-(--text-primary) flex flex-col justify-between p-8 md:p-16 select-none"
                    data-testid="preloader"
                >
                    <div className="flex items-center justify-between font-mono-jb text-[10px] md:text-xs tracking-widest uppercase text-zinc-500">
                        <span>[3D_SYSTEM_PRELOADER]</span>
                        <span className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${progress === 100 ? "bg-emerald-400" : "bg-(--accent) animate-pulse"}`} />
                            {progress === 100 ? "[STATUS: READY]" : "[STATUS: COMPILING_SHADERS]"}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
                        <div className="relative overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="font-serif italic text-6xl md:text-9xl tracking-tighter"
                            >
                                {profile.firstName.toLowerCase()}
                                <span className="text-(--accent)">.</span>
                            </motion.h1>
                        </div>
                        <div className="font-mono-jb text-xs md:text-sm tracking-widest uppercase text-(--accent) pt-2">
                            {statusText}
                        </div>
                    </div>

                    <div className="space-y-4 max-w-xl mx-auto w-full">
                        <div className="flex items-center justify-between font-mono-jb text-xs tracking-widest text-zinc-400">
                            <span>LOADING_MODELS</span>
                            <span className="text-(--text-primary) font-bold">{progress}%</span>
                        </div>

                        <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
                            <div
                                className="h-full bg-(--accent) rounded-full transition-all duration-150 ease-out shadow-lg shadow-(--accent)/50"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between font-mono-jb text-[9px] md:text-[10px] tracking-widest uppercase text-zinc-500 pt-1">
                            <span>[ENGINE: R3F / THREE.JS]</span>
                            <span>[SHADERS: GLSL_OPTIMIZED]</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
