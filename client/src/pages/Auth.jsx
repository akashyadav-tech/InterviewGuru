import React from 'react'
import { RiBrainLine } from "react-icons/ri"
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
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
        <div style={{
            width: '100%',
            ...(isModel ? {} : {
                minHeight: '100vh',
                background: '#1C1F26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 24px'
            })
        }}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                style={{
                    width: '100%',
                    maxWidth: isModel ? '420px' : '480px',
                    padding: isModel ? '8px' : '48px',
                    borderRadius: isModel ? '0' : '28px',
                    background: isModel ? 'transparent' : '#252833',
                    border: isModel ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isModel ? 'none' : '0 24px 60px rgba(0,0,0,0.4)'
                }}>

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
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
                        <RiBrainLine size={20} />
                    </div>
                    <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#F1F5F9', letterSpacing: '-0.01em' }}>
                        InterviewGuru.AI
                    </h2>
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: '#F1F5F9',
                    lineHeight: 1.35,
                    marginBottom: '16px',
                    letterSpacing: '-0.02em'
                }}>
                    Continue with{' '}
                    <span style={{
                        background: 'rgba(20,184,166,0.12)',
                        border: '1px solid rgba(20,184,166,0.25)',
                        color: '#2DD4BF',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.9em'
                    }}>
                        <IoSparkles size={14} />
                        AI Smart Interview
                    </span>
                </h1>

                {/* Subtitle */}
                <p style={{
                    color: '#64748B',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                    maxWidth: '340px',
                    margin: '0 auto 32px'
                }}>
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                {/* Google Button */}
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '13px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '999px',
                        color: '#F1F5F9',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}>
                    <FcGoogle size={20} />
                    Continue with Google
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Auth