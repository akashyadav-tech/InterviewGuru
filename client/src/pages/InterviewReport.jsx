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
        <div className="min-h-screen bg-[#1C1F26] flex items-center justify-center">
            <p className="text-gray-500 text-lg">
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