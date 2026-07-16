import React, { useState } from 'react'
import { motion } from "framer-motion" // Use standard framer-motion
import { useDispatch, useSelector } from 'react-redux'
import { BsCoin } from "react-icons/bs";
import { RiBrainLine } from "react-icons/ri"
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector(state => state.user)
    const [showCreditPopup, setShowcreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false)

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout",
                { withCredentials: true })
            dispatch(setUserData(null))
            setShowcreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // Navbar Wrapper
        <div className="bg-[#0B0F19] flex justify-center pt-5 px-4 sm:px-6 relative z-50 font-sans">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl bg-[#131C2F] rounded-2xl border border-[#1E293B] py-3 px-5 sm:px-8 flex justify-between items-center shadow-[0_4px_24px_rgba(0,0,0,0.3)] relative"
            >
                {/* Logo Section */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
                >
                    <div className="bg-[#2563EB] text-white p-2 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.35)] group-hover:scale-105 transition-transform">
                        <RiBrainLine className="text-base sm:text-lg" />
                    </div>
                    <h1 className="font-semibold text-base sm:text-lg text-[#F1F5F9] tracking-tight hidden min-[360px]:block">
                        InterviewGuru.AI
                    </h1>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 sm:gap-4 relative">

                    {/* Credits Button */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return; }
                                setShowcreditPopup(!showCreditPopup);
                                setShowUserPopup(false);
                            }}
                            className="flex items-center gap-1.5 sm:gap-2 bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#60A5FA] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer hover:bg-[#2563EB]/20 transition-colors"
                        >
                            <BsCoin size={15} />
                            <span>{userData?.credits || 0}</span>
                        </button>

                        {/* Credits Popup */}
                        {showCreditPopup && (
                            <div className="absolute right-0 top-[calc(100%+12px)] w-56 sm:w-60 bg-[#131C2F] border border-[#1E293B] rounded-2xl p-4 sm:p-5 shadow-2xl z-50 origin-top-right">
                                <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
                                    Need more credits to continue interviews?
                                </p>
                                <button
                                    onClick={() => {
                                        navigate("/pricing");
                                        setShowcreditPopup(false);
                                    }}
                                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-none py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                                >
                                    Buy more credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Avatar */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return; }
                                setShowUserPopup(!showUserPopup);
                                setShowcreditPopup(false);
                            }}
                            className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2563EB] text-white border-none rounded-full flex items-center justify-center font-bold text-sm sm:text-base cursor-pointer shadow-[0_0_14px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform"
                        >
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}
                        </button>

                        {/* User Popup */}
                        {showUserPopup && userData && (
                            <div className="absolute right-0 top-[calc(100%+12px)] w-48 bg-[#131C2F] border border-[#1E293B] rounded-2xl p-4 shadow-2xl z-50 origin-top-right">
                                <p className="text-sm text-[#60A5FA] font-semibold mb-3 truncate">
                                    {userData?.name}
                                </p>
                                
                                <button
                                    onClick={() => {
                                        navigate("/history");
                                        setShowUserPopup(false);
                                    }}
                                    className="w-full text-left bg-transparent border-none text-[#94A3B8] text-sm py-2.5 hover:text-white transition-colors border-b border-[#1E293B] cursor-pointer"
                                >
                                    Interview History
                                </button>
                                
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left bg-transparent border-none text-rose-400 text-sm py-2.5 mt-1 hover:text-rose-300 transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <HiOutlineLogout size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Auth Modal */}
            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar
