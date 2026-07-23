import { ChapterMarker, Reveal, Interactive3DTilt } from "./Primitives";
import { experience } from "../data/resume";
import Experience3DCanvas from "./Experience3DCanvas";

export default function Experience() {
    return (
        <section id="experience" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24" data-testid="section-experience">
            <ChapterMarker number="02" label="Experience" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Reveal className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">
                            Where <br /> <span className="italic">I&apos;ve been.</span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                            My professional internships and roles where I collaborated on features and shipped code.
                        </p>
                        <div className="pt-2">
                            <Experience3DCanvas />
                        </div>
                    </div>
                </Reveal>

                <div className="lg:col-span-8 relative pl-6 md:pl-10 space-y-12">
                    <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-(--accent) via-(--border) to-transparent" />

                    {
                        experience.map((e, i) => (
                            <Reveal key={i} delay={i * 0.08} className="relative">
                                <span className="absolute -left-[31px] md:-left-[47px] top-7 flex h-4 w-4 items-center justify-center rounded-full bg-(--bg) ring-1 ring-(--border)">
                                    <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                                </span>

                                <Interactive3DTilt maxRotation={5} scale={1.015} className="w-full flex">
                                    <div className="group relative p-6 md:p-8 border border-(--border) rounded-2xl bg-(--surface)/40 backdrop-blur-md hover:border-(--accent)/40 hover:shadow-xl hover:shadow-(--accent)/3 transition-all duration-500 flex flex-col gap-6 w-full" style={{ transformStyle: "preserve-3d" }}>

                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-(--border)/50 pb-4" style={{ transform: "translateZ(15px)" }}>
                                            <div>
                                                <h3 className="font-serif italic text-3xl md:text-4xl">{e.role}</h3>
                                                <div className="flex flex-wrap gap-2 items-center mt-2">
                                                    <span className="font-mono-jb text-[10px] tracking-widest uppercase text-(--accent)">{e.company}</span>
                                                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                                    <span className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">{e.location}</span>
                                                </div>
                                            </div>
                                            <span className="font-mono-jb text-[10px] tracking-widest text-zinc-400 uppercase shrink-0 pt-1.5">{e.duration}</span>
                                        </div>

                                        <ul className="space-y-4" style={{ transform: "translateZ(10px)" }}>
                                            {
                                                e.points.map((p, idx) => (
                                                    <li key={idx} className="flex gap-4 text-zinc-400 text-sm md:text-base align-top">
                                                        <span className="font-mono-jb text-[9px] text-(--accent) tracking-widest pt-1 shrink-0">
                                                            [{String(idx + 1).padStart(2, "0")}]
                                                        </span>
                                                        <span className="flex-1 leading-relaxed">{p}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </Interactive3DTilt>
                            </Reveal>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
