import { ChapterMarker, Reveal } from "./Primitives";
import { education } from "../data/resume";

export default function Education() {
    return (
        <section id="education" className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40" data-testid="section-education">
            <ChapterMarker number="03" label="Education" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <Reveal className="md:col-span-4">
                    <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">What <br /> <span className="italic">shaped me.</span></h2>
                </Reveal>

                <div className="md:col-span-8 space-y-2">
                    {
                        education.map((ed, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div className="group grid grid-cols-12 gap-6 items-start py-8 border-t border-(--border) hover:border-(--accent)/50 transition-colors">
                                    <span className="col-span-2 font-mono-jb text-[10px] tracking-widest text-(--accent) pt-2">0{i + 1}</span>
                                    <div className="col-span-10 md:col-span-7">
                                        <h3 className="font-serif text-2xl md:text-3xl leading-tight">{ed.degree}</h3>
                                        <p className="mt-2 text-sm text-zinc-400">{ed.school}</p>
                                    </div>
                                    <div className="col-span-12 md:col-span-3 md:text-right space-y-1">
                                        <p className="font-mono-jb text-[11px] tracking-widest text-zinc-500">{ed.duration}</p>
                                        <p className="font-mono-jb text-[11px] tracking-widest text-(--text-primary)">{ed.status}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
