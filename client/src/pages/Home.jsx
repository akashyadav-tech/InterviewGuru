import React from 'react'
import { motion } from "motion/react"
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector(state => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#1C1F26', color: '#E8EAF0', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <div style={{ flex: 1, padding: '80px 24px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{
              background: 'rgba(20, 184, 166, 0.12)',
              border: '1px solid rgba(20, 184, 166, 0.3)',
              color: '#2DD4BF',
              fontSize: '13px',
              padding: '8px 20px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.03em'
            }}>
              <HiSparkles size={15} />
              AI Powered Smart Interview Platform
            </div>
          </div>

          {/* Headline */}
          <div style={{ position: 'relative', textAlign: 'center', marginBottom: '112px' }}>
            {/* Glow behind headline */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '700px',
              height: '300px',
              background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.13) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                maxWidth: '820px',
                margin: '0 auto 24px',
                color: '#F1F5F9'
              }}>
              Practice Interviews with{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2DD4BF 0%, #06B6D4 60%, #818CF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                AI Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.15 }}
              style={{
                position: 'relative',
                zIndex: 1,
                color: '#94A3B8',
                fontSize: '1.1rem',
                maxWidth: '520px',
                margin: '0 auto 40px',
                lineHeight: 1.7
              }}>
              Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance evaluation.
            </motion.p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
              <motion.button
                onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/interview") }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 36px',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 0 28px rgba(20,184,166,0.35)',
                  letterSpacing: '0.01em'
                }}>
                Start Interview →
              </motion.button>

              <motion.button
                onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/history") }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'transparent',
                  color: '#CBD5E1',
                  border: '1px solid rgba(148,163,184,0.3)',
                  padding: '14px 36px',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '0.01em'
                }}>
                View History
              </motion.button>
            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '120px' }}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ color: '#2DD4BF', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '40px' }}>
              How It Works
            </motion.p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', width: '100%' }}>
              {[
                { icon: <BsRobot size={22} />, step: '01', title: 'Role & Experience Selection', desc: 'AI adjusts difficulty based on your selected job role and experience level.' },
                { icon: <BsMic size={22} />, step: '02', title: 'Smart Voice Interview', desc: 'Dynamic follow-up questions adapt in real time based on your answers.' },
                { icon: <BsClock size={22} />, step: '03', title: 'Timer Based Simulation', desc: 'Real interview pressure with time tracking to sharpen your performance.' }
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(20,184,166,0.3)' }}
                  style={{
                    background: '#252833',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '32px 28px',
                    width: '300px',
                    maxWidth: '90vw',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    position: 'relative'
                  }}>
                  {/* Step number watermark */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '20px',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    userSelect: 'none'
                  }}>{item.step}</div>

                  <div style={{
                    background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(6,182,212,0.1))',
                    border: '1px solid rgba(20,184,166,0.25)',
                    color: '#2DD4BF',
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    {item.icon}
                  </div>

                  <div style={{ fontSize: '11px', color: '#2DD4BF', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 650, color: '#F1F5F9', marginBottom: '10px', lineHeight: 1.4 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── AI CAPABILITIES ── */}
          <div style={{ marginBottom: '120px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ color: '#2DD4BF', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '14px' }}>
                Capabilities
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>
                Advanced AI <span style={{ color: '#2DD4BF' }}>Features</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '20px' }}>
              {[
                { image: evalImg, icon: <BsBarChart size={18} />, title: 'AI Answer Evaluation', desc: 'Scores communication, technical accuracy, and confidence in real time.' },
                { image: resumeImg, icon: <BsFileEarmarkText size={18} />, title: 'Resume-Based Interview', desc: 'Project-specific questions generated from your uploaded resume.' },
                { image: pdfImg, icon: <BsFileEarmarkText size={18} />, title: 'Downloadable PDF Report', desc: 'Detailed breakdown of strengths, weaknesses, and improvement areas.' },
                { image: analyticsImg, icon: <BsBarChart size={18} />, title: 'History & Analytics', desc: 'Track your progress with performance graphs across every session.' }
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}
                  style={{
                    background: '#252833',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'box-shadow 0.3s, transform 0.3s'
                  }}>
                  <div style={{ width: '45%', flexShrink: 0 }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '220px', display: 'block' }} />
                  </div>
                  <div style={{ padding: '28px 28px 28px 8px' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(20,184,166,0.18), rgba(6,182,212,0.08))',
                      border: '1px solid rgba(20,184,166,0.22)',
                      color: '#2DD4BF',
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      {item.icon}
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, color: '#F1F5F9', marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── INTERVIEW MODES ── */}
          <div style={{ marginBottom: '120px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ color: '#2DD4BF', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '14px' }}>
                Modes
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>
                Multiple Interview <span style={{ color: '#2DD4BF' }}>Modes</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '20px' }}>
              {[
                { img: hrImg, title: 'HR Interview Mode', desc: 'Behavioral and communication-based evaluation for real-world readiness.', accent: 'rgba(129,140,248,0.15)', accentBorder: 'rgba(129,140,248,0.25)', accentText: '#A5B4FC' },
                { img: techImg, title: 'Technical Mode', desc: 'Deep technical questioning tailored precisely to your selected role.', accent: 'rgba(20,184,166,0.12)', accentBorder: 'rgba(20,184,166,0.25)', accentText: '#2DD4BF' },
                { img: confidenceImg, title: 'Confidence Detection', desc: 'Tone and voice analysis to surface insights about your delivery.', accent: 'rgba(251,191,36,0.1)', accentBorder: 'rgba(251,191,36,0.25)', accentText: '#FCD34D' },
                { img: creditImg, title: 'Credits System', desc: 'Unlock premium sessions with a straightforward credits model.', accent: 'rgba(244,63,94,0.1)', accentBorder: 'rgba(244,63,94,0.2)', accentText: '#FB7185' }
              ].map((mode, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
                  style={{
                    background: '#252833',
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: '20px',
                    padding: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                  {/* Colored accent strip on left */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: mode.accentText,
                    opacity: 0.6,
                    borderRadius: '20px 0 0 20px'
                  }} />

                  <div style={{ paddingLeft: '12px' }}>
                    <div style={{
                      display: 'inline-flex',
                      background: mode.accent,
                      border: `1px solid ${mode.accentBorder}`,
                      color: mode.accentText,
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      marginBottom: '12px',
                      letterSpacing: '0.05em'
                    }}>
                      MODE {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 650, color: '#F1F5F9', marginBottom: '8px' }}>{mode.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.65, maxWidth: '240px' }}>{mode.desc}</p>
                  </div>

                  <div style={{
                    background: mode.accent,
                    borderRadius: '16px',
                    padding: '12px',
                    flexShrink: 0
                  }}>
                    <img src={mode.img} alt={mode.title} style={{ width: '90px', height: '90px', objectFit: 'contain', display: 'block' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home