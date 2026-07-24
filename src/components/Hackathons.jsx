import { ChapterMarker, Reveal, Interactive3DTilt } from "./Primitives";
import { Trophy, Users, Calendar, MapPin, Code2, Mail, Sparkles, Zap } from "lucide-react";
import { hackathons, profile } from "../data/resume";
import Hackathons3DCanvas from "./Hackathons3DCanvas";

function HackathonCard({ hackathon, index }) {
    return (
        <Reveal delay={index * 0.1} className="w-full">
            <Interactive3DTilt maxRotation={0} scale={1.0} className="w-full">
                <article className="group relative border border-(--border) rounded-3xl overflow-hidden bg-(--surface)/40 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-(--accent)/40 transition-all duration-500 p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-1">
                            <span className="font-mono-jb text-[10px] tracking-widest text-(--accent)">[0{index + 1}]</span>
                            <h3 className="font-serif italic text-2xl md:text-3xl tracking-tight">{hackathon.eventName}</h3>
                            <div className="flex flex-wrap items-center gap-4 pt-1 text-zinc-400 font-mono-jb text-xs">
                                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-(--accent)" /> {hackathon.dates}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-(--accent)" /> {hackathon.location}</span>
                            </div>
                        </div>
                        {hackathon.awards && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 self-start">
                                <Trophy size={13} />
                                <span className="font-mono-jb text-[10px] tracking-widest uppercase">{hackathon.awards}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 border-t border-(--border)/50 pt-4">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-(--accent)" />
                            <h4 className="font-mono-jb text-xs tracking-wider uppercase text-zinc-300">Project: {hackathon.projectTitle}</h4>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed pl-5">{hackathon.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-(--border)/50">
                        <div className="flex flex-wrap gap-2">
                            {hackathon.technologies.map((tech) => (
                                <span key={tech} className="px-3 py-1 rounded-xl border border-(--border) text-[10px] font-mono-jb tracking-wider uppercase text-zinc-300 bg-(--bg)/40">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">
                            <Users size={13} />
                            <span>Team of {hackathon.teamSize}</span>
                        </div>
                    </div>
                </article>
            </Interactive3DTilt>
        </Reveal>
    );
}

export default function Hackathons() {
    const hasHackathons = hackathons && hackathons.length > 0;

    return (
        <section id="hackathons" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24" data-testid="section-hackathons">
            <ChapterMarker number="06" label="Hackathons" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Reveal className="lg:col-span-5">
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <h2 className="font-serif tracking-tighter leading-none text-5xl md:text-6xl">
                            Competitive <br /> <span className="italic">sprints.</span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                            Fast-paced engineering sprints, rapid prototyping, and competitive problem solving under pressure.
                        </p>
                        <Hackathons3DCanvas />
                    </div>
                </Reveal>

                <div className="lg:col-span-7 space-y-8">
                    {hasHackathons ? (
                        hackathons.map((h, i) => <HackathonCard key={h.id} hackathon={h} index={i} />)
                    ) : (
                        <Reveal>
                            <Interactive3DTilt maxRotation={0} scale={1.0} className="w-full">
                                <div className="p-8 md:p-10 border border-(--border) rounded-3xl bg-(--surface)/40 backdrop-blur-md shadow-2xl space-y-8 relative overflow-hidden">
                                    <div
                                        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none"
                                        style={{ background: "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)" }}
                                    />

                                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-(--border)/50 pb-6">
                                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="font-mono-jb text-[10px] tracking-widest uppercase text-emerald-400">
                                                [AVAILABLE_FOR_HACKATHONS]
                                            </span>
                                        </div>
                                        <span className="font-mono-jb text-xs tracking-widest uppercase text-zinc-500">
                                            [STATUS: OPEN_FOR_TEAMING]
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-serif tracking-tighter leading-tight text-3xl md:text-5xl">
                                            Ready to build <span className="italic text-(--accent)">fast</span> — <br />
                                            seeking upcoming sprints.
                                        </h3>
                                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                                            I excel in high-pressure environments, rapid MVP building, and collaborative team sprints. If you're hosting an event or putting together a team, let's join forces.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                        <div className="p-4 border border-(--border)/60 rounded-2xl bg-(--bg)/40 space-y-1">
                                            <span className="font-mono-jb text-[9px] tracking-widest uppercase text-zinc-500 block">Sprint Role</span>
                                            <span className="font-mono-jb text-xs text-zinc-200 block">Full-Stack / AI</span>
                                        </div>
                                        <div className="p-4 border border-(--border)/60 rounded-2xl bg-(--bg)/40 space-y-1">
                                            <span className="font-mono-jb text-[9px] tracking-widest uppercase text-zinc-500 block">Execution</span>
                                            <span className="font-mono-jb text-xs text-zinc-200 block">Rapid MVP Prototype</span>
                                        </div>
                                        <div className="p-4 border border-(--border)/60 rounded-2xl bg-(--bg)/40 space-y-1">
                                            <span className="font-mono-jb text-[9px] tracking-widest uppercase text-zinc-500 block">Mode</span>
                                            <span className="font-mono-jb text-xs text-zinc-200 block">Remote & Hybrid</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-(--border)/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-3 text-zinc-400 text-xs">
                                            <Sparkles size={16} className="text-(--accent) shrink-0" />
                                            <span>Forming a hackathon team or hosting an event?</span>
                                        </div>
                                        <a
                                            href={`mailto:${profile.socials.email}`}
                                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-(--accent) text-white font-mono-jb text-xs tracking-widest uppercase hover:bg-(--accent)/90 hover:shadow-lg hover:shadow-(--accent)/25 transition-all duration-300 shrink-0"
                                        >
                                            <Mail size={14} />
                                            Invite to Team
                                        </a>
                                    </div>
                                </div>
                            </Interactive3DTilt>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
}
