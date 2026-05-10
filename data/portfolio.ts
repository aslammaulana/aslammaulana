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
};

export const portfolioItems: PortfolioItem[] = [
    {
        category: "Company Profile",
        title: "Ibadurrahman Travel",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
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
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
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
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
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
