import React from 'react'
import { RiBrainLine } from "react-icons/ri"

function Footer() {
    return (
        <div className="bg-[#FCFCFA] flex justify-center pt-10 pb-8 px-4 sm:px-6 font-sans">
            <div className="w-full max-w-6xl bg-white rounded-lg border border-[#E7E5E1] py-8 px-6 text-center shadow-sm">
                
                {/* Logo & Brand Name */}
                <div className="flex justify-center items-center gap-2.5 mb-4">
                    <div className="bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] p-2 rounded-md flex items-center justify-center">
                        <RiBrainLine size={18} />
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#14171F] tracking-tight">
                        InterviewGuru.AI
                    </h2>
                </div>
                
                {/* Description */}
                <p className="text-[#5B6169] text-sm max-w-[480px] mx-auto leading-relaxed">
                    AI-powered interview preparation platform designed to improve
                    communication skills, technical depth and professional confidence.
                </p>

                {/* Copyright Line */}
                <div className="mt-8 pt-6 border-t border-[#E7E5E1] text-[#57534E] text-xs font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} InterviewGuru.AI. All rights reserved.
                </div>
                
            </div>
        </div>
    )
}

export default Footer
