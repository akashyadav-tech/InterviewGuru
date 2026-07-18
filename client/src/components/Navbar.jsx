import React, { useState } from 'react'
import { motion } from "framer-motion"
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
        <div className="bg-[#FCFCFA] flex justify-center pt-5 px-4 sm:px-6 relative z-50 font-sans">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl bg-white rounded-lg border border-[#E7E5E1] py-3 px-5 sm:px-8 flex justify-between items-center shadow-sm relative"
            >
                {/* Logo Section */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
                >
                    <div className="bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] p-2 rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
                        <RiBrainLine className="text-base sm:text-lg" />
                    </div>
                    <h1 className="font-semibold text-base sm:text-lg text-[#14171F] tracking-tight hidden min-[360px]:block">
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
                            className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#E2E0DC] text-[#57534E] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold cursor-pointer hover:bg-[#F5F5F3] transition-colors"
                        >
                            <BsCoin size={15} className="text-[#0F6B5C]" />
                            <span>{userData?.credits || 0}</span>
                        </button>

                        {/* Credits Popup */}
                        {showCreditPopup && (
                            <div className="absolute right-0 top-[calc(100%+12px)] w-56 sm:w-60 bg-white border border-[#E7E5E1] rounded-lg p-4 sm:p-5 shadow-lg z-50 origin-top-right">
                                <p className="text-sm text-[#5B6169] mb-4 leading-relaxed">
                                    Need more credits to continue interviews?
                                </p>
                                <button
                                    onClick={() => {
                                        navigate("/pricing");
                                        setShowcreditPopup(false);
                                    }}
                                    className="w-full bg-[#0F6B5C] hover:bg-[#0B5347] text-white border-none py-2.5 rounded-md text-sm font-semibold cursor-pointer transition-colors"
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
                            className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] rounded-md flex items-center justify-center font-bold text-sm sm:text-base cursor-pointer hover:bg-[#CFE3DF] transition-colors"
                        >
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}
                        </button>

                        {/* User Popup */}
                        {showUserPopup && userData && (
                            <div className="absolute right-0 top-[calc(100%+12px)] w-48 bg-white border border-[#E7E5E1] rounded-lg p-4 shadow-lg z-50 origin-top-right">
                                <p className="text-sm text-[#14171F] font-semibold mb-3 truncate">
                                    {userData?.name}
                                </p>
                                
                                <button
                                    onClick={() => {
                                        navigate("/history");
                                        setShowUserPopup(false);
                                    }}
                                    className="w-full text-left bg-transparent border-none text-[#5B6169] font-medium text-sm py-2.5 hover:text-[#14171F] transition-colors border-b border-[#E7E5E1] cursor-pointer"
                                >
                                    Interview History
                                </button>
                                
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left bg-transparent border-none text-red-600 font-medium text-sm py-2.5 mt-1 hover:text-red-700 transition-colors flex items-center gap-2 cursor-pointer"
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
