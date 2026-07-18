const RESUME = {
    PROFILE: {
        name: "Koustav Saha",
        firstName: "Koustav",
        lastName: "Saha",
        headline: "Full Stack MERN Developer",
        subheading: "Building modern, scalable, and user-focused web & mobile applications using MongoDB, Express.js, React, React Native, and Node.js.",
        aboutInfo: `I"m a Full Stack MERN Developer passionate about creating scalable
        web and mobile applications.I enjoy transforming ideas into clean,
        maintainable products with modern technologies.Currently pursuing
        MCA while actively seeking full - time Software Developer
        opportunities.`,
        location: "Kolkata, India",
        status: "Open to Full-Time Opportunities",
        socials: {
            github: "https://github.com/koustav-saha-110/",
            linkedin: "https://www.linkedin.com/in/koustav-saha-80691a3a9/",
            email: "mailto:koustavsaha081@gmail.com",
            resume: "/Koustav_Saha_Resume.pdf",
            instagram: {
                username: "koustav.io",
                link: "https://instagram.com/koustav.io"
            }
        },
        availability: true,
    },
    SKILLS: [
        {
            category: "Programming Languages",
            items: ["JavaScript (ES6+)", "Python", "C", "C++", "JAVA", "SQL", "HTML5", "CSS3"],
        },
        {
            category: "Libraries & Frameworks",
            items: ["React.js", "Next.js", "Responsive Web Design", "Component - Based Architecture", "Node.js",
                "Express.js", "REST API Design", "JWT Authentication", "OAuth", "Socket.io", "MongoDB", "MySQL", "Mongoose ODM",
                "Scikit - learn", "Pandas", "NumPy", "NLP", "TF - IDF", "Jupyter Notebook"],
        },
        {
            category: "Mobile",
            items: ["React Native"],
        },
        {
            category: "Tools",
            items: ["Git", "GitHub", "Postman", "VS Code", "Linux"],
        },
        {
            category: "Other",
            items: ["REST APIs", "JWT Auth", "Firebase", "Responsive Design"],
        },
    ],
    EDUCATION: [
        {
            degree: "Master of Computer Applications (MCA)",
            school: "Netaji Subhash Engineering College",
            duration: "2025 — 2027",
            status: "Currently Pursuing",
        },
        {
            degree: "Bachelor of Computer Applications (BCA)",
            school: "Meghnad Saha Institute of Technology",
            duration: "2022 — 2025",
            status: "CGPA: 7.96",
        },
        {
            degree: "Higher Secondary (Commerce)",
            school: "Kalighat High School",
            duration: "Passed 2022",
            status: "Completed",
        },
    ],
    EXPERIENCE: [
        {
            role: "Web Development Intern",
            company: "Codsoft",
            duration: "Jan 2024 — Feb 2024",
            location: "Remote",
            points: [
                "Engineered 3 responsive landing pages using React.js and CSS3, reducing page load time by 20% and ensuring full cross -browser compatibility.",
                "Optimized frontend performance and accessibility, translating design wireframes into clean, production-ready code.",
            ],
        },
        {
            role: "Python Programming Intern",
            company: "Oasis Infobyte",
            duration: "Dec 2023 — Jan 2024",
            location: "Remote",
            points: [
                "Developed a Python voice assistant integrating speech recognition and text-to-speech libraries to automate user-defined tasks.",
            ],
        },
        // {
        //     role: "Aspiring Full Stack MERN Developer",
        //     company: "Self-directed practice",
        //     duration: "2022 — Present",
        //     location: "Kolkata, India",
        //     points: [
        //         "Built multiple end-to-end MERN stack projects from architecture to deployment",
        //         "Deep-dived into backend architecture, REST APIs, and JWT authentication",
        //         "Explored React state management patterns and component composition",
        //         "Extended into mobile with React Native and native-feeling UIs",
        //         "Actively problem-solving on data structures and system design",
        //         "Currently seeking full-time Software Developer opportunities",
        //     ],
        // },
    ],
    PROJECTS: [
        {
            id: "01",
            title: "Social Media Platform",
            year: "2024",
            stack: ["MongoDB", "Express", "React", "Node.js"],
            description: "A full-stack social platform featuring authentication, user profiles, post creation, likes, comments, image uploads, and a responsive UI.",
            image: "https://images.unsplash.com/photo-1622549037543-49cf1ca0babc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFwcCUyMFVJJTIwbW9ja3Vwc3xlbnwwfHx8fDE3ODQyNjYzODN8MA&ixlib=rb-4.1.0&q=85",
            github: "https://github.com/koustav-saha-110/smp",
            live: null,
        },
        {
            id: "02",
            title: "Employee Management System",
            year: "2024",
            stack: ["MongoDB", "Express", "React", "Node.js"],
            description: "Employee dashboard with CRUD operations, JWT authentication, role-based access, and performance-friendly architecture.",
            image: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHw0fHxkYXNoYm9hcmQlMjBVSSUyMGludGVyZmFjZXxlbnwwfHx8fDE3ODQyNjYzODN8MA&ixlib=rb-4.1.0&q=85",
            github: "https://github.com/koustav-saha-110/ems",
            live: null,
        },
        {
            id: "03",
            title: "AI Pocket Agent",
            year: "2025",
            stack: ["React Native", "AI", "Expo"],
            description: "An AI-powered mobile assistant built with React Native that provides smart productivity features and a clean mobile-first experience.",
            image: "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBmdXR1cmlzdGljfGVufDB8fHx8MTc4NDI2NjM4M3ww&ixlib=rb-4.1.0&q=85",
            github: "https://github.com/koustav-saha-110/ai-pocket-agent",
            live: null,
        },
    ],
    HACKATHONS: [],
};

export const navSections = [
    { id: "about", label: "About", number: "01" },
    { id: "experience", label: "Experience", number: "02" },
    { id: "education", label: "Education", number: "03" },
    { id: "skills", label: "Skills", number: "04" },
    { id: "projects", label: "Projects", number: "05" },
    { id: "hackathons", label: "Hackathons", number: "06" },
    { id: "contact", label: "Contact", number: "07" },
];

export const profile = RESUME.PROFILE;
export const experience = RESUME.EXPERIENCE;
export const education = RESUME.EDUCATION;
export const skills = RESUME.SKILLS;
export const projects = RESUME.PROJECTS;
export const hackathons = RESUME.HACKATHONS;
