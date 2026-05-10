export type LanguageItem = {
    language: string;
    flag: string;
    level: string;
};

export const languageItems: LanguageItem[] = [
    { language: "Indonesia", flag: "/homepage/indo.png", level: "Native" },
    { language: "English", flag: "/homepage/english.png", level: "Intermediate" },
    { language: "Arabic", flag: "/homepage/arabic.png", level: "Intermediate" },
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
