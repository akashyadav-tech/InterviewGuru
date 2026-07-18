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
            className="min-h-screen flex items-center justify-center bg-[#FCFCFA] p-4 sm:p-6 md:p-8 pt-20"
        >
            <div className="w-full max-w-5xl bg-white rounded-lg border border-[#E7E5E1] shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                
                {/* LEFT PANEL */}
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#FAFAFA] border-b md:border-b-0 md:border-r border-[#E7E5E1] p-8 sm:p-10 lg:p-12 flex flex-col justify-center"
                >
                    <div className="inline-flex bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] text-xs font-semibold px-4 py-1.5 rounded-md mb-6 tracking-widest uppercase w-fit">
                        AI Powered
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.2rem] font-bold text-[#14171F] mb-4 leading-tight tracking-tight">
                        Start Your AI Interview
                    </h2>

                    <p className="text-[#5B6169] text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
                        Practice real interview scenarios powered by AI. Improve communication, technical skills, and confidence.
                    </p>

                    <div className="flex flex-col gap-4">
                        {[
                            { icon: <FaUserTie />, text: "Choose Role & Experience", color: "text-[#0F6B5C]", bg: "bg-[#EAF3F1]", border: "border-[#CFE3DF]" },
                            { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview", color: "text-[#5B6169]", bg: "bg-[#F5F5F3]", border: "border-[#E7E5E1]" },
                            { icon: <FaChartLine />, text: "Performance Analytics", color: "text-[#5B6169]", bg: "bg-[#F5F5F3]", border: "border-[#E7E5E1]" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="flex items-center gap-4 bg-white border border-[#E7E5E1] p-3.5 sm:p-4 rounded-md shadow-sm cursor-pointer"
                            >
                                <div className={`${item.bg} border ${item.border} ${item.color} w-10 h-10 rounded-md flex items-center justify-center shrink-0 text-base`}>
                                    {item.icon}
                                </div>
                                <span className="text-[#14171F] text-sm font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT PANEL */}
                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-8 sm:p-10 lg:p-12 bg-white"
                >
                    <h2 className="text-2xl sm:text-[1.6rem] font-bold text-[#14171F] mb-8 tracking-tight">
                        Interview Setup
                    </h2>

                    <div className="flex flex-col gap-5">
                        {/* Role Input */}
                        <div className="relative">
                            <FaUserTie className="absolute top-4 left-4 text-[#5B6169] text-base" />
                            <input
                                type='text'
                                placeholder='Enter role (e.g. Frontend Developer)'
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E0DC] rounded-md text-[#14171F] placeholder-[#878681] text-sm outline-none focus:border-[#0F6B5C] transition-colors"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
                        </div>

                        {/* Experience Input */}
                        <div className="relative">
                            <FaBriefcase className="absolute top-4 left-4 text-[#5B6169] text-base" />
                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 years)'
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E0DC] rounded-md text-[#14171F] placeholder-[#878681] text-sm outline-none focus:border-[#0F6B5C] transition-colors"
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                        </div>

                        {/* Mode Select */}
                        <select
                            onChange={(e) => setMode(e.target.value)}
                            value={mode}
                            className="w-full px-4 py-3.5 bg-white border border-[#E2E0DC] rounded-md text-[#14171F] text-sm outline-none focus:border-[#0F6B5C] transition-colors cursor-pointer appearance-none"
                        >
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* Resume Upload */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className="border-2 border-dashed border-[#CFE3DF] bg-[#FAFAFA] hover:bg-[#EAF3F1] rounded-md p-6 sm:p-8 text-center cursor-pointer hover:border-[#0F6B5C] transition-colors"
                            >
                                <FaFileUpload className="text-3xl text-[#0F6B5C] mx-auto mb-3" />
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className="hidden"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                <p className="text-[#5B6169] text-sm font-medium px-2">
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume(); }}
                                        className="mt-4 bg-white border border-[#E2E0DC] hover:bg-[#F5F5F3] text-[#14171F] py-2 px-6 rounded-md text-sm font-semibold shadow-sm cursor-pointer transition-colors"
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
                                className="bg-[#FAFAFA] border border-[#E7E5E1] rounded-md p-5 flex flex-col gap-4"
                            >
                                <h3 className="text-sm font-semibold text-[#0F6B5C]">
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className="text-[11px] text-[#5B6169] font-bold mb-2 uppercase tracking-widest">Projects</p>
                                        <ul className="list-disc pl-5 text-[#14171F] text-sm leading-relaxed">
                                            {projects.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className="text-[11px] text-[#5B6169] font-bold mb-2 uppercase tracking-widest">Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((s, i) => (
                                                <span key={i} className="bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] px-3 py-1 rounded-md text-xs font-medium">
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
                            className={`w-full py-3.5 mt-2 rounded-md text-base font-semibold tracking-wide transition-all ${
                                (!role || !experience || loading)
                                    ? 'bg-[#F5F5F3] border border-[#E7E5E1] text-[#A09E9A] cursor-not-allowed'
                                    : 'bg-[#0F6B5C] hover:bg-[#0B5347] text-white shadow-sm cursor-pointer'
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
