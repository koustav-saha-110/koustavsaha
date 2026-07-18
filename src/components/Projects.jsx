import { motion } from "framer-motion";
import { ChapterMarker, Reveal } from "./Primitives";
import { projects } from "../data/resume";
import { ArrowUpRight, GitBranch as Github, ExternalLink } from "lucide-react";

export function ProjectCard({ project }) {
    return (
        <motion.article whileHover="hover" initial="rest" animate="rest" className={`group relative border border-(--border) rounded-2xl overflow-hidden bg-(--surface)/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-(--accent)/5 transition-all duration-500 shrink-0 box-border group h-full flex flex-col w-full sm:w-[320px] md:w-90 lg:w-95`} data-testid={`project-card-${project.id}`}>
            <div className="relative aspect-16/10 overflow-hidden">
                <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" variants={{ rest: { scale: 1, filter: "grayscale(30%) brightness(0.9)" }, hover: { scale: 1.08, filter: "grayscale(0%) brightness(1)" } }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
                <motion.div variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(600px circle at 50% 50%, rgba(59,130,246,0.25), transparent 60%)" }} />
                <div className="absolute top-5 left-5 font-mono-jb text-[10px] tracking-[0.3em] uppercase text-white/90 bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/10">/{project.id}</div>
                <div className="absolute top-5 right-5 font-mono-jb text-[10px] tracking-[0.3em] uppercase text-white/80 bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/10">{project.year}</div>
            </div>

            <div className="p-7 md:p-9 flex flex-col gap-6">
                <div className="flex items-start justify-between gap-5">
                    <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-tighter">{project.title}</h3>
                    <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }} transition={{ duration: 0.5 }} className="shrink-0 w-10 h-10 grid place-items-center rounded-full border border-(--border) group-hover:border-(--accent) group-hover:bg-(--accent)/10 group-hover:text-(--accent) transition-all duration-300">
                        <ArrowUpRight size={16} />
                    </motion.div>
                </div>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {
                        project.stack.map((t) => (
                            <span key={t} className="px-3 py-1.5 rounded-full border border-(--border) text-[10px] font-mono-jb tracking-[0.25em] uppercase text-zinc-400 bg-(--surface)/80 group-hover:border-(--accent)/30 group-hover:text-zinc-300 transition-colors duration-300"> {t} </span>
                        ))
                    }
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-(--border) text-[11px] font-mono-jb tracking-[0.25em] uppercase hover:border-(--accent) hover:text-(--accent) hover:bg-(--accent)/5 transition-all duration-300" data-testid={`project-github-${project.id}`}>
                        <Github size={14} />
                        Code
                    </a>
                    {
                        project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--accent) text-white text-[11px] font-mono-jb tracking-[0.25em] uppercase hover:bg-(--accent)/90 hover:shadow-lg hover:shadow-(--accent)/30 transition-all duration-300" data-testid={`project-live-${project.id}`}>
                                Live Demo
                                <ExternalLink size={14} />
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
        <section id="projects" className="max-w-7xl mx-auto px-6 md:px-12 py-36 md:py-44" data-testid="section-projects">
            <ChapterMarker number="05" label="Projects" />

            <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-8 mb-20">
                    <h2 className="font-serif tracking-tighter leading-[0.95] text-5xl md:text-7xl">Selected <span className="italic">work.</span></h2>
                    <p className="text-sm md:text-base text-zinc-500 max-w-sm leading-relaxed">
                        Hand-picked projects from self-directed practice — architecture, UI,
                        and everything in between.
                    </p>
                </div>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-7 md:gap-9">
                {
                    projects.map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.1} className="flex">
                            <ProjectCard project={p} index={i} />
                        </Reveal>
                    ))
                }
            </div>
        </section>
    );
};
