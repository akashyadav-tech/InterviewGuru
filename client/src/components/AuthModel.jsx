import React from 'react'
import { useEffect } from 'react'
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
       <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4'>
    <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        background: '#252833',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        padding: '32px'
    }}>
        <button
            onClick={onClose}
            style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94A3B8',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}>
            <FaTimes size={14} />
        </button>

        <Auth isModel={true} />
    </div>
</div>
    )
}

export default AuthModel