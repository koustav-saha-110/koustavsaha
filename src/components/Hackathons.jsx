import { ChapterMarker, Reveal } from "./Primitives";
import { Trophy } from "lucide-react";
import { profile } from "../data/resume";

export default function Hackathons() {
    return (
        <section id="hackathons" className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40" data-testid="section-hackathons">
            <ChapterMarker number="06" label="Hackathons" />
            <Reveal>
                <div className="relative border border-(--border) rounded-2xl overflow-hidden p-10 md:p-16">
                    <div className="absolute -top-32 -right-32 w-100 h-100 rounded-full opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, transparent 60%)", }} />
                    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-8">
                            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-(--border)">
                                <Trophy size={13} className="text-(--accent)" />
                                <span className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-400">Coming Soon</span>
                            </div>
                            <h2 className="font-serif tracking-tighter leading-[0.95] text-4xl md:text-6xl">
                                No hackathons <span className="italic">yet</span> —
                                <br />
                                actively <span className="text-(--accent)">looking</span> forward.
                            </h2>
                            <p className="mt-8 text-zinc-400 max-w-xl leading-relaxed">
                                I"m actively looking forward to contributing and competing in
                                future events.If you"re organizing one, I&apos;d love to hear about it.
                            </p>
                        </div>
                        <div className="md:col-span-4 md:text-right">
                            <p className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">Status</p>
                            <p className="font-serif italic text-3xl mt-2">{profile.availability ? "Available" : "Not Available"}</p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};
