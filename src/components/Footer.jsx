import { profile } from "../data/resume";

export default function Footer() {
    return (
        <footer className="border-t border-(--border)" data-testid="site-footer">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">© 2026 {profile.name}</p>
                <p className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500 text-center">Built with React · Vite · Tailwind · Motion · Lenis</p>
                <p className="font-mono-jb text-[10px] tracking-widest uppercase text-zinc-500">Designed & coded with care</p>
            </div>
        </footer>
    );
};
