import { motion } from "framer-motion";
import { ChapterMarker, Reveal, Interactive3DTilt } from "./Primitives";
import { projects } from "../data/resume";
import { ArrowUpRight, GitBranch as Github, ExternalLink } from "lucide-react";
import Projects3DCanvas from "./Projects3DCanvas";

export function ProjectCard({ project }) {
    return (
        <Interactive3DTilt className="w-full h-full flex" maxRotation={0} scale={1.0}>
            <motion.article whileHover="hover" initial="rest" animate="rest" style={{ transformStyle: "preserve-3d" }} className={`group relative border border-(--border) rounded-2xl overflow-hidden bg-(--surface)/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-(--accent)/5 transition-all duration-500 shrink-0 box-border h-full flex flex-col w-full`} data-testid={`project-card-${project.id}`}>
                <div className="relative aspect-16/10 overflow-hidden" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
                    <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" variants={{ rest: { scale: 1, filter: "grayscale(30%) brightness(0.9)" }, hover: { scale: 1.08, filter: "grayscale(0%) brightness(1)" } }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
                    <motion.div variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(600px circle at 50% 50%, rgba(59,130,246,0.25), transparent 60%)" }} />
                    <div className="absolute top-5 left-5 font-mono-jb text-[10px] tracking-[0.3em] uppercase text-white/90 bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/10" style={{ transform: "translateZ(25px)" }}>/{project.id}</div>
                    <div className="absolute top-5 right-5 font-mono-jb text-[10px] tracking-[0.3em] uppercase text-white/80 bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/10" style={{ transform: "translateZ(25px)" }}>{project.year}</div>
                </div>

                <div className="p-7 md:p-9 flex flex-col gap-6 flex-1 justify-between" style={{ transformStyle: "preserve-3d" }}>
                    <div style={{ transformStyle: "preserve-3d" }} className="flex flex-col gap-6">
                        <div className="flex items-start justify-between gap-5" style={{ transform: "translateZ(20px)" }}>
                            <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-tighter">{project.title}</h3>
                            <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }} transition={{ duration: 0.5 }} className="shrink-0 w-10 h-10 grid place-items-center rounded-full border border-(--border) group-hover:border-(--accent) group-hover:bg-(--accent)/10 group-hover:text-(--accent) transition-all duration-300">
                                <ArrowUpRight size={16} />
                            </motion.div>
                        </div>
                        <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl" style={{ transform: "translateZ(15px)" }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1" style={{ transform: "translateZ(22px)" }}>
                            {
                                project.stack.map((t) => (
                                    <span key={t} className="px-3 py-1.5 rounded-full border border-(--border) text-[10px] font-mono-jb tracking-[0.25em] uppercase text-zinc-400 bg-(--surface)/80 group-hover:border-(--accent)/30 group-hover:text-zinc-300 transition-colors duration-300"> {t} </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2" style={{ transform: "translateZ(25px)" }}>
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
        </Interactive3DTilt>
    )
}

export default function Projects() {
    return (
        <section id="projects" className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28" data-testid="section-projects">
            <ChapterMarker number="05" label="Projects" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Reveal className="lg:col-span-5">
                    <div className="lg:sticky lg:top-24 space-y-8">
                        <div className="space-y-4">
                            <h2 className="font-serif tracking-tighter leading-[0.95] text-5xl md:text-7xl">
                                Selected <br /> <span className="italic">work.</span>
                            </h2>
                            <p className="text-sm md:text-base text-zinc-500 max-w-sm leading-relaxed">
                                Hand-picked projects from self-directed practice — architecture, UI, and everything in between.
                            </p>
                        </div>

                        <Projects3DCanvas />
                    </div>
                </Reveal>

                <div className="lg:col-span-7 space-y-12">
                    {
                        projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 120, rotateX: 12, scale: 0.94 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1.0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ type: "spring", stiffness: 85, damping: 16 }}
                                className="w-full flex"
                            >
                                <ProjectCard project={p} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
