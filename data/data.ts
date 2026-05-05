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
        logo: "/assets/experience/blk-banda-aceh.jpg",
        organizer: "BPVP Banda Aceh (BLK Banda Aceh)",
        period: "Apr 2024 - Jul 2024",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "#",
        points: [
            "Implementing and developing user interfaces for web-based applications.",
            "Writing clean, structured code in accordance with industry guidelines and best practices.",
            "Utilizing SQL for database management and data manipulation.",
            "Creating comprehensive program code documentation.",
            "Performing systematic debugging and troubleshooting of web applications.",
        ],
    },
    {
        name: "Mastering Layout & Social Media Design",
        logo: "/assets/experience/rubrik-grafis.jpg",
        organizer: "RubrikGrafis.com – Putra Al-Banjary (Online Course)",
        period: "2023",
        location: "Online",
        certificateUrl: "#",
        points: [
            "Understanding color theory and harmonious color combinations for design purposes.",
            "Applying fundamental design principles including Point of View, Balance, and Visual Hierarchy.",
            "Designing engaging and professional social media content for various platforms.",
        ],
    },
    {
        name: "Graphic Design",
        logo: "/assets/experience/blk-banda-aceh.jpg",
        organizer: "BPVP Banda Aceh (BLK Banda Aceh)",
        period: "2023",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "#",
        points: [
            "Applying core principles of graphic design in practical projects.",
            "Studying and implementing design briefs to meet client and project objectives.",
            "Exploring visual communication techniques including typography, illustration, and photography.",
            "Operating industry-standard design software, including Adobe Illustrator and Adobe Photoshop.",
        ],
    },
    {
        name: "Digital Marketing",
        logo: "/assets/experience/blk-banda-aceh.jpg",
        organizer: "BPVP Banda Aceh (BLK Banda Aceh)",
        period: "2022",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "#",
        points: [
            "Conducting market research and identifying target audiences.",
            "Developing effective and goal-oriented digital marketing strategies.",
            "Measuring and analyzing digital marketing performance using relevant metrics.",
            "Optimizing digital marketing campaigns for improved reach and conversion.",
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
