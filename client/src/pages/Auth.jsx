import React from 'react'
import { RiBrainLine } from "react-icons/ri"
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion"
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
        <div className={`w-full font-sans ${!isModel ? "min-h-screen bg-[#FCFCFA] flex items-center justify-center py-20 px-4 sm:px-6" : ""}`}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`w-full ${isModel ? "max-w-[420px] p-2 bg-transparent" : "max-w-[480px] p-10 sm:p-12 rounded-lg bg-white border border-[#E7E5E1] shadow-[0_24px_50px_rgba(0,0,0,0.06)]"}`}
            >

                {/* Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-6">
                    <div className="bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] p-2 rounded-md flex items-center justify-center">
                        <RiBrainLine size={20} />
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#14171F] tracking-tight">
                        InterviewGuru.AI
                    </h2>
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-medium text-center text-[#14171F] leading-snug mb-4 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                    Continue with <br className={isModel ? "hidden" : "block sm:hidden"} />
                    <span className="inline-flex items-center gap-1.5 bg-white border border-[#E2E0DC] text-[#57534E] px-3 py-1 rounded-md text-sm sm:text-base align-middle translate-y-[-2px] sm:translate-y-[-1px] ml-1 uppercase tracking-wider font-mono">
                        <IoSparkles size={14} className="text-[#0F6B5C]" />
                        AI Smart Interview
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-[#5B6169] text-center text-sm sm:text-base leading-relaxed mb-8 max-w-[340px] mx-auto">
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                {/* Google Button */}
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 bg-white border border-[#E2E0DC] hover:border-[#D6D3CE] hover:bg-[#F5F5F3] rounded-lg text-[#14171F] text-sm sm:text-base font-semibold cursor-pointer transition-colors shadow-sm"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Auth
