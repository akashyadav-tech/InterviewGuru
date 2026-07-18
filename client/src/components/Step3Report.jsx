import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from "framer-motion"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen bg-[#FCFCFA] flex items-center justify-center">
        <p className="text-[#0F6B5C] animate-pulse text-lg tracking-widest uppercase font-semibold">Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate()

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // ================== TITLE ==================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(15, 107, 92); // Primary Green
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
        align: "center",
    });

    currentY += 5;

    // underline
    doc.setDrawColor(15, 107, 92);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // ================== FINAL SCORE BOX ==================
    doc.setFillColor(234, 243, 241); // Light green tint (#EAF3F1)
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
        `Final Score: ${finalScore}/10`,
        pageWidth / 2,
        currentY + 12,
        { align: "center" }
    );

    currentY += 30;

    // ================== SKILLS BOX ==================
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);
    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    // ================== ADVICE ==================
    let advice = "";

    if (finalScore >= 8) {
        advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
        advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
        advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // ================== QUESTION TABLE ==================
    autoTable(doc, {
        startY: currentY,
        margin: { left: margin, right: margin },
        head: [["#", "Question", "Score", "Feedback"]],
        body: questionWiseScore.map((q, i) => [
            `${i + 1}`,
            q.question,
            `${q.score}/10`,
            q.feedback,
        ]),
        styles: {
            fontSize: 9,
            cellPadding: 5,
            valign: "top",
        },
        headStyles: {
            fillColor: [15, 107, 92], // Primary green
            textColor: 255,
            halign: "center",
        },
        columnStyles: {
            0: { cellWidth: 10, halign: "center" }, // index
            1: { cellWidth: 55 },                   // question
            2: { cellWidth: 20, halign: "center" }, // score
            3: { cellWidth: "auto" },               // feedback
        },
        alternateRowStyles: {
            fillColor: [250, 250, 250],
        },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className='min-h-screen bg-[#FCFCFA] text-[#14171F] font-sans px-4 sm:px-6 lg:px-10 py-10'>
      <div className='max-w-7xl mx-auto'>
        
        {/* HEADER SECTION */}
        <div className='mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
          <div className='flex flex-wrap items-center gap-5'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/history")}
              className='p-3.5 rounded-md cursor-pointer bg-white border border-[#E7E5E1] shadow-sm hover:border-[#CFE3DF] hover:bg-[#F5F5F3] transition-all'>
              <FaArrowLeft className='text-[#0F6B5C]' />
            </motion.button>

            <div>
              <h1 className='text-3xl font-bold text-[#14171F] tracking-tight'>
                Interview Analytics Dashboard
              </h1>
              <div className='flex items-center gap-3 mt-2'>
                <span className='text-xs font-semibold text-[#0F6B5C] bg-[#EAF3F1] border border-[#CFE3DF] px-3 py-1 rounded-md uppercase tracking-wider'>
                  AI Evaluation Complete
                </span>
                <p className='text-[#5B6169] text-sm'>
                  Detailed performance insights
                </p>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='bg-[#0F6B5C] hover:bg-[#0B5347] cursor-pointer text-white px-6 py-3.5 rounded-md shadow-sm transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap border-none flex items-center justify-center gap-2'
            onClick={downloadPDF}>
            Download PDF Report
          </motion.button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

          {/* LEFT COLUMN - Overall & Skills */}
          <div className='space-y-6 lg:space-y-8'>
            
            {/* Overall Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='bg-white border border-[#E7E5E1] rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8 text-center relative overflow-hidden'>
              
              <h3 className='text-[#5B6169] font-bold tracking-widest uppercase mb-6 text-xs sm:text-sm'>
                Overall Performance
              </h3>
              
              <div className='relative w-32 h-32 sm:w-40 sm:h-40 mx-auto'>
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "22px",
                    pathColor: "#0F6B5C",
                    textColor: "#14171F",
                    trailColor: "#E7E5E1",
                    pathTransitionDuration: 1.5,
                  })}
                />
              </div>

              <div className='mt-8 bg-[#F5F5F3] border border-[#E7E5E1] rounded-md p-4'>
                <p className='font-bold text-[#14171F] text-base sm:text-lg'>
                  {performanceText}
                </p>
                <p className='text-[#0F6B5C] text-xs sm:text-sm mt-1.5 font-medium'>
                  {shortTagline}
                </p>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-white border border-[#E7E5E1] rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8'>
              
              <h3 className='text-base sm:text-lg font-bold text-[#14171F] mb-6 flex items-center gap-2'>
                Skill Evaluation
              </h3>

              <div className='space-y-6'>
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className='flex justify-between mb-2 text-sm sm:text-base'>
                      <span className='text-[#5B6169]'>{s.label}</span>
                      <span className='font-bold text-[#14171F]'>{s.value}<span className='text-[#878681] text-xs ml-1'>/10</span></span>
                    </div>

                    <div className='bg-[#F5F5F3] border border-[#E7E5E1] h-3 sm:h-3.5 rounded-md overflow-hidden relative'>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${s.value * 10}%` }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                        className='bg-[#0F6B5C] h-full rounded-md relative'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Chart & Questions */}
          <div className='lg:col-span-2 space-y-6 lg:space-y-8'>

            {/* Chart Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white border border-[#E7E5E1] rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8'>
              
              <h3 className="text-base sm:text-lg font-bold text-[#14171F] mb-6">
                Performance Trend
              </h3>

              <div className='h-64 sm:h-72 w-full'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F6B5C" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0F6B5C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E1" vertical={false} />
                    <XAxis dataKey="name" stroke="#5B6169" tick={{fill: '#5B6169', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} stroke="#5B6169" tick={{fill: '#5B6169', fontSize: 12}} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#E7E5E1', borderRadius: '6px', color: '#14171F' }}
                      itemStyle={{ color: '#0F6B5C', fontWeight: 'bold' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#0F6B5C"
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorScore)"
                      activeDot={{ r: 6, fill: '#0F6B5C', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Question Breakdown Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='bg-white border border-[#E7E5E1] rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8'>
              
              <h3 className="text-base sm:text-lg font-bold text-[#14171F] mb-6">
                Question Breakdown
              </h3>
              
              <div className='space-y-5'>
                {questionWiseScore.map((q, i) => (
                  <div key={i} className='bg-white p-5 sm:p-6 rounded-md border border-[#E7E5E1] transition-colors hover:border-[#CFE3DF] shadow-sm'>
                    
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5'>
                      <div className='flex-1'>
                        <span className="text-xs font-bold tracking-widest text-[#5B6169] uppercase mb-2 block">
                          Question {i + 1}
                        </span>
                        <p className="font-medium text-[#14171F] text-sm sm:text-base leading-relaxed">
                          {q.question || "Question not available"}
                        </p>
                      </div>

                      <div className='bg-[#EAF3F1] border border-[#CFE3DF] text-[#0F6B5C] px-4 py-1.5 rounded-md font-bold text-sm shadow-sm whitespace-nowrap self-start'>
                        {q.score ?? 0} / 10
                      </div>
                    </div>

                    <div className='bg-[#FAFAFA] border border-[#E7E5E1] p-4 sm:p-5 rounded-md relative overflow-hidden'>
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#0F6B5C]"></div>
                      <p className='text-xs text-[#0F6B5C] font-bold mb-2 uppercase tracking-wider flex items-center gap-2'>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B5C] animate-pulse"></span>
                        AI Analysis & Feedback
                      </p>
                      <p className='text-sm text-[#5B6169] leading-relaxed'>
                        {q.feedback && q.feedback.trim() !== ""
                          ? q.feedback
                          : "No specific feedback generated for this response."}
                      </p>
                    </div>
                    
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report
