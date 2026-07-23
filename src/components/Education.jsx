import { ChapterMarker, Reveal, Interactive3DTilt } from "./Primitives";
import { education } from "../data/resume";
import Education3DCanvas from "./Education3DCanvas";

export default function Education() {
    const getDetails = (degree) => {
        if (degree.includes("MCA")) {
            return "Focusing on advanced database systems, distributed architectures, software engineering patterns, and enterprise full-stack development using the modern JS ecosystem.";
        }
        if (degree.includes("BCA")) {
            return "Acquired a comprehensive foundation in computer applications, programming paradigms (OOPs, C++, Java), data structures, algorithms, and SQL database design.";
        }
        return "Completed secondary education with commerce stream, mathematics, and introductory computer applications coursework.";
    };

    return (
        <section id="education" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24" data-testid="section-education">
            <ChapterMarker number="03" label="Education" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Reveal className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">
                            What <br /> <span className="italic">shaped me.</span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                            My academic milestones and qualifications that laid the structural foundation for my career as a developer.
                        </p>
                        <div className="pt-2">
                            <Education3DCanvas />
                        </div>
                    </div>
                </Reveal>

                <div className="lg:col-span-8 relative pl-6 md:pl-10 space-y-12">
                    <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-(--accent) via-(--border) to-transparent" />

                    {
                        education.map((ed, i) => {
                            const isCurrent = ed.status.toLowerCase().includes("currently");
                            const isCgpa = ed.status.toLowerCase().includes("cgpa");

                            return (
                                <Reveal key={i} delay={i * 0.08} className="relative">
                                    <span className="absolute -left-[31px] md:-left-[47px] top-7 flex h-4 w-4 items-center justify-center rounded-full bg-(--bg) ring-1 ring-(--border)">
                                        <span className={`h-1.5 w-1.5 rounded-full ${isCurrent ? "bg-emerald-400 animate-pulse" : "bg-(--accent)"}`} />
                                    </span>

                                    <Interactive3DTilt maxRotation={5} scale={1.015} className="w-full flex">
                                        <div className="group relative p-6 md:p-8 border border-(--border) rounded-2xl bg-(--surface)/40 backdrop-blur-md hover:border-(--accent)/40 hover:shadow-xl hover:shadow-(--accent)/3 transition-all duration-500 flex flex-col gap-4 w-full" style={{ transformStyle: "preserve-3d" }}>

                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4" style={{ transform: "translateZ(15px)" }}>
                                                <div>
                                                    <span className="font-mono-jb text-[10px] tracking-widest text-(--accent)">[0{i + 1}]</span>
                                                    <h3 className="font-serif text-2xl md:text-3xl leading-tight mt-1">{ed.degree}</h3>
                                                    <p className="text-sm text-zinc-400 mt-1">{ed.school}</p>
                                                </div>

                                                <div className="flex flex-col md:items-end gap-2 shrink-0">
                                                    <span className="font-mono-jb text-[10px] tracking-widest text-zinc-500 uppercase">{ed.duration}</span>

                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-jb tracking-wider uppercase border 
                                                        ${isCurrent ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300" :
                                                            isCgpa ? "border-(--accent)/30 bg-(--accent)/5 text-(--text-primary)" :
                                                                "border-zinc-500/30 bg-zinc-500/5 text-zinc-400"}`}>
                                                        {isCurrent && (
                                                            <span className="relative flex w-1.5 h-1.5">
                                                                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                                                                <span className="relative rounded-full w-1.5 h-1.5 bg-emerald-400" />
                                                            </span>
                                                        )}
                                                        {ed.status}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed border-t border-(--border)/50 pt-4" style={{ transform: "translateZ(10px)" }}>
                                                {getDetails(ed.degree)}
                                            </p>
                                        </div>
                                    </Interactive3DTilt>
                                </Reveal>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
};
