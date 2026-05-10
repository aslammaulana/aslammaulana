import Image from "next/image";
import { profileCard } from "@/data/profile";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ProfileCard() {
    return (
        <div
            className="hidden lg:flex flex-col rounded-2xl border border-white/10 overflow-hidden p-6 gap-5"
            style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
        >
            {/* Profile Photo — 50% width, left */}
            <div className="w-2/5 mb-[-6px] aspect-square overflow-hidden rounded-full mb-1">
                <Image
                    src={profileCard.photo}
                    alt={profileCard.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Name + role */}
            <div className="flex flex-col gap-1">
                <p className="text-white font-bold text-[19px] leading-snug">
                    {profileCard.name}
                </p>
                <p className="text-white/60 text-[14px]">{profileCard.role}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/8" />

            {/* Contact info */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <Phone size={17} className="text-white/40 shrink-0" />
                    <span className="text-white/60 text-[14px]">{profileCard.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail size={17} className="text-white/40 shrink-0" />
                    <span className="text-white/60 text-[14px] break-all">{profileCard.email}</span>
                </div>
            </div>


            {/* Buttons */}
            <div className="flex flex-col gap-3">
                <a
                    href={profileCard.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-all duration-200"
                >
                    View CV / Resume
                </a>
                <a
                    href={profileCard.contactUrl}
                    className="w-full text-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200"
                >
                    Contact Me
                </a>
            </div>
        </div>
    );
}
