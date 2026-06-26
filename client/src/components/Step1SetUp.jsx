import React, { useState } from 'react'
import { motion } from "motion/react"
import axios from 'axios';
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
   
} from "react-icons/fa";
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("")
    const [experience, setExperience] = useState("")
    const [mode, setMode] = useState("Technical")
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true);
        const formdata = new FormData();
        formdata.append("resume", resumeFile);
        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true });
            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
        } catch (error) {
            console.log(error);
            setAnalyzing(false);
        }
    };

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false)
            onStart(result.data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '12px 16px 12px 44px',
        background: '#1C1F26',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        color: '#F1F5F9',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border 0.2s',
    }

    const selectStyle = {
        width: '100%',
        padding: '12px 16px',
        background: '#1C1F26',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        color: '#F1F5F9',
        fontSize: '0.9rem',
        outline: 'none',
        cursor: 'pointer',
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1C1F26',
                padding: '24px 16px',
                fontFamily: "'Inter', sans-serif"
            }}>
              

            <div style={{
                width: '100%',
                maxWidth: '1000px',
                background: '#252833',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                overflow: 'hidden'
            }}>

                {/* LEFT PANEL */}
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(6,182,212,0.04))',
                        borderRight: '1px solid rgba(255,255,255,0.06)',
                        padding: '48px 40px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>

                    <div style={{
                        display: 'inline-flex',
                        background: 'rgba(20,184,166,0.12)',
                        border: '1px solid rgba(20,184,166,0.25)',
                        color: '#2DD4BF',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '5px 14px',
                        borderRadius: '999px',
                        marginBottom: '20px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        width: 'fit-content'
                    }}>
                        AI Powered
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                        fontWeight: 700,
                        color: '#F1F5F9',
                        marginBottom: '16px',
                        lineHeight: 1.25,
                        letterSpacing: '-0.02em'
                    }}>
                        Start Your AI Interview
                    </h2>

                    <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '36px' }}>
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { icon: <FaUserTie />, text: "Choose Role & Experience", color: '#2DD4BF', bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.2)' },
                            { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview", color: '#A5B4FC', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)' },
                            { icon: <FaChartLine />, text: "Performance Analytics", color: '#FCD34D', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '14px',
                                    background: '#1C1F26',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    padding: '14px 18px',
                                    borderRadius: '14px',
                                    cursor: 'pointer'
                                }}>
                                <div style={{
                                    background: item.bg,
                                    border: `1px solid ${item.border}`,
                                    color: item.color,
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    fontSize: '1rem'
                                }}>
                                    {item.icon}
                                </div>
                                <span style={{ color: '#CBD5E1', fontSize: '0.9rem', fontWeight: 500 }}>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT PANEL */}
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    style={{ padding: '48px 40px' }}>

                    <h2 style={{
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#F1F5F9',
                        marginBottom: '32px',
                        letterSpacing: '-0.02em'
                    }}>
                        Interview Setup
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Role Input */}
                        <div style={{ position: 'relative' }}>
                            <FaUserTie style={{ position: 'absolute', top: '14px', left: '14px', color: '#475569', fontSize: '1rem' }} />
                            <input
                                type='text'
                                placeholder='Enter role (e.g. Frontend Developer)'
                                style={inputStyle}
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
                        </div>

                        {/* Experience Input */}
                        <div style={{ position: 'relative' }}>
                            <FaBriefcase style={{ position: 'absolute', top: '14px', left: '14px', color: '#475569', fontSize: '1rem' }} />
                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 years)'
                                style={inputStyle}
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                        </div>

                        {/* Mode Select */}
                        <select
                            onChange={(e) => setMode(e.target.value)}
                            value={mode}
                            style={selectStyle}>
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* Resume Upload */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                style={{
                                    border: '2px dashed rgba(20,184,166,0.3)',
                                    borderRadius: '14px',
                                    padding: '28px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: 'rgba(20,184,166,0.04)',
                                    transition: 'border 0.2s, background 0.2s'
                                }}>
                                <FaFileUpload style={{ fontSize: '2rem', color: '#2DD4BF', margin: '0 auto 12px', display: 'block' }} />
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                <p style={{ color: '#94A3B8', fontSize: '0.875rem', fontWeight: 500 }}>
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume(); }}
                                        style={{
                                            marginTop: '14px',
                                            background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '9px 22px',
                                            borderRadius: '999px',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            boxShadow: '0 0 16px rgba(20,184,166,0.3)'
                                        }}>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {/* Resume Results */}
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    background: '#1C1F26',
                                    border: '1px solid rgba(20,184,166,0.2)',
                                    borderRadius: '14px',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px'
                                }}>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2DD4BF' }}>
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Projects</p>
                                        <ul style={{ paddingLeft: '16px', color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.7 }}>
                                            {projects.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Skills</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {skills.map((s, i) => (
                                                <span key={i} style={{
                                                    background: 'rgba(20,184,166,0.1)',
                                                    border: '1px solid rgba(20,184,166,0.22)',
                                                    color: '#2DD4BF',
                                                    padding: '4px 12px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 500
                                                }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Start Button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: (!role || !experience || loading)
                                    ? 'rgba(255,255,255,0.06)'
                                    : 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                                color: (!role || !experience || loading) ? '#475569' : '#fff',
                                border: 'none',
                                borderRadius: '999px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: (!role || !experience || loading) ? 'not-allowed' : 'pointer',
                                boxShadow: (!role || !experience || loading) ? 'none' : '0 0 24px rgba(20,184,166,0.3)',
                                transition: 'all 0.2s',
                                letterSpacing: '0.01em'
                            }}>
                            {loading ? "Starting..." : "Start Interview →"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp