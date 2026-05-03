export const skillItems: string[] = [
    "HTML", "CSS", "JavaScript", "PHP", "Go", "Node.js",
    "TypeScript", "React.js", "Next.js", "Laravel", "WordPress",
    "MySQL", "PostgreSQL", "MongoDB", "Bootstrap", "Tailwind CSS",
    "Elementor", "GIT", "Docker", "Adobe Illustrator"
];
export type PortfolioItem = {
    category: string;
    title: string;
    description: string;
    tags: string[];
    previewUrl: string;
    image: string;
    /** "left" = image on right, text on left | "right" = image on left, text on right */
    imagePosition: "left" | "right";
};

export const portfolioItems: PortfolioItem[] = [
    {
        category: "Company Profile",
        title: "Ibadurrahman Travel",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
        tags: ["Wordpress", "Elementor", "Crocoblock – Jet Engine"],
        previewUrl: "#",
        image: "/assets/porto1.png",
        imagePosition: "left",
    },
    {
        category: "NGO Profile",
        title: "LT3Q Elmasudy",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
        tags: ["Next.js", "Tailwind", "Gemini Api"],
        previewUrl: "#",
        image: "/assets/porto2.png",
        imagePosition: "right",
    },
    {
        category: "Company Profile",
        title: "Ibadurrahman Travel",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
        tags: ["Wordpress", "Elementor", "Crocoblock – Jet Engine"],
        previewUrl: "#",
        image: "/assets/porto1.png",
        imagePosition: "left",
    }
];

export type ExperienceItem = {
    company: string;
    /** Path to logo image in /public, or leave empty to use placeholder */
    logo: string;
    role: string;
    period: string;
    location: string;
    points: string[];
};

export const experienceItems: ExperienceItem[] = [
    {
        company: "Kementerian Ketenagakerjaan Republik Indonesia",
        logo: "/assets/experience1.png",
        role: "Pranata Komputer Ahli Pertama (CPNS)",
        period: "May 2025 - Present",
        location: "South Jakarta, Indonesia",
        points: [
            "Assigned to the Direktorat Bina Penempatan Tenaga Kerja under the Direktorat Jenderal Pembinaan Tenaga Kerja dan Perluasan Kesempatan Kerja (Ditjen Binapenta PKK), Kementerian Ketenagakerjaan Republik Indonesia.",
            "Support the implementation of workforce placement programs and policies through information technology solutions.",
            "Manage and utilize labor market data to support policy development and decision-making.",
            "Contribute to the digital transformation of public services related to workforce placement.",
        ],
    },
    {
        company: "Kensen Grik Teknokons",
        logo: "/assets/experience1.png",
        role: "Frontend Developer",
        period: "Nov 2024 - Mar 2025",
        location: "Banda Aceh, Indonesia",
        points: [
            "Developed and maintained responsive web applications using React and Next.js.",
            "Collaborated with backend developers to integrate RESTful APIs.",
            "Improved UI performance and code quality through code reviews and refactoring.",
        ],
    },
    {
        company: "Merkle Innovation",
        logo: "/assets/experience1.png",
        role: "Frontend Developer",
        period: "Dec 2023 - Apr 2024",
        location: "West Jakarta, Indonesia (Remote)",
        points: [
            "Built reusable UI components with React and Tailwind CSS.",
            "Worked closely with the design team to implement pixel-perfect layouts.",
            "Participated in agile sprints and contributed to product roadmap discussions.",
        ],
    },
];

export type TrainingItem = {
    name: string;
    logo: string;
    organizer: string;
    period: string;
    location: string;
    points: string[];
    /** URL to certificate, or empty string if none */
    certificateUrl: string;
};

export const trainingItems: TrainingItem[] = [
    {
        name: "Web Programming",
        logo: "/assets/experience1.png",
        organizer: "BPVP Banda Aceh (BLK Banda Aceh)",
        period: "Apr 2024 - Jul 2024",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "#",
        points: [
            "Learn HTML and CSS as the foundation for structuring and styling web pages.",
            "Use PHP for both front-end and back-end development, embedding HTML within PHP for dynamic content.",
            "Integrate MySQL to manage data and perform CRUD (Create, Read, Update, Delete) operations.",
            "Develop a functional and dynamic web application using the acquired skills.",
        ],
    },
    {
        name: "Generasi GIGIH 3.0 Full Stack Engineer",
        logo: "/assets/experience1.png",
        organizer: "GoTo Impact Foundation",
        period: "Nov 2024 - Mar 2025",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "#",
        points: [
            "Learned full-stack web development with React.js and Node.js.",
            "Built and deployed production-ready applications with REST APIs.",
            "Collaborated in teams following agile methodology and code review practices.",
        ],
    },
    {
        name: "Mobile Programming",
        logo: "/assets/experience1.png",
        organizer: "BPVP Banda Aceh (BLK Banda Aceh)",
        period: "Dec 2023 - Apr 2024",
        location: "West Jakarta, Indonesia (Remote)",
        certificateUrl: "#",
        points: [
            "Developed Android and iOS applications using React Native.",
            "Integrated backend APIs and implemented state management.",
            "Designed mobile-first UIs following platform-specific guidelines.",
        ],
    },
];

export type LanguageItem = {
    language: string;
    flag: string;
    level: string;
};

export const languageItems: LanguageItem[] = [
    { language: "Indonesia", flag: "/assets/experience1.png", level: "Native" },
    { language: "English", flag: "/assets/experience1.png", level: "Intermediate" },
    { language: "Arabic", flag: "/assets/experience1.png", level: "Intermediate" },
];

export const profileCard = {
    name: "Maulana Aslam",
    role: "Frontend Developer",
    photo: "/assets/porto1.png",
    location: "Aceh Besar, Indonesia",
    phone: "+62 853 5607 8836",
    email: "aslammaulana10@gmail.com",
    cvUrl: "#",
    contactUrl: "#",
};
