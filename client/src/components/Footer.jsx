import React from 'react'
import { RiBrainLine } from "react-icons/ri"

function Footer() {
    return (
        <div className="bg-[#0B0F19] flex justify-center pt-10 pb-8 px-4 sm:px-6 font-sans">
            <div className="w-full max-w-6xl bg-[#131C2F] rounded-2xl border border-[#1E293B] py-8 px-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                
                {/* Logo & Brand Name */}
                <div className="flex justify-center items-center gap-2.5 mb-4">
                    <div className="bg-[#2563EB] text-white p-2 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.35)]">
                        <RiBrainLine size={18} />
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#FFFFFF] tracking-tight">
                        InterviewGuru.AI
                    </h2>
                </div>
                
                {/* Description */}
                <p className="text-[#94A3B8] text-sm max-w-[480px] mx-auto leading-relaxed">
                    AI-powered interview preparation platform designed to improve
                    communication skills, technical depth and professional confidence.
                </p>

                {/* Copyright Line */}
                <div className="mt-8 pt-6 border-t border-[#1E293B] text-[#94A3B8] text-xs font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} InterviewGuru.AI. All rights reserved.
                </div>
                
            </div>
        </div>
    )
}

export default Footer
