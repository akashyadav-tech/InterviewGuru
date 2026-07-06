# 🚀 InterviewGuru — AI-Powered Smart Interview Platform

InterviewGuru is a full-stack MERN web application designed to help users prepare for job interviews through AI-driven mock sessions, real-time feedback, and detailed performance analytics.

🌐 **Live Demo:** [interviewguru-ai-user.onrender.com](https://interviewguru-ai-user.onrender.com/)

> **Stack:** React · Node.js · Express · MongoDB · Firebase · Razorpay · OpenRouter AI · JWT

---

## 👤 Candidate Setup

**Auth & Credits**
- Sign in directly from the front page using Google OAuth (Firebase)
- Secure session management using JWT
- Purchase interview credits seamlessly using the integrated Razorpay payment gateway

**Interview Preparation**
- Upload your resume directly on the setup page
- OpenRouter AI instantly parses the resume and automatically fills in all required columns and fields
- Manual input option available if the user chooses not to upload a resume

---

## 🎙️ Active Interview Process

- On starting the interview, AI initiates an introduction, takes the user's name, and dynamically generates 5 targeted questions
- Answer questions by speaking into the microphone (mic on/off toggle available) or by typing in the text input field
- Each question features a countdown timer to simulate real interview pressure; answers must be submitted within the limit
- Receive instant, AI-generated constructive feedback immediately after submitting the answer for each individual question

---

## 📊 Analytics & History

- Click "Finish Interview" after completing all 5 questions to generate a comprehensive report card
- Export and download the final report card directly to your local device
- Navigate to the **View History** page to access a complete log of all past interviews fetched securely from MongoDB
- Click on any past session to view its specific report card and download it again at any time

---

## 🛠 Tech Stack

| Purpose | Technology |
|---|---|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Auth | Firebase (Google OAuth) + JWT |
| AI Integration | OpenRouter AI |
| Payments | Razorpay |
| Deployment | Render |

---

## ⚙️ How It All Flows

```text
User lands on front page
  └── Logs in via Google (Firebase)
      └── Accesses main dashboard
          └── (Optional) Adds credits via Razorpay
              └── Starts Interview setup
                  └── Uploads Resume → AI auto-fills fields OR enters details manually

Interview Execution
  └── AI takes intro & asks for name
      └── AI asks Question 1 (out of 5)
          └── User answers via Mic or Text (within Timer limit)
              └── Submits answer → Instant AI feedback provided
                  └── Repeats for 5 questions

Post-Interview
  └── User finishes interview
      └── Detailed Report Card generated
          └── Downloadable locally
              └── Saved to MongoDB
                  └── Available in "View History" for future reference


```
Built by [Akash Yadav](https://github.com/akashyadav-tech)
