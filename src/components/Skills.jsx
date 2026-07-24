import { motion } from "framer-motion";
import { ChapterMarker, Reveal } from "./Primitives";
import { skills } from "../data/resume";
import Skills3DCanvas from "./Skills3DCanvas";

export default function Skills() {
    return (
        <section id="skills" className="relative overflow-hidden" data-testid="section-skills">
            <Skills3DCanvas />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <ChapterMarker number="04" label="Skills" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <Reveal className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">
                                Tools <br /> <span className="italic">I trust.</span>
                            </h2>
                            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                                The technology stack I reach for when turning ideas into shipped products.
                            </p>
                        </div>
                    </Reveal>

                    <div className="lg:col-span-8 space-y-8">
                        {
                            skills.map((group, gi) => (
                                <Reveal key={group.category} delay={gi * 0.05}>
                                    <div className="p-6 border border-(--border) rounded-2xl bg-(--surface)/30 backdrop-blur-xs hover:border-(--accent)/35 transition-colors duration-300">
                                        <div className="flex items-center justify-between mb-4 border-b border-(--border)/50 pb-3">
                                            <h3 className="font-serif italic text-xl md:text-2xl text-(--text-primary)">
                                                {group.category}
                                            </h3>
                                            <span className="font-mono-jb text-[10px] tracking-widest text-zinc-500">
                                                [0{gi + 1}]
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {
                                                group.items.map((s) => (
                                                    <motion.span
                                                        key={s}
                                                        whileHover={{ y: -2 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="px-3.5 py-2 rounded-xl border border-(--border) text-xs font-mono-jb tracking-wider dark:text-zinc-200 font-medium bg-(--surface)/30 hover:text-(--accent) hover:border-(--accent)/50 hover:bg-(--accent)/5 transition-colors cursor-default select-none"
                                                    >
                                                        {s}
                                                    </motion.span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Reveal>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}
