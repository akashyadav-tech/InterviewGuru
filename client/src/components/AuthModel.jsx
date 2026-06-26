import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 font-sans'>
            <div className="relative w-full max-w-[420px] bg-[#252833] border border-white/10 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-8">
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 border border-white/10 text-[#94A3B8] hover:text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                >
                    <FaTimes size={14} />
                </button>

                <Auth isModel={true} />
            </div>
        </div>
    )
}

export default AuthModel
