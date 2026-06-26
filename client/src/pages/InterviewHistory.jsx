import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import axios from "axios"
import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'


function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", {
                    withCredentials: true
                })
               
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])
    return (
        // Changed to Dark Background
        <div className='min-h-screen bg-[#1C1F26] text-[#E2E8F0] py-10 font-sans'>
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                {/* Header Section */}
                <div className='mb-12 w-full flex flex-wrap items-start sm:items-center gap-5'>
                    <button
                        onClick={() => navigate("/")}
                        className='p-3.5 cursor-pointer rounded-full bg-[#252833] border border-white/10 shadow-lg hover:border-[#2DD4BF]/50 transition-all'>
                        <FaArrowLeft className='text-[#2DD4BF]' />
                    </button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-white'>
                            Interview <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#06B6D4]'>History</span>
                        </h1>
                        <p className='text-[#64748B] mt-2'>
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                {interviews.length === 0 ?
                    // Empty State Dark Card
                    <div className='bg-[#252833] border border-white/5 p-12 rounded-3xl shadow-2xl text-center'>
                        <h3 className="text-xl font-bold text-white mb-2">No Interviews Yet</h3>
                        <p className='text-[#64748B] mb-6'>
                            No interviews found. Start your first interview.
                        </p>
                        <button
                            onClick={() => navigate("/interview")}
                            className='bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:opacity-90 transition-opacity'>
                            Start Interview
                        </button>
                    </div>
                    :
                    <div className='grid gap-5'>
                        {interviews.map((item, index) => (
                            
                            // Dark Mode Card
                            <div key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='group bg-[#252833] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/5 hover:border-[#2DD4BF]/40'>
                                
                                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#2DD4BF] transition-colors">
                                            {item.role}
                                        </h3>

                                        {/* Styled tags for Experience and Mode */}
                                        <div className="flex flex-wrap gap-3 mt-3 mb-3">
                                            <span className="bg-[#1C1F26] text-[#CBD5E1] border border-white/10 px-3 py-1 rounded-full text-xs">
                                                {item.experience}
                                            </span>
                                            <span className="bg-[#1C1F26] text-[#CBD5E1] border border-white/10 px-3 py-1 rounded-full text-xs capitalize">
                                                {item.mode} Mode
                                            </span>
                                        </div>

                                        <p className="text-xs text-[#64748B]">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6 md:border-l md:border-white/10 md:pl-6'>
                                        {/* SCORE */}
                                        <div className="text-left md:text-right">
                                            <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider mb-1">
                                                Overall Score
                                            </p>
                                            <p className="text-3xl font-bold text-[#2DD4BF] drop-shadow-[0_0_10px_rgba(45,212,191,0.2)]">
                                                {item.finalScore || 0}<span className='text-lg text-[#64748B]'>/10</span>
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                                                item.status === "completed"
                                                    ? "bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/20"
                                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default InterviewHistory
