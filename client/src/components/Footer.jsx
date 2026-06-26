import React from 'react'
import { RiBrainLine } from "react-icons/ri"

function Footer() {
    return (
        <div style={{ background: '#1C1F26', display: 'flex', justifyContent: 'center', padding: '40px 16px 32px' }}>
            <div style={{
                width: '100%',
                maxWidth: '1100px',
                background: '#252833',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '32px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
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
                        <RiBrainLine size={16} />
                    </div>
                    <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#F1F5F9', letterSpacing: '-0.01em' }}>
                        InterviewGuru.AI
                    </h2>
                </div>
                <p style={{ color: '#64748B', fontSize: '0.875rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                    AI-powered interview preparation platform designed to improve
                    communication skills, technical depth and professional confidence.
                </p>
            </div>
        </div>
    )
}

export default Footer