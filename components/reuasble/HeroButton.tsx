
"use client"
import router, { useRouter } from "next/navigation";
import { FC } from "react";

export const HeroButton: FC = () => {
    const router = useRouter();
    return (
        <div>
            <button
                onClick={() => router.push('/#contact')}
                className="bg-[#1D2939] text-white px-5 py-3 w-full rounded-full mt-5 hover:scale-105 transition-all"
            >
            <span className="text-lg">Free 20-minute consultation</span>
            </button>
        </div>
    );
}
