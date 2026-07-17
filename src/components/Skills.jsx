import { ChapterMarker, Reveal } from "./Primitives";
import { skills } from "../data/resume";
import { motion } from "framer-motion";

export default function Skills() {
    return (
        <section id="skills" className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40" data-testid="section-skills">
            <ChapterMarker number="04" label="Skills" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <Reveal className="md:col-span-4">
                    <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">Tools <br /> <span className="italic">I trust.</span>
                    </h2>
                    <p className="mt-8 text-zinc-500 text-sm max-w-xs leading-relaxed">The stack I reach for when turning ideas into shipped products.</p>
                </Reveal>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {
                        skills.map((group, gi) => (
                            <Reveal key={group.category} delay={gi * 0.05}>
                                <div className="p-6 border border-(--border) rounded-xl hover:border-(--accent)/50 transition-colors h-full">
                                    <div className="flex items-baseline justify-between mb-5">
                                        <h3 className="font-serif italic text-2xl">{group.category}</h3>
                                        <span className="font-mono-jb text-[10px] tracking-widest text-(--accent)">/ {String(gi + 1).padStart(2, "0")}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            group.items.map((s) => (
                                                <motion.span key={s} whileHover={{ y: -2 }} transition={{ duration: 0.25 }} className="px-3 py-1.5 rounded-full border border-(--border) text-xs font-mono-jb tracking-wider text-zinc-300 hover:text-(--accent) hover:border-(--accent) transition-colors cursor-default" data-testid={`skill-pill-${s.toLowerCase().replace(/s+/g, "-")}`}>{s}</motion.span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                </div>
            </div>
        </section>
    );
};
