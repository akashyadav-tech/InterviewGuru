import React from 'react'
import { motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { BsCoin } from "react-icons/bs";
import { RiBrainLine } from "react-icons/ri"
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
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
    const dispatch=useDispatch()
    const [showAuth,setShowAuth]=useState(false)


    const handleLogout = async () => {
    try {
        await axios.get(ServerUrl + "/api/auth/logout" ,
        {withCredentials:true})
        dispatch(setUserData(null))
        setShowCreditPopup(false)
        setShowUserPopup(false)
        navigate("/")

    } catch (error) {
        console.log(error)
    }
} 

    return (
        <div style={{ background: '#1C1F26', display: 'flex', justifyContent: 'center', padding: '20px 16px 0' }}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    width: '100%',
                    maxWidth: '1100px',
                    background: '#252833',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '14px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
                }}>

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                        color: '#fff',
                        padding: '8px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 14px rgba(20,184,166,0.35)'
                    }}>
                        <RiBrainLine size={18} />
                    </div>
                    <h1 style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#F1F5F9',
                        letterSpacing: '-0.01em'
                    }}>
                        InterviewGuru.AI
                    </h1>
                </div>

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>

                    {/* Credits Button */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return; }
                                setShowcreditPopup(!showCreditPopup);
                                setShowUserPopup(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                background: 'rgba(20,184,166,0.12)',
                                border: '1px solid rgba(20,184,166,0.25)',
                                color: '#2DD4BF',
                                padding: '8px 16px',
                                borderRadius: '999px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}>
                            <BsCoin size={16} />
                            {userData?.credits || 0}
                        </button>

                        {showCreditPopup && (
                            <div style={{
                                position: 'absolute',
                                right: '-40px',
                                top: 'calc(100% + 12px)',
                                width: '240px',
                                background: '#252833',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                padding: '18px',
                                zIndex: 50,
                                boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
                            }}>
                                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '14px', lineHeight: 1.6 }}>
                                    Need more credits to continue interviews?
                                </p>
                                <button
                                    onClick={() => navigate("/pricing")}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}>
                                    Buy more credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Avatar */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return; }
                                setShowUserPopup(!showUserPopup);
                                setShowcreditPopup(false);
                            }}
                            style={{
                                width: '38px',
                                height: '38px',
                                background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: '0 0 14px rgba(20,184,166,0.3)'
                            }}>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}
                        </button>
                       

                        {showUserPopup && userData &&  (
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: 'calc(100% + 12px)',
                                width: '200px',
                                background: '#252833',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                padding: '16px',
                                zIndex: 50,
                                boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
                            }}>
                                <p style={{ fontSize: '0.9rem', color: '#2DD4BF', fontWeight: 600, marginBottom: '12px' }}>
                                    {userData?.name}
                                </p>
                                
                                <button
                                    onClick={() => navigate("/history")}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: '#94A3B8',
                                        fontSize: '0.875rem',
                                        padding: '8px 0',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                                    }}>
                                    Interview History
                                </button>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: '#FB7185',
                                        fontSize: '0.875rem',
                                        padding: '8px 0',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginTop: '4px'
                                    }}>
                                    <HiOutlineLogout size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )

}

export default Navbar