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
        <div className={`w-full font-sans ${!isModel ? "min-h-screen bg-[#1C1F26] flex items-center justify-center py-20 px-4 sm:px-6" : ""}`}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} // Adjusted duration for smoother feel
                className={`w-full ${isModel ? "max-w-[420px] p-2 bg-transparent" : "max-w-[480px] p-10 sm:p-12 rounded-3xl bg-[#252833] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]"}`}
            >

                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-6">
                    <div className="bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white p-2 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(20,184,166,0.35)]">
                        <RiBrainLine size={20} />
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#F1F5F9] tracking-tight">
                        InterviewGuru.AI
                    </h2>
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#F1F5F9] leading-snug mb-4 tracking-tight">
                    Continue with <br className={isModel ? "hidden" : "block sm:hidden"} />
                    <span className="inline-flex items-center gap-1.5 bg-[#14B8A6]/10 border border-[#14B8A6]/25 text-[#2DD4BF] px-3 py-1 rounded-full text-base sm:text-lg align-middle translate-y-[-2px] sm:translate-y-[-1px] ml-1">
                        <IoSparkles size={16} />
                        AI Smart Interview
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-[#64748B] text-center text-sm sm:text-base leading-relaxed mb-8 max-w-[340px] mx-auto">
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                {/* Google Button */}
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-full text-[#F1F5F9] text-sm sm:text-base font-semibold cursor-pointer transition-colors shadow-sm"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Auth
