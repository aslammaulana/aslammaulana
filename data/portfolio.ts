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
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,    Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32 The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
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
