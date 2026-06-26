import React, { useState } from 'react'
import { motion } from "framer-motion" // Use standard framer-motion import
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
    <div className="min-h-screen bg-[#1C1F26] text-[#E8EAF0] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 pt-20 pb-10">
        <div className="max-w-6xl mx-auto">

          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#2DD4BF] text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 tracking-wide">
              <HiSparkles size={16} />
              <span className="text-center">AI Powered Smart Interview Platform</span>
            </div>
          </div>

          {/* Headline */}
          <div className="relative text-center mb-20 md:mb-28">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.13)_0%,transparent_70%)] pointer-events-none z-0"></div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-bold leading-tight tracking-tight max-w-4xl mx-auto mb-6 text-[#F1F5F9]">
              Practice Interviews with <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#06B6D4] to-[#818CF8]">
                AI Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.15 }}
              className="relative z-10 text-[#94A3B8] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4">
              Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance evaluation.
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10 px-4">
              <motion.button
                onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/interview") }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold shadow-[0_0_28px_rgba(20,184,166,0.35)] tracking-wide">
                Start Interview →
              </motion.button>

              <motion.button
                onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/history") }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-transparent text-[#CBD5E1] border border-[#94A3B8]/30 px-8 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-medium tracking-wide hover:bg-white/5 transition-colors">
                View History
              </motion.button>
            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <div className="flex flex-col items-center mb-24 md:mb-32">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#2DD4BF] text-xs md:text-sm tracking-[0.14em] font-semibold uppercase mb-10 text-center">
              How It Works
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                { icon: <BsRobot size={22} />, step: '01', title: 'Role & Experience Selection', desc: 'AI adjusts difficulty based on your selected job role and experience level.' },
                { icon: <BsMic size={22} />, step: '02', title: 'Smart Voice Interview', desc: 'Dynamic follow-up questions adapt in real time based on your answers.' },
                { icon: <BsClock size={22} />, step: '03', title: 'Timer Based Simulation', desc: 'Real interview pressure with time tracking to sharpen your performance.' }
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(20,184,166,0.3)' }}
                  className="bg-[#252833] border border-white/5 rounded-2xl p-6 md:p-8 relative transition-all duration-300">
                  
                  <div className="absolute top-4 right-6 text-4xl md:text-5xl font-extrabold text-white/5 select-none leading-none">
                    {item.step}
                  </div>

                  <div className="bg-gradient-to-br from-[#14B8A6]/20 to-[#06B6D4]/10 border border-[#14B8A6]/20 text-[#2DD4BF] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>

                  <div className="text-[10px] md:text-xs text-[#2DD4BF] font-semibold tracking-widest mb-2 uppercase">
                    STEP {item.step}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-[#F1F5F9] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
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
              <p className="text-[#2DD4BF] text-xs md:text-sm tracking-[0.14em] font-semibold uppercase mb-3">
                Capabilities
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                Advanced AI <span className="text-[#2DD4BF]">Features</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { image: evalImg, icon: <BsBarChart size={18} />, title: 'AI Answer Evaluation', desc: 'Scores communication, technical accuracy, and confidence in real time.' },
                { image: resumeImg, icon: <BsFileEarmarkText size={18} />, title: 'Resume-Based Interview', desc: 'Project-specific questions generated from your uploaded resume.' },
                { image: pdfImg, icon: <BsFileEarmarkText size={18} />, title: 'Downloadable PDF Report', desc: 'Detailed breakdown of strengths, weaknesses, and improvement areas.' },
                { image: analyticsImg, icon: <BsBarChart size={18} />, title: 'History & Analytics', desc: 'Track your progress with performance graphs across every session.' }
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}
                  className="bg-[#252833] border border-white/5 rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center transition-all duration-300">
                  
                  <div className="w-full sm:w-2/5 p-6 sm:p-0 flex justify-center shrink-0">
                    <img src={item.image} alt={item.title} className="w-48 sm:w-full h-auto object-contain max-h-[180px] sm:max-h-[220px]" />
                  </div>
                  
                  <div className="w-full sm:w-3/5 p-6 sm:p-8 sm:pl-4">
                    <div className="bg-gradient-to-br from-[#14B8A6]/20 to-[#06B6D4]/10 border border-[#14B8A6]/20 text-[#2DD4BF] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#F1F5F9] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
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
              <p className="text-[#2DD4BF] text-xs md:text-sm tracking-[0.14em] font-semibold uppercase mb-3">
                Modes
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                Multiple Interview <span className="text-[#2DD4BF]">Modes</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { img: hrImg, title: 'HR Interview Mode', desc: 'Behavioral and communication-based evaluation for real-world readiness.', accent: 'bg-indigo-500/15', accentBorder: 'border-indigo-500/25', accentText: 'text-indigo-300', strip: 'bg-indigo-300' },
                { img: techImg, title: 'Technical Mode', desc: 'Deep technical questioning tailored precisely to your selected role.', accent: 'bg-[#14B8A6]/15', accentBorder: 'border-[#14B8A6]/25', accentText: 'text-[#2DD4BF]', strip: 'bg-[#2DD4BF]' },
                { img: confidenceImg, title: 'Confidence Detection', desc: 'Tone and voice analysis to surface insights about your delivery.', accent: 'bg-amber-500/10', accentBorder: 'border-amber-500/25', accentText: 'text-amber-300', strip: 'bg-amber-300' },
                { img: creditImg, title: 'Credits System', desc: 'Unlock premium sessions with a straightforward credits model.', accent: 'bg-rose-500/10', accentBorder: 'border-rose-500/20', accentText: 'text-rose-400', strip: 'bg-rose-400' }
              ].map((mode, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
                  className="bg-[#252833] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 relative overflow-hidden transition-all duration-300">
                  
                  {/* Colored accent strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${mode.strip} opacity-60 rounded-l-2xl`}></div>

                  <div className="pl-2 sm:pl-4 text-center sm:text-left flex-1">
                    <div className={`inline-flex ${mode.accent} border ${mode.accentBorder} ${mode.accentText} text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wider`}>
                      MODE {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#F1F5F9] mb-2">{mode.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed sm:max-w-[260px]">{mode.desc}</p>
                  </div>

                  <div className={`${mode.accent} rounded-2xl p-4 shrink-0`}>
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
