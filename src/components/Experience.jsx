import { ChapterMarker, Reveal } from "./Primitives";
import { experience } from "../data/resume";

export default function Experience() {
    return (
        <section id="experience" className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40" data-testid="section-experience">
            <ChapterMarker number="02" label="Experience" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <Reveal className="md:col-span-4">
                    <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">
                        Where <br /> <span className="italic">I&apos;ve been.</span>
                    </h2>
                </Reveal>

                <div className="md:col-span-8">
                    {
                        experience.map((e, i) => (
                            <Reveal key={i} delay={0.1}>
                                <div className="relative pl-8 md:pl-12 pb-8 border-l border-(--border)">
                                    <span className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-(--accent) ring-4 ring-(--bg)" />
                                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                                        <h3 className="font-serif italic text-3xl md:text-4xl">{e.role}</h3>
                                        <span className="font-mono-jb text-xs tracking-widest text-zinc-500">{e.duration}</span>
                                    </div>
                                    <p className="font-mono-jb text-[11px] tracking-widest uppercase text-zinc-500 mb-6">{e.company} · {e.location}</p>
                                    <ul className="space-y-3">
                                        {
                                            e.points.map((p, idx) => (
                                                <li key={idx} className="flex gap-4 text-zinc-400 text-sm md:text-base">
                                                    <span className="font-mono-jb text-[10px] text-(--accent) tracking-widest pt-1.5">
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="flex-1 leading-relaxed">{p}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Reveal>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
