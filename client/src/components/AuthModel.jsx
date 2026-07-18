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
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#14171F]/30 backdrop-blur-sm px-4 font-sans'>
            <div className="relative w-full max-w-[420px] bg-white border border-[#E7E5E1] rounded-lg shadow-[0_24px_50px_rgba(0,0,0,0.1)] p-8">
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white hover:bg-[#F5F5F3] border border-[#E2E0DC] text-[#5B6169] hover:text-[#14171F] w-8 h-8 rounded-md flex items-center justify-center cursor-pointer transition-colors"
                >
                    <FaTimes size={14} />
                </button>

                <Auth isModel={true} />
            </div>
        </div>
    )
}

export default AuthModel
