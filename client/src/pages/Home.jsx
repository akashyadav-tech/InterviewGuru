import React, { useState } from 'react'
import { motion } from "framer-motion"
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
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
    <div
      className="min-h-screen bg-[#FCFCFA] text-[#14171F] flex flex-col overflow-x-hidden"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Fonts: a soft-serif display face for headings + mono for the "transcript" labels */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,450;9..144,560;9..144,650&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono-ui { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 pt-20 pb-10">
        <div className="max-w-6xl mx-auto">

          {/* Hero content */}
          <div className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-10 items-end">

              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 bg-white border border-[#E2E0DC] text-[#57534E] text-[11px] sm:text-xs px-3.5 py-1.5 rounded-md font-mono-ui uppercase tracking-wider mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                  </span>
                  <span>Live Practice Session</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
                  className="font-display text-4xl sm:text-5xl md:text-[3.2rem] lg:text-[3.4rem] font-medium leading-[1.15] tracking-tight text-[#14171F]">
                  Practice interviews with <br className="hidden sm:block" />
                  <span className="relative inline-block text-[#0F6B5C]">
                    an AI that listens
                    <svg className="absolute left-0 -bottom-1.5 w-full h-2" viewBox="0 0 200 8" preserveAspectRatio="none">
                      <motion.path
                        d="M1 5.5C40 2.5 160 2.5 199 5.5"
                        stroke="#0F6B5C" strokeWidth="2" strokeLinecap="round" fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.35 }}
                        transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
                      />
                    </svg>
                  </span>
                </motion.h1>
              </div>

              <div className="relative lg:pb-1.5 lg:pl-8">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  style={{ transformOrigin: 'top' }}
                  className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-[#E7E5E1]">
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.25 }}
                  className="text-[#5B6169] text-base sm:text-lg leading-relaxed mb-6">
                  Pick a role, answer out loud, and get clear feedback — with follow-up questions that adapt as you go.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                  className="flex flex-wrap gap-3">
                  <motion.button
                    onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/interview") }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer bg-[#0F6B5C] hover:bg-[#0B5347] transition-colors text-white px-7 py-3 rounded-lg text-sm md:text-base font-semibold tracking-wide">
                    Start Interview →
                  </motion.button>

                  <motion.button
                    onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/history") }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer bg-white text-[#14171F] border border-[#E2E0DC] px-7 py-3 rounded-lg text-sm md:text-base font-medium tracking-wide hover:bg-[#F5F5F3] transition-colors">
                    View History
                  </motion.button>
                </motion.div>
              </div>

            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <div className="flex flex-col items-center mb-24 md:mb-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono-ui text-[#0F6B5C] text-xs tracking-[0.14em] font-medium uppercase mb-10 text-center">
              // How it works
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                { icon: <BsRobot size={20} />, step: '00:01', title: 'Role & Experience Selection', desc: 'AI adjusts difficulty based on your selected job role and experience level.' },
                { icon: <BsMic size={20} />, step: '00:02', title: 'Smart Voice Interview', desc: 'Dynamic follow-up questions adapt in real time based on your answers.' },
                { icon: <BsClock size={20} />, step: '00:03', title: 'Timer Based Simulation', desc: 'Real interview pressure with time tracking to sharpen your performance.' }
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(226,224,220,0.8)' }}
                  className="group bg-white border border-[#E7E5E1] rounded-lg p-6 md:p-8 relative transition-all duration-300">

                  <div className="absolute top-5 right-6 font-mono-ui text-xs text-[#C7C4BE] tracking-wider select-none">
                    {item.step}
                  </div>

                  <div className="bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] w-12 h-12 rounded-md flex items-center justify-center mb-6">
                    {item.icon}
                  </div>

                  <div className="font-mono-ui text-[10px] md:text-[11px] text-[#0F6B5C] font-medium tracking-widest mb-2 uppercase">
                    Stage {item.step}
                  </div>
                  <h3 className="font-display text-base md:text-lg font-medium text-[#14171F] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5B6169] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── AI CAPABILITIES ── */}
          <div className="mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16">
              <p className="font-mono-ui text-[#0F6B5C] text-xs tracking-[0.14em] font-medium uppercase mb-3">
                // Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#14171F] tracking-tight">
                Advanced AI <span className="text-[#0F6B5C]">features</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { image: evalImg, icon: <BsBarChart size={16} />, title: 'AI Answer Evaluation', desc: 'Scores communication, technical accuracy, and confidence in real time.' },
                { image: resumeImg, icon: <BsFileEarmarkText size={16} />, title: 'Resume-Based Interview', desc: 'Project-specific questions generated from your uploaded resume.' },
                { image: pdfImg, icon: <BsFileEarmarkText size={16} />, title: 'Downloadable PDF Report', desc: 'Detailed breakdown of strengths, weaknesses, and improvement areas.' },
                { image: analyticsImg, icon: <BsBarChart size={16} />, title: 'History & Analytics', desc: 'Track your progress with performance graphs across every session.' }
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 24px 50px rgba(0,0,0,0.06)' }}
                  className="bg-white border border-[#E7E5E1] rounded-lg overflow-hidden flex flex-col sm:flex-row items-center transition-all duration-300">

                  <div className="w-full sm:w-2/5 p-6 sm:p-0 flex justify-center shrink-0 bg-[#FAFAF8] sm:bg-transparent">
                    <img src={item.image} alt={item.title} className="w-40 sm:w-full h-auto object-contain max-h-[160px] sm:max-h-[200px]" />
                  </div>

                  <div className="w-full sm:w-3/5 p-6 sm:p-8 sm:pl-4">
                    <div className="bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] w-10 h-10 rounded-md flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-medium text-[#14171F] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#5B6169] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── INTERVIEW MODES ── */}
          <div className="mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16">
              <p className="font-mono-ui text-[#0F6B5C] text-xs tracking-[0.14em] font-medium uppercase mb-3">
                // Modes
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#14171F] tracking-tight">
                Multiple interview <span className="text-[#0F6B5C]">modes</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { img: hrImg, title: 'HR Interview Mode', desc: 'Behavioral and communication-based evaluation for real-world readiness.', accent: 'bg-[#F5F5F3]', accentBorder: 'border-[#E7E5E1]', accentText: 'text-[#57534E]', strip: 'bg-[#57534E]' },
                { img: techImg, title: 'Technical Mode', desc: 'Deep technical questioning tailored precisely to your selected role.', accent: 'bg-[#EAF3F1]', accentBorder: 'border-[#CFE3DF]', accentText: 'text-[#0F6B5C]', strip: 'bg-[#0F6B5C]' },
                { img: confidenceImg, title: 'Confidence Detection', desc: 'Tone and voice analysis to surface insights about your delivery.', accent: 'bg-[#FDF3E7]', accentBorder: 'border-[#F1DFC0]', accentText: 'text-[#B45309]', strip: 'bg-[#B45309]' },
                { img: creditImg, title: 'Credits System', desc: 'Unlock premium sessions with a straightforward credits model.', accent: 'bg-[#F1F5F9]', accentBorder: 'border-[#E2E8F0]', accentText: 'text-[#334155]', strip: 'bg-[#334155]' }
              ].map((mode, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                  className="bg-white border border-[#E7E5E1] rounded-lg p-6 md:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 relative overflow-hidden transition-all duration-300">

                  {/* Colored accent strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${mode.strip} rounded-l-lg`}></div>

                  <div className="pl-2 sm:pl-4 text-center sm:text-left flex-1">
                    <div className={`inline-flex ${mode.accent} border ${mode.accentBorder} ${mode.accentText} font-mono-ui text-[10px] md:text-[11px] font-medium px-3 py-1 rounded-md mb-3 tracking-wider uppercase`}>
                      Mode {String(i + 1).padStart(2, '0')} / 04
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-medium text-[#14171F] mb-2">{mode.title}</h3>
                    <p className="text-sm text-[#5B6169] leading-relaxed sm:max-w-[260px]">{mode.desc}</p>
                  </div>

                  <div className={`${mode.accent} rounded-lg p-4 shrink-0 border ${mode.accentBorder}`}>
                    <img src={mode.img} alt={mode.title} className="w-20 h-20 md:w-24 md:h-24 object-contain block mx-auto" />
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
