import React from 'react'
import { RiBrainLine } from "react-icons/ri"
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion" // Standardized import
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { ServerUrl } from '../App';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google",
                { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
            console.log(result.data)
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    return (
        <div className={`w-full font-sans ${!isModel ? "min-h-screen bg-[#0B0F19] flex items-center justify-center py-20 px-4 sm:px-6" : ""}`}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} // Adjusted duration for smoother feel
                className={`w-full ${isModel ? "max-w-[420px] p-2 bg-transparent" : "max-w-[480px] p-10 sm:p-12 rounded-3xl bg-[#131C2F] border border-[#1E293B] shadow-[0_24px_60px_rgba(0,0,0,0.4)]"}`}
            >

                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-6">
                    <div className="bg-[#2563EB] text-white p-2 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.35)]">
                        <RiBrainLine size={20} />
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#F1F5F9] tracking-tight">
                        InterviewGuru.AI
                    </h2>
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#F1F5F9] leading-snug mb-4 tracking-tight">
                    Continue with <br className={isModel ? "hidden" : "block sm:hidden"} />
                    <span className="inline-flex items-center gap-1.5 bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#60A5FA] px-3 py-1 rounded-full text-base sm:text-lg align-middle translate-y-[-2px] sm:translate-y-[-1px] ml-1">
                        <IoSparkles size={16} />
                        AI Smart Interview
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-[#94A3B8] text-center text-sm sm:text-base leading-relaxed mb-8 max-w-[340px] mx-auto">
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                {/* Google Button */}
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 bg-white/5 border border-[#1E293B] hover:border-[#334155] hover:bg-white/10 rounded-full text-[#F1F5F9] text-sm sm:text-base font-semibold cursor-pointer transition-colors shadow-sm"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Auth
