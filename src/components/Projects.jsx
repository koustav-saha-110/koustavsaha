import { motion } from "framer-motion";
import { ChapterMarker, Reveal } from "./Primitives";
import { projects } from "../data/resume";
import { ArrowUpRight, GitBranch as Github } from "lucide-react";

export function ProjectCard({ project }) {
    return (
        <motion.article whileHover="hover" initial="rest" animate="rest" className={`group relative border border-(--border) rounded-xl overflow-hidden bg-(--surface)/40 backdrop-blur-sm ${project.span}`} data-testid={`project-card-${project.id}`}>
            <div className="relative aspect-16/10 overflow-hidden">
                <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" variants={{ rest: { scale: 1, filter: "grayscale(40%) brightness(0.8)" }, hover: { scale: 1.06, filter: "grayscale(0%) brightness(1)" }, }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
                <motion.div variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(500px circle at 50% 50%, rgba(59,130,246,0.18), transparent 60%)", }} />
                <div className="absolute top-4 left-4 font-mono-jb text-[10px] tracking-widest text-white/90 bg-black/30 backdrop-blur-md px-2 py-1 rounded">/{project.id}</div>
                <div className="absolute top-4 right-4 font-mono-jb text-[10px] tracking-widest text-white/80 bg-black/30 backdrop-blur-md px-2 py-1 rounded">{project.year}</div>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">{project.title}</h3>
                    <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }} transition={{ duration: 0.5 }} className="shrink-0 w-9 h-9 grid place-items-center rounded-full border border-(--border) group-hover:border-(--accent) group-hover:text-(--accent) transition-colors"><ArrowUpRight size={15} /></motion.div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {
                        project.stack.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-full border border-(--border) text-[10px] font-mono-jb tracking-widest uppercase text-zinc-400">{t}</span>
                        ))
                    }
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--border) text-[11px] font-mono-jb tracking-widest uppercase hover:border-(--accent) hover:text-(--accent) transition-colors" data-testid={`project-github-${project.id}`}>
                        <Github size={13} />
                        Code
                    </a>
                    {
                        project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--text-primary) text-(--bg) text-[11px] font-mono-jb tracking-widest uppercase hover:opacity-90 transition-opacity" data-testid={`project-live-${project.id}`}>
                                Live Demo
                                <ArrowUpRight size={13} />
                            </a>
                        )
                    }
                </div>
            </div>
        </motion.article>
    )
}

export default function Projects() {
    return (
        <section id="projects" className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40" data-testid="section-projects">
            <ChapterMarker number="05" label="Projects" />

            <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
                    <h2 className="font-serif tracking-tighter leading-[0.95] text-5xl md:text-7xl">Selected <span className="italic">work.</span></h2>
                    <p className="text-sm text-zinc-500 max-w-sm">
                        Hand-picked projects from self-directed practice — architecture, UI,
                        and everything in between.
                    </p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {
                    projects.map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.08} className={p.span}>
                            <ProjectCard project={p} index={i} />
                        </Reveal>
                    ))
                }
            </div>
        </section>
    );
};
