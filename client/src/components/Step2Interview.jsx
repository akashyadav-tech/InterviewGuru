import React, { useEffect, useRef, useState } from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import axios from 'axios';
import { motion } from "motion/react"
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
    <div style={{
      minHeight: '100vh',
      background: '#1C1F26',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        minHeight: '80vh',
        background: '#252833',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        flexWrap: 'wrap'
      }}>

        {/* LEFT — Video Panel */}
        <div style={{
          width: '320px',
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'rgba(20,184,166,0.03)'
        }}>
          {/* Video */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <video src={videoSource} key={videoSource} ref={videoRef}
              muted playsInline preload="auto"
              style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div style={{
              background: '#1C1F26',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              padding: '14px 16px'
            }}>
              <p style={{ color: '#CBD5E1', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.6 }}>{subtitle}</p>
            </div>
          )}

          {/* Status + Timer */}
          <div style={{
            background: '#1C1F26',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Interview Status</span>
              {isAIPlaying && (
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2DD4BF',
                  background: 'rgba(20,184,166,0.12)',
                  border: '1px solid rgba(20,184,166,0.25)',
                  padding: '3px 10px',
                  borderRadius: '999px'
                }}>AI Speaking</span>
              )}
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2DD4BF' }}>{currentIndex + 1}</span>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Current Question</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2DD4BF' }}>{questions.length}</span>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Answer Panel */}
        <div style={{ flex: 1, minWidth: '300px', padding: '32px', display: 'flex', flexDirection: 'column' }}>

          <div style={{ marginBottom: '24px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#2DD4BF',
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.22)',
              padding: '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              AI Smart Interview
            </span>
          </div>

          {/* Question Box */}
          {!isIntroPhase && (
            <div style={{
              background: '#1C1F26',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '20px'
            }}>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Question {currentIndex + 1} of {questions.length}
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#F1F5F9', lineHeight: 1.6 }}>
                {currentQuestion?.question}
              </p>
            </div>
          )}

          {/* Answer Textarea */}
          <textarea
            placeholder="Type your answer here or use the mic..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            style={{
              flex: 1,
              background: '#1C1F26',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              padding: '18px 20px',
              color: '#E2E8F0',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              minHeight: '160px',
              transition: 'border 0.2s'
            }} />

          {/* Buttons */}
          {!feedback ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '20px' }}>
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '48px',
                  height: '48px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: isMicOn ? 'linear-gradient(135deg, #14B8A6, #06B6D4)' : 'rgba(244,63,94,0.15)',
                  border: isMicOn ? 'none' : '1px solid rgba(244,63,94,0.3)',
                  color: isMicOn ? '#fff' : '#FB7185',
                  cursor: 'pointer',
                  boxShadow: isMicOn ? '0 0 16px rgba(20,184,166,0.3)' : 'none'
                }}>
                {isMicOn ? <FaMicrophone size={18} /> : <FaMicrophoneSlash size={18} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.96 }}
                style={{
                  flex: 1,
                  background: isSubmitting ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                  color: isSubmitting ? '#475569' : '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(20,184,166,0.25)',
                  transition: 'all 0.2s'
                }}>
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '20px',
                background: 'rgba(20,184,166,0.08)',
                border: '1px solid rgba(20,184,166,0.22)',
                borderRadius: '16px',
                padding: '20px'
              }}>
              <p style={{ color: '#2DD4BF', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>{feedback}</p>
              <button
                onClick={handleNext}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
                  color: '#fff',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '999px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 0 20px rgba(20,184,166,0.25)'
                }}>
                {currentIndex + 1 >= questions.length ? "Finish Interview" : "Next Question"}
                <BsArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview