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
        name: "Pengoperasian Tools Generative AI untuk Konten Bisnis & Digital",
        logo: "/assets/experience/blk-banda-aceh.jpg",
        organizer: "BPVP Banda Aceh",
        period: "Agustus 2026",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "",
        points: [
            "Operating Generative AI tools to produce high-quality text and visual content for business and digital purposes.",
            "Designing AI-optimized digital content strategies, including the use of AI image generators for creative production.",
            "Building business automation workflows using the n8n platform to integrate and streamline operations efficiently.",
            "Applying Vibe Coding methodology to rapidly develop AI-powered applications in a productive and iterative manner.",
        ],
    },
    {
        name: "Kewirausahaan Get Ahead",
        logo: "/assets/experience/blk-banda-aceh.jpg",
        organizer: "BPVP Banda Aceh",
        period: "2026",
        location: "Banda Aceh, Indonesia",
        certificateUrl: "",
        points: [
            "Understanding the fundamentals of entrepreneurship and cultivating an entrepreneurial mindset.",
            "Identifying business opportunities and developing structured, actionable business plans.",
            "Managing basic business finances and formulating effective product and service marketing strategies.",
            "Building a business brand and understanding the legal aspects of small and medium enterprises.",
        ],
    },
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
