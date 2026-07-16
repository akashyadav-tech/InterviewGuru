import React, { useState } from 'react'
import { motion } from "framer-motion"
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4 sm:p-6 md:p-8 pt-20"
        >
            <div className="w-full max-w-5xl bg-[#131C2F] rounded-3xl border border-[#1E293B] shadow-[0_24px_60px_rgba(0,0,0,0.4)] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                
                {/* LEFT PANEL */}
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="bg-gradient-to-br from-[#2563EB]/10 to-[#60A5FA]/5 border-b md:border-b-0 md:border-r border-[#1E293B] p-8 sm:p-10 lg:p-12 flex flex-col justify-center"
                >
                    <div className="inline-flex bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#60A5FA] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase w-fit">
                        AI Powered
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.2rem] font-bold text-[#FFFFFF] mb-4 leading-tight tracking-tight">
                        Start Your AI Interview
                    </h2>

                    <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
                        Practice real interview scenarios powered by AI. Improve communication, technical skills, and confidence.
                    </p>

                    <div className="flex flex-col gap-4">
                        {[
                            { icon: <FaUserTie />, text: "Choose Role & Experience", color: "text-[#60A5FA]", bg: "bg-[#1E3A8A]/30", border: "border-[#1E3A8A]/50" },
                            { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview", color: "text-[#94A3B8]", bg: "bg-[#1E293B]", border: "border-[#334155]" },
                            { icon: <FaChartLine />, text: "Performance Analytics", color: "text-[#CBD5E1]", bg: "bg-[#334155]/50", border: "border-[#475569]" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="flex items-center gap-4 bg-[#0B0F19] border border-[#1E293B] p-3.5 sm:p-4 rounded-2xl cursor-pointer"
                            >
                                <div className={`${item.bg} border ${item.border} ${item.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base`}>
                                    {item.icon}
                                </div>
                                <span className="text-[#CBD5E1] text-sm font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT PANEL */}
                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-8 sm:p-10 lg:p-12"
                >
                    <h2 className="text-2xl sm:text-[1.6rem] font-bold text-[#FFFFFF] mb-8 tracking-tight">
                        Interview Setup
                    </h2>

                    <div className="flex flex-col gap-5">
                        {/* Role Input */}
                        <div className="relative">
                            <FaUserTie className="absolute top-4 left-4 text-[#475569] text-base" />
                            <input
                                type='text'
                                placeholder='Enter role (e.g. Frontend Developer)'
                                className="w-full pl-11 pr-4 py-3.5 bg-[#0B0F19] border border-[#334155] rounded-xl text-[#F8FAFC] text-sm outline-none focus:border-[#60A5FA]/50 transition-colors"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
                        </div>

                        {/* Experience Input */}
                        <div className="relative">
                            <FaBriefcase className="absolute top-4 left-4 text-[#475569] text-base" />
                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 years)'
                                className="w-full pl-11 pr-4 py-3.5 bg-[#0B0F19] border border-[#334155] rounded-xl text-[#F8FAFC] text-sm outline-none focus:border-[#60A5FA]/50 transition-colors"
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                        </div>

                        {/* Mode Select */}
                        <select
                            onChange={(e) => setMode(e.target.value)}
                            value={mode}
                            className="w-full px-4 py-3.5 bg-[#0B0F19] border border-[#334155] rounded-xl text-[#F8FAFC] text-sm outline-none focus:border-[#60A5FA]/50 transition-colors cursor-pointer appearance-none"
                        >
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* Resume Upload */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className="border-2 border-dashed border-[#2563EB]/30 bg-[#2563EB]/5 rounded-2xl p-6 sm:p-8 text-center cursor-pointer hover:border-[#2563EB]/50 transition-colors"
                            >
                                <FaFileUpload className="text-3xl text-[#60A5FA] mx-auto mb-3" />
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className="hidden"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                <p className="text-[#94A3B8] text-sm font-medium px-2">
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume(); }}
                                        className="mt-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-none py-2 px-6 rounded-full text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer transition-colors"
                                    >
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
                                className="bg-[#0B0F19] border border-[#2563EB]/30 rounded-xl p-5 flex flex-col gap-4"
                            >
                                <h3 className="text-sm font-semibold text-[#60A5FA]">
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className="text-[11px] text-[#64748B] font-bold mb-2 uppercase tracking-widest">Projects</p>
                                        <ul className="list-disc pl-5 text-[#94A3B8] text-sm leading-relaxed">
                                            {projects.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className="text-[11px] text-[#64748B] font-bold mb-2 uppercase tracking-widest">Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((s, i) => (
                                                <span key={i} className="bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#60A5FA] px-3 py-1 rounded-full text-xs font-medium">
                                                    {s}
                                                </span>
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3.5 mt-2 rounded-full text-base font-semibold tracking-wide transition-all ${
                                (!role || !experience || loading)
                                    ? 'bg-[#1E293B] text-[#475569] cursor-not-allowed'
                                    : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] cursor-pointer'
                            }`}
                        >
                            {loading ? "Starting..." : "Start Interview →"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp
