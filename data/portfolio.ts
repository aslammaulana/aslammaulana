export type PortfolioItem = {
    category: string;
    title: string;
    description: string;
    tags: string[];
    previewUrl: string;
    image: string;
    /** Array of images for the popup carousel */
    images: string[];
    publishedAt?: string;
    features?: string[];
    /** "left" = image on right, text on left | "right" = image on left, text on right */
    imagePosition: "left" | "right";
    color: string;
};

export const portfolioItems: PortfolioItem[] = [
    {
        category: "Company Profile",
        title: "Ibadurrahman Travel",
        color: "0c4778",
        description:
            "Redesigning a core internal company service.",
        tags: ["Wordpress", "Elementor", "Crocoblock – Jet Engine"],
        previewUrl: "https://tmnbh.vercel.app/dashboard",
        image: "/assets/porto1.png",
        images: ["/assets/porto1.png", "/assets/porto2.png", "/assets/porto1.png"],
        publishedAt: "2023",
        features: [
            "Responsive company profile website",
            "Custom Jet Engine post types",
            "Dynamic pilgrimage package listings",
        ],
        imagePosition: "left",
    },
    {
        category: "NGO Profile",
        title: "LT3Q Elmasudy",
        color: "6b6b6b",
        description:
            "Making entertainment more uniting.",
        tags: ["Next.js", "Tailwind", "Gemini Api"],
        previewUrl: "#",
        image: "/assets/porto2.png",
        images: ["/assets/porto2.png", "/assets/porto1.png", "/assets/porto2.png"],
        publishedAt: "2024",
        features: [
            "AI-powered Q&A with Gemini API",
            "Modern NGO profile page",
            "Fully responsive design",
        ],
        imagePosition: "right",
    },
    {
        category: "Company Profile",
        title: "Ibadurrahman Travel",
        color: "0e5c77",
        description:
            "Envisioning a future of playtesting for all developers.",
        tags: ["Wordpress", "Elementor", "Crocoblock – Jet Engine"],
        previewUrl: "#",
        image: "/assets/porto1.png",
        images: ["/assets/porto1.png", "/assets/porto2.png"],
        publishedAt: "2023",
        features: [
            "Responsive company profile website",
            "Custom Jet Engine post types",
            "Dynamic pilgrimage package listings",
        ],
        imagePosition: "left",
    },
];
