import { motion } from "framer-motion";
import { ChapterMarker, Reveal } from "./Primitives";
import { profile } from "../data/resume";
import { ArrowUpRight, GitBranch as Github, Link as Linkedin, Mail } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48" data-testid="section-contact">
            <ChapterMarker number="07" label="Contact" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <Reveal className="md:col-span-8">
                    <p className="font-mono-jb text-[10px] tracking-[0.3em] uppercase text-(--accent) mb-6"> Let&apos;s talk </p>
                    <h2 className="font-serif tracking-tighter leading-[0.9] text-6xl md:text-8xl lg:text-9xl">
                        Let&apos;s build <br />
                        <span className="italic">something</span> <br />
                        together <span className="text-(--accent)">.</span>
                    </h2>
                    <p className="mt-10 text-zinc-400 max-w-xl leading-relaxed text-base md:text-lg">
                        I&apos;m currently looking for full-time Software Developer opportunities.
                        If you have an opportunity or would like to collaborate, feel free
                        to reach out.
                    </p>

                    <motion.a href={profile.socials.email} whileHover={{ x: 6 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mt-12 inline-flex items-center gap-4 group" data-testid="contact-email-cta" >
                        <span className="font-serif italic text-3xl md:text-5xl underline-slide">hello @{profile.firstName.toLowerCase() + profile.lastName.toLowerCase()}.dev</span>
                        <span className="w-12 h-12 grid place-items-center rounded-full bg-(--accent) text-white transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={18} /></span>
                    </motion.a>
                </Reveal>

                <Reveal className="md:col-span-4 md:pt-10" delay={0.15}>
                    <p className="font-mono-jb text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6">Elsewhere</p>
                    <div className="space-y-4">
                        {
                            [
                                { icon: Github, label: "GitHub", href: profile.socials.github, id: "github" },
                                { icon: Linkedin, label: "LinkedIn", href: profile.socials.linkedin, id: "linkedin" },
                                { icon: Mail, label: "Email", href: profile.socials.email, id: "email" },
                            ].map(({ icon: Icon, label, href, id }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between py-4 border-t border-(--border) hover:border-(--accent) group transition-colors" data-testid={`contact-${id}-link`}>
                                    <span className="flex items-center gap-3">
                                        <Icon size={16} className="text-zinc-500 group-hover:text-(--accent) transition-colors" />
                                        <span className="font-mono-jb text-xs tracking-widest uppercase">{label}</span>
                                    </span>
                                    <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-(--accent) transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            ))
                        }
                    </div>

                    <div className="mt-10 p-5 rounded-xl border border-(--border)">
                        <p className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">Located in</p>
                        <p className="mt-2 font-serif italic text-2xl">{profile.location}</p>
                        <p className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Available for remote & hybrid
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
