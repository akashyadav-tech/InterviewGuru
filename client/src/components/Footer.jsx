import React from 'react'
import { RiBrainLine } from "react-icons/ri"

function Footer() {
    return (
        <div className="bg-[#1C1F26] flex justify-center pt-10 pb-8 px-4 sm:px-6 font-sans">
            <div className="w-full max-w-6xl bg-[#252833] rounded-2xl border border-white/5 py-8 px-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                
                {/* Logo & Brand Name */}
                <div className="flex justify-center items-center gap-2.5 mb-4">
                    <div className="bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white p-2 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(20,184,166,0.35)]">
                        <RiBrainLine size={18} />
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#F1F5F9] tracking-tight">
                        InterviewGuru.AI
                    </h2>
                </div>
                
                {/* Description */}
                <p className="text-[#64748B] text-sm max-w-[480px] mx-auto leading-relaxed">
                    AI-powered interview preparation platform designed to improve
                    communication skills, technical depth and professional confidence.
                </p>

                {/* Copyright Line (Optional but looks professional) */}
                <div className="mt-8 pt-6 border-t border-white/5 text-[#64748B] text-xs font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} InterviewGuru.AI. All rights reserved.
                </div>
                
            </div>
        </div>
    )
}

export default Footer
