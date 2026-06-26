import React, { useEffect, useRef, useState } from 'react'
import maleVideo from "../assets/Videos/male-ai.mp4"
import femaleVideo from "../assets/Videos/female-ai.mp4"
import Timer from './Timer'
import axios from 'axios';
import { motion } from "framer-motion"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ServerUrl } from '../App';
import { BsArrowRight } from 'react-icons/bs';

function Step2Interview({ interviewData, onFinish }) {
    const { interviewId, questions, userName } = interviewData;
    const [isIntroPhase, setIsIntroPhase] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const recognitionRef = useRef(null);
    const [isAIPlaying, setIsAIPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voiceGender, setVoiceGender] = useState("female");
    const [subtitle, setSubtitle] = useState("");
    const videoRef = useRef(null);
    const currentQuestion = questions[currentIndex];

    // Voice Setup Logic (Unchanged)
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (!voices.length) return;
            const femaleVoice = voices.find(v =>
                v.name.toLowerCase().includes("zira") ||
                v.name.toLowerCase().includes("samantha") ||
                v.name.toLowerCase().includes("female")
            );
            if (femaleVoice) { setSelectedVoice(femaleVoice); setVoiceGender("female"); return; }
            const maleVoice = voices.find(v =>
                v.name.toLowerCase().includes("david") ||
                v.name.toLowerCase().includes("mark") ||
                v.name.toLowerCase().includes("male")
            );
            if (maleVoice) { setSelectedVoice(maleVoice); setVoiceGender("male"); return; }
            setSelectedVoice(voices[0]);
            setVoiceGender("female");
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, [])

    const videoSource = voiceGender === "male" ? maleVideo : femaleVideo

    const speakText = (text) => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis || !selectedVoice) { resolve(); return; }
            window.speechSynthesis.cancel();
            const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");
            const utterance = new SpeechSynthesisUtterance(humanText);
            utterance.voice = selectedVoice;
            utterance.rate = 0.92;
            utterance.pitch = 1.05;
            utterance.volume = 1;
            utterance.onstart = () => { setIsAIPlaying(true); stopMic(); videoRef.current?.play(); };
            utterance.onend = () => {
                videoRef.current?.pause();
                videoRef.current.currentTime = 0;
                setIsAIPlaying(false);
                if (isMicOn) startMic();
                setTimeout(() => { setSubtitle(""); resolve(); }, 300);
            };
            setSubtitle(text);
            window.speechSynthesis.speak(utterance);
        });
    };

    // Interview Flow Logic (Unchanged)
    useEffect(() => {
        if (!selectedVoice) return;
        const runIntro = async () => {
            if (isIntroPhase) {
                await speakText(`Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`);
                await speakText("I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.");
                setIsIntroPhase(false)
            } else if (currentQuestion) {
                await new Promise(r => setTimeout(r, 800));
                if (currentIndex === questions.length - 1) await speakText("Alright, this one might be a bit more challenging.");
                await speakText(currentQuestion.question);
                if (isMicOn) startMic();
            }
        };
        runIntro();
    }, [selectedVoice, isIntroPhase, currentIndex])

    // Timer Logic
    useEffect(() => {
        if (isIntroPhase || !currentQuestion) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
        }, 1000);
        return () => clearInterval(timer);
    }, [isIntroPhase, currentIndex])

    useEffect(() => {
        if (!isIntroPhase && currentQuestion) setTimeLeft(currentQuestion.timeLimit || 60);
    }, [currentIndex]);

    // Mic Recognition
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) return;
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setAnswer((prev) => prev + " " + transcript);
        };
        recognitionRef.current = recognition;
    }, []);

    const startMic = () => { try { recognitionRef.current?.start(); } catch { } };
    const stopMic = () => { recognitionRef.current?.stop(); };
    const toggleMic = () => { if (isMicOn) stopMic(); else startMic(); setIsMicOn(!isMicOn); };

    // Submission Logic
    const submitAnswer = async () => {
        if (isSubmitting) return;
        stopMic();
        setIsSubmitting(true);
        try {
            const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
                interviewId, questionIndex: currentIndex, answer,
                timeTaken: currentQuestion.timeLimit - timeLeft,
            }, { withCredentials: true });
            setFeedback(result.data.feedback);
            speakText(result.data.feedback);
            setIsSubmitting(false);
        } catch (error) { console.log(error); setIsSubmitting(false); }
    };

    const handleNext = async () => {
        setAnswer(""); setFeedback("");
        if (currentIndex + 1 >= questions.length) { finishInterview(); return; }
        await speakText("Alright, let's move to the next question.");
        setCurrentIndex(currentIndex + 1);
        setTimeout(() => { if (isMicOn) startMic(); }, 500);
    };

    const finishInterview = async () => {
        stopMic(); setIsMicOn(false);
        try {
            const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true });
            onFinish(result.data);
        } catch (error) { console.log(error); }
    };

    useEffect(() => {
        if (!isIntroPhase && currentQuestion && timeLeft === 0 && !isSubmitting && !feedback) submitAnswer();
    }, [timeLeft]);

    useEffect(() => {
        return () => {
            recognitionRef.current?.stop();
            recognitionRef.current?.abort();
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1C1F26] p-4 sm:p-6 md:p-8 pt-20 font-sans">
            <div className="w-full max-w-6xl min-h-[80vh] bg-[#252833] rounded-3xl border border-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row overflow-hidden">

                {/* LEFT — Video Panel */}
                <div className="w-full md:w-[340px] shrink-0 border-b md:border-b-0 md:border-r border-white/5 p-5 sm:p-6 flex flex-col gap-4 bg-[#14B8A6]/[0.02]">
                    
                    {/* Video Box */}
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-black">
                        <video src={videoSource} key={videoSource} ref={videoRef}
                            muted playsInline preload="auto"
                            className="w-full h-auto max-h-[300px] md:max-h-none object-cover block" />
                    </div>

                    {/* Subtitle */}
                    {subtitle && (
                        <div className="bg-[#1C1F26] border border-white/5 rounded-xl p-3.5">
                            <p className="text-[#CBD5E1] text-xs sm:text-sm text-center leading-relaxed font-medium">{subtitle}</p>
                        </div>
                    )}

                    {/* Status + Timer */}
                    <div className="bg-[#1C1F26] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 mt-auto">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Status</span>
                            {isAIPlaying && (
                                <span className="text-[10px] sm:text-xs font-bold text-[#2DD4BF] bg-[#14B8A6]/10 border border-[#14B8A6]/25 px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                                    AI Speaking
                                </span>
                            )}
                        </div>

                        <div className="h-px bg-white/5 w-full" />

                        <div className="flex justify-center">
                            {/* Assuming Timer component works fine, adjust its internal classes if needed */}
                            <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
                        </div>

                        <div className="h-px bg-white/5 w-full" />

                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-2xl font-bold text-[#2DD4BF]">{currentIndex + 1}</span>
                                <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Question</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-2xl font-bold text-[#2DD4BF]">{questions.length}</span>
                                <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Total</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Answer Panel */}
                <div className="flex-1 p-5 sm:p-8 flex flex-col min-w-[300px]">

                    <div className="mb-6">
                        <span className="text-[10px] font-bold text-[#2DD4BF] bg-[#14B8A6]/10 border border-[#14B8A6]/20 px-3 py-1.5 rounded-full tracking-widest uppercase">
                            AI Smart Interview
                        </span>
                    </div>

                    {/* Question Box */}
                    {!isIntroPhase && (
                        <div className="bg-[#1C1F26] border border-white/5 rounded-2xl p-5 sm:p-6 mb-5">
                            <p className="text-[11px] text-[#64748B] mb-2 font-bold uppercase tracking-widest">
                                Question {currentIndex + 1} of {questions.length}
                            </p>
                            <p className="text-base sm:text-lg font-semibold text-[#F1F5F9] leading-relaxed">
                                {currentQuestion?.question}
                            </p>
                        </div>
                    )}

                    {/* Answer Textarea */}
                    <textarea
                        placeholder="Type your answer here or use the microphone..."
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer}
                        className="flex-1 bg-[#1C1F26] border border-white/5 rounded-2xl p-5 text-[#E2E8F0] text-sm sm:text-base leading-relaxed resize-none outline-none focus:border-[#2DD4BF]/50 min-h-[160px] md:min-h-[200px] transition-colors font-sans w-full"
                    />

                    {/* Action Buttons */}
                    {!feedback ? (
                        <div className="flex items-center gap-3 sm:gap-4 mt-5">
                            <motion.button
                                onClick={toggleMic}
                                whileTap={{ scale: 0.9 }}
                                className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-full cursor-pointer transition-all ${
                                    isMicOn 
                                        ? 'bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white shadow-[0_0_16px_rgba(20,184,166,0.3)]' 
                                        : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                                }`}
                            >
                                {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
                            </motion.button>

                            <motion.button
                                onClick={submitAnswer}
                                disabled={isSubmitting}
                                whileTap={{ scale: 0.96 }}
                                className={`flex-1 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all ${
                                    isSubmitting 
                                        ? 'bg-white/5 text-[#475569] cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white cursor-pointer shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:opacity-90'
                                }`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Answer"}
                            </motion.button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-5 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-2xl p-5 sm:p-6"
                        >
                            <p className="text-[#2DD4BF] text-sm sm:text-base leading-relaxed mb-5 font-medium">
                                {feedback}
                            </p>
                            <button
                                onClick={handleNext}
                                className="w-full bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white border-none py-3.5 rounded-full text-sm sm:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:opacity-90 transition-opacity"
                            >
                                {currentIndex + 1 >= questions.length ? "Finish Interview" : "Next Question"}
                                <BsArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Step2Interview
