import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { ServerUrl } from '../App'
import Step3Report from '../components/Step3Report'
import { useEffect } from 'react'

function InterviewReport() {
  const {id}=useParams()
  const [report,setReport] =useState(null)

  useEffect(() => {
    const fetchReport = async () => {
        try {
            const result = await axios.get(ServerUrl + "/api/interview/report/" + id, { withCredentials: true })

            console.log(result.data)
            setReport(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    fetchReport()
},[])

if (!report) {
    return (
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center font-sans">
            <p className="text-[#60A5FA] animate-pulse text-lg tracking-widest uppercase font-semibold">
                Loading Report...
            </p>
        </div>
    );
}
  return (
    <Step3Report report={report}/>
  )
}

export default InterviewReport
