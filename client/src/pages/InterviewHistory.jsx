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
        <div className='min-h-screen bg-[#FCFCFA] text-[#14171F] py-10 font-sans'>
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                {/* Header Section */}
                <div className='mb-12 w-full flex flex-wrap items-start sm:items-center gap-5'>
                    <button
                        onClick={() => navigate("/")}
                        className='p-3.5 cursor-pointer rounded-md bg-white border border-[#E7E5E1] shadow-sm hover:border-[#CFE3DF] hover:bg-[#F5F5F3] transition-all'>
                        <FaArrowLeft className='text-[#0F6B5C]' />
                    </button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-[#14171F]'>
                            Interview <span className='text-[#0F6B5C]'>History</span>
                        </h1>
                        <p className='text-[#5B6169] mt-2 text-sm sm:text-base'>
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                {interviews.length === 0 ?
                    // Empty State Light Card
                    <div className='bg-white border border-[#E7E5E1] p-12 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center'>
                        <h3 className="text-xl font-bold text-[#14171F] mb-2">No Interviews Yet</h3>
                        <p className='text-[#5B6169] mb-6 text-sm sm:text-base'>
                            No interviews found. Start your first interview.
                        </p>
                        <button
                            onClick={() => navigate("/interview")}
                            className='bg-[#0F6B5C] hover:bg-[#0B5347] text-white px-8 py-3 rounded-md font-semibold shadow-sm transition-colors cursor-pointer text-sm sm:text-base'>
                            Start Interview
                        </button>
                    </div>
                    :
                    <div className='grid gap-5'>
                        {interviews.map((item, index) => (
                            
                            // Light Mode Card
                            <div key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='group bg-white p-6 rounded-md shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer border border-[#E7E5E1] hover:border-[#CFE3DF]'>
                                
                                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#14171F] group-hover:text-[#0F6B5C] transition-colors">
                                            {item.role}
                                        </h3>

                                        {/* Styled tags for Experience and Mode */}
                                        <div className="flex flex-wrap gap-3 mt-3 mb-3">
                                            <span className="bg-[#F5F5F3] text-[#5B6169] border border-[#E7E5E1] px-3 py-1 rounded-md text-xs font-medium">
                                                {item.experience}
                                            </span>
                                            <span className="bg-[#F5F5F3] text-[#5B6169] border border-[#E7E5E1] px-3 py-1 rounded-md text-xs font-medium capitalize">
                                                {item.mode} Mode
                                            </span>
                                        </div>

                                        <p className="text-xs font-medium text-[#878681]">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6 md:border-l md:border-[#E7E5E1] md:pl-6'>
                                        {/* SCORE */}
                                        <div className="text-left md:text-right">
                                            <p className="text-xs text-[#5B6169] font-bold uppercase tracking-wider mb-1">
                                                Overall Score
                                            </p>
                                            <p className="text-3xl font-bold text-[#0F6B5C]">
                                                {item.finalScore || 0}<span className='text-lg text-[#878681]'>/10</span>
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-sm ${
                                                item.status === "completed"
                                                    ? "bg-[#EAF3F1] text-[#0F6B5C] border border-[#CFE3DF]"
                                                    : "bg-amber-50 text-amber-600 border border-amber-200"
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
