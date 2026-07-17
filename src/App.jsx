import { Fragment, lazy, Suspense } from "react";
import { useLenis } from "./hooks/useLenis";
import { useTheme } from "./hooks/useTheme";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Hackathons = lazy(() => import("./components/Hackathons"));
const MarqueeAnimation = lazy(() => import("./components/Marquee"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Preloader = lazy(() => import("./components/Preloader"));

const Home = () => {
    const { theme, toggle } = useTheme();

    return (
        <div className="grain min-h-screen bg-(--bg) text-(--text-primary)" data-testid="app-root">
            <Suspense fallback={<></>}><Preloader /></Suspense>
            <Suspense fallback={<></>}><Navbar theme={theme} toggle={toggle} /></Suspense>
            <main>
                <Suspense fallback={<></>}><Hero /></Suspense>
                <Suspense fallback={<></>}><About /></Suspense>
                <Suspense fallback={<></>}><Experience /></Suspense>
                <Suspense fallback={<></>}><MarqueeAnimation /></Suspense>
                <Suspense fallback={<></>}><Education /></Suspense>
                <Suspense fallback={<></>}><Skills /></Suspense>
                <Suspense fallback={<></>}><Projects /></Suspense>
                <Suspense fallback={<></>}><Hackathons /></Suspense>
                <Suspense fallback={<></>}><Contact /></Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default function App() {
    useLenis();

    return (
        <Fragment>
            <Analytics />
            <SpeedInsights />
            <Routes>
                <Route index element={<Home />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Fragment>
    );
};
