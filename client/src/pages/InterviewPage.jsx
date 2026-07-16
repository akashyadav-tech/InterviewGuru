import React, { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'
import Step3Report from '../components/Step3Report'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

function InterviewPage() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const [interviewData, setInterviewData] = useState(null)
    
    const handleBack = () => {
        if (step === 1) {
            navigate('/')
        } else if (step === 2) {
            const confirmExit = window.confirm("Are you sure you want to exit? Your interview progress will be lost.");
            if (confirmExit) {
                setStep(1);
            }
        }
    }
    
    return (
        <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] relative font-sans overflow-x-hidden">
            
            {/* Back Button */}
            {step !== 3 && (
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 sm:gap-3 p-3 sm:px-4 sm:py-2.5 rounded-full bg-[#131C2F] border border-[#334155] shadow-lg hover:border-[#60A5FA]/50 hover:bg-[#1E293B] transition-all group cursor-pointer"
                    >
                        <FaArrowLeft className="text-[#60A5FA] text-sm sm:text-base group-hover:text-[#93C5FD] transition-colors" />
                        <span className="text-[#94A3B8] text-sm font-medium hidden sm:block group-hover:text-[#F8FAFC] transition-colors">
                            {step === 1 ? "Back to Home" : "Exit Interview"}
                        </span>
                    </button>
                </div>
            )}
            
            {step === 1 && (
                <Step1SetUp onStart={(data) => {
                    setInterviewData(data);
                    setStep(2)
                }} />
            )}

            {step === 2 && (
                <Step2Interview interviewData={interviewData}
                    onFinish={(report) => {
                        setInterviewData(report);
                        setStep(3)
                    }}
                />
            )}

            {step === 3 && (
                <Step3Report report={interviewData} />
            )}
        </div>
    )
}

export default InterviewPage
