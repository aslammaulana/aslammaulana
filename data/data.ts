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
        company: "Depo Zahra Bangunan",
        logo: "/assets/experience/dzb.jpg",
        role: "Social Media Specialist",
        period: "Mar 2026 - May 2026",
        location: "Aceh Besar, Indonesia",
        points: [
            "Produced daily Instagram video content covering delivery updates, new product arrivals, product reviews, and brand highlights using CapCut and Adobe Illustrator.",
            "Refreshed Instagram cover and feed visuals to align with monthly promotions and brand consistency.",
            "Managed twice-weekly paid ad campaigns via Instagram Boost to drive product visibility and reach.",
        ],
    },
    {
        company: "PenaCinta & PenaDevs",
        logo: "/assets/experience/penacinta.jpg",
        role: "Founder & WordPress Developer",
        period: "2023 - 2024",
        location: "Banda Aceh, Indonesia",
        points: [
            "Built and launched PenaCinta, a B2C digital wedding invitation platform serving 40+ customers, featuring 45+ customizable themes with subscription-based access (3–6 months) managed through a custom admin approval system.",
            "Built and launched PenaDevs, a B2B wedding invitation template marketplace targeting developers and invitation service owners, achieving 150+ template sales.",
            "Developed both platforms independently from scratch using WordPress, Elementor, and a custom CRUD-based SaaS system handling user access management and subscription activation.",
        ],
    },
    {
        company: "Aceh Youth Creative Hub (AMANAH)",
        logo: "/assets/experience/amanah.jpg",
        role: "Packaging House Coordinator",
        period: "Sep 2023 - Feb 2024",
        location: "Aceh Besar, Indonesia",
        points: [
            "Led a team of 10+ in building the Packaging House operations from the ground up, culminating in the official launch attended by the President of Indonesia on October 15, 2023, including coordinating a product exhibition for the presidential visit.",
            "Managed packaging production for dozens of local SMEs, covering products such as coffee, patchouli/nilam perfume, handcrafts, tumblers, stickers, and leaflets.",
            "Oversaw inventory and daily operations of production machinery — including IECHO cutting plotter, Mimaki sticker printer, digital screen printing, and laminating machines — ensuring smooth workflow and on-time delivery.",
            "Designed promotional visual materials and conducted print quality control, ensuring color accuracy and output quality standards met client requirements.",
        ],
    },
    {
        company: "Fhandika Boutique Hotel",
        logo: "/assets/experience/fhandika.jpg",
        role: "Branding & Print Design",
        period: "December 2023",
        location: "Ulee Lhee, Banda Aceh, Indonesia",
        points: [
            "Managed an end-to-end branding project for Fhandika Boutique Hotel, handling client communication, design execution, and print production oversight.",
            "Designed 2 banners, a curated book menu, and 1,000 promotional leaflets with a modern, high-contrast aesthetic aligned with the hotel's visual identity.",
        ],
    },
    {
        company: "Freelance",
        logo: "/assets/experience/freelance.jpg",
        role: "WordPress Web Developer",
        period: "2023",
        location: "Remote",
        points: [
            "Designed and developed 3 company profile websites from scratch for Islamic-based organizations (LT3Q Elmasudy, Asyraf Travel, Ibadurrahman Travel) using WordPress, Elementor, and Jet Engine Crocoblock.",
            "Handled end-to-end development independently, covering UI design, layout building, and content integration for each client.",
        ],
    },
    {
        company: "PT. Asyraf Travel Wisata Islami",
        logo: "/assets/experience/asyraf.jpg",
        role: "Social Media Designer",
        period: "Early 2023",
        location: "Banda Aceh, Indonesia",
        points: [
            "Designed approximately 15 Instagram feed contents for an Umrah travel agency, including promotional posts and highlight icons/covers, with a consistent dark-luxury aesthetic aligned with the brand identity.",
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
    photo: "/homepage/profile.jpg",
    location: "Aceh Besar, Indonesia",
    phone: "+62 853 5607 8836",
    email: "aslammaulana10@gmail.com",
    cvUrl: "#",
    contactUrl: "#",
};
