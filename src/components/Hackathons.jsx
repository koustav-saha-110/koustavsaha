import { ChapterMarker, Reveal } from "./Primitives";
import { Trophy, Users, Calendar, MapPin, Code2 } from "lucide-react";
import { hackathons, profile } from "../data/resume";

function HackathonCard({ hackathon, index }) {
    return (
        <Reveal key={hackathon.id} delay={index * 0.1} className="w-full sm:w-[320px] md:w-90 lg:w-95">
            <article className="group relative border border-(--border) rounded-2xl overflow-hidden bg-(--surface)/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-(--accent)/5 transition-all duration-500 h-full flex flex-col">
                <div className="p-6 md:p-8 flex flex-col flex-1 gap-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-2xl md:text-3xl leading-tight tracking-tighter">{hackathon.eventName}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-zinc-400" />
                                    <span className="font-mono-jb text-xs tracking-widest uppercase text-zinc-400">{hackathon.dates}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-zinc-400" />
                                    <span className="font-mono-jb text-xs tracking-widest uppercase text-zinc-400">{hackathon.location}</span>
                                </div>
                            </div>
                        </div>
                        {
                            hackathon.awards && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--accent)/30 bg-(--accent)/10 shrink-0">
                                    <Trophy size={13} className="text-(--accent)" />
                                    <span className="font-mono-jb text-[10px] tracking-widest uppercase text-(--accent)">{hackathon.awards}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex-1">
                        <h4 className="font-mono-jb text-sm tracking-wider text-zinc-300 mb-2">Project</h4>
                        <p className="text-zinc-200 font-medium">{hackathon.projectTitle}</p>
                        <p className="text-sm text-zinc-400 leading-relaxed mt-3">{hackathon.description}</p>
                    </div>

                    <div>
                        <h4 className="font-mono-jb text-sm tracking-wider text-zinc-300 mb-2 flex items-center gap-2">
                            <Code2 size={14} />
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {
                                hackathon.technologies.map((tech, idx) => (
                                    <span key={idx} className="px-3 py-1.5 rounded-full border border-(--border) text-[10px] font-mono-jb tracking-[0.25em] uppercase text-zinc-400 bg-(--surface)/80 group-hover:border-(--accent)/30 group-hover:text-zinc-300 transition-colors duration-300">{tech}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-(--border)/50">
                        <Users size={14} className="text-zinc-400" />
                        <span className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-400">Team of {hackathon.teamSize}</span>
                    </div>
                </div>
            </article>
        </Reveal>
    );
}

export default function Hackathons() {
    return (
        <section id="hackathons" className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28" data-testid="section-hackathons">
            <ChapterMarker number="06" label="Hackathons" />

            {hackathons && hackathons.length > 0 ? (
                <div className="flex flex-wrap justify-start gap-7 md:gap-9 mt-12">
                    {hackathons.map((hackathon, index) => (
                        <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
                    ))}
                </div>
            ) : (
                <Reveal>
                    <div className="relative border border-(--border) rounded-2xl overflow-hidden p-10 md:p-16 mt-12">
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
                                    I'm actively looking forward to contributing and competing in
                                    future events. If you're organizing one, I'd love to hear about it.
                                </p>
                            </div>
                            <div className="md:col-span-4 md:text-right">
                                <p className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">Status</p>
                                <p className="font-serif italic text-3xl mt-2">{profile.availability ? "Available" : "Not Available"}</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            )}
        </section>
    );
};
