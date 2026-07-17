import BaseMarquee from "react-fast-marquee";
const Marquee = BaseMarquee.default || BaseMarquee;

const items = [
    "Koustav Saha",
    "★",
    "Full Stack Developer",
    "★",
    "MERN",
    "★",
    "React",
    "★",
    "Node",
    "★",
    "Express",
    "★",
    "MongoDB",
    "★",
    "Creative Problem Solver",
    "★",
    "Open to Full-Time Roles",
    "★",
    "DSA",
    "★",
    "UI/UX Focused",
    "★",
    "Accessible Web Experiences",
    "★",
    "Based in Kolkata",
    "★",
    "Continuous Learner",
    "★",
];

export default function MarqueeAnimation() {
    return (
        <section aria-hidden className="py-16 md:py-24 border-y border-(--border) overflow-hidden" data-testid="section-marquee">
            <Marquee play pauseOnHover speed={85}>
                <div className="flex items-center mx-6 md:mx-10">
                    {
                        items.map((t, i) => (
                            <span key={i} className={`font-serif tracking-tighter text-6xl md:text-8xl lg:text-9xl leading-none px-6 md:px-10 select-none ${t === "★" ? "text-(--accent)" : "text-outline"}`}>{t === "★" ? t : <span className="italic">{t}</span>}</span>
                        ))
                    }
                </div>
            </Marquee>
        </section>
    );
}
