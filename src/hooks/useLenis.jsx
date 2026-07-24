import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export function useLenis() {
    useEffect(() => {
        lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
        });

        function raf(time) {
            lenisInstance?.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenisInstance?.destroy();
            lenisInstance = null;
        };
    }, []);
};

export function stopLenis() {
    lenisInstance?.stop();
};

export function startLenis() {
    lenisInstance?.start();
};

export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisInstance) {
        lenisInstance.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
        el.scrollIntoView({ behavior: "smooth" });
    }
};
