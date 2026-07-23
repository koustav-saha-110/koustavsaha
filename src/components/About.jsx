import { ChapterMarker, Reveal } from "./Primitives";
import { profile } from "../data/resume";
import About3DCanvas from "./About3DCanvas";

export default function About() {
    const manifesto = [
        { n: "01", title: "Craft", body: "Ship code that reads like prose — legible, deliberate, and easy to change." },
        { n: "02", title: "Depth", body: "Understand the stack, not just the surface. Backend architecture, REST, auth, state." },
        { n: "03", title: "Momentum", body: "Build > read > build. Learning by shipping projects end-to-end, one after the next." },
    ];

    return (
        <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24" data-testid="section-about">
            <ChapterMarker number="01" label="About" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                <div className="md:col-span-6 space-y-6">
                    <Reveal>
                        <h2 className="font-serif tracking-tighter leading-[0.95] text-5xl md:text-6xl lg:text-7xl">
                            I build <span className="italic">quiet</span> products <br />
                            with <span className="text-(--accent)">loud</span> attention <br />
                            to detail.
                        </h2>
                        <p className="mt-6 text-zinc-400 leading-relaxed max-w-xl text-base md:text-lg">
                            {profile.aboutInfo}
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <About3DCanvas />
                    </Reveal>
                </div>

                <div className="md:col-span-6 md:pt-8 space-y-8">
                    {
                        manifesto.map((m, i) => (
                            <Reveal key={m.n} delay={0.15 + i * 0.08}>
                                <div className="flex gap-6 group">
                                    <span className="font-mono-jb text-xs tracking-widest text-(--accent) pt-1">{m.n}</span>
                                    <div className="flex-1 border-t border-(--border) pt-4">
                                        <h3 className="font-serif italic text-2xl mb-2">{m.title}</h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed">{m.body}</p>
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
