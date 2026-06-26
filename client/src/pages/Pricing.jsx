import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { motion } from "motion/react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [loadingPlan, setLoadingPlan] = useState(null)
  const dispatch=useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)
      const amount =
        plan.id === "basic" ? 100 :
          plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewGuru.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify",
            response, { withCredentials: true })
            dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!")
          navigate("/")
        },
        theme: {
          color: "#10b981"
        },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null)
    } catch (error) {
      console.log(error)
      setLoadingPlan(null)
    }
  }


  return (
    // DARK MODE BACKGROUND
    <div className='min-h-screen bg-[#1C1F26] text-[#E2E8F0] py-16 px-6 font-sans'>

      {/* HEADER SECTION */}
      <div className='max-w-6xl mx-auto mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative'>

        <button 
          onClick={() => navigate("/")} 
          className='absolute left-0 cursor-pointer top-0 sm:static p-3.5 rounded-full bg-[#252833] border border-white/10 shadow-lg hover:border-[#2DD4BF]/50 transition-all z-10'>
          <FaArrowLeft className='text-[#2DD4BF]' />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Choose Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#06B6D4]'>Plan</span>
          </h1>
          <p className="text-[#64748B] mt-4 text-lg max-w-xl mx-auto">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>

      </div>

      {/* PRICING CARDS */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div key={plan.id}
              whileHover={!plan.default && { y: -8 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border bg-[#252833]
                ${isSelected
                  ? "border-[#2DD4BF] shadow-[0_0_30px_rgba(45,212,191,0.15)] scale-[1.02] md:scale-105 z-10"
                  : "border-white/5 hover:border-[#2DD4BF]/40 shadow-lg"
                }
                ${plan.default ? "cursor-default opacity-90" : "cursor-pointer"}
              `}
            >

              {/* Best Value Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white text-xs px-4 py-1.5 rounded-full shadow-lg font-bold tracking-wider uppercase">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-[#1C1F26] border border-white/10 text-[#64748B] text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider">
                  Current Plan
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-white mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 mb-6">
                <span className="text-4xl font-extrabold text-[#2DD4BF] drop-shadow-[0_0_10px_rgba(45,212,191,0.2)]">
                  {plan.price}
                </span>
                <p className="text-[#64748B] mt-1 text-sm font-medium tracking-wide">
                  {plan.credits} Credits
                </p>
              </div>

              <div className="h-px w-full bg-white/5 my-6"></div>

              {/* Description */}
              <p className="text-[#CBD5E1] text-sm leading-relaxed min-h-[40px]">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#2DD4BF] text-lg mt-0.5 shrink-0" />
                    <span className="text-[#E2E8F0] text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {!plan.default &&
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    }
                    else {
                      handlePayment(plan)
                    }
                  }}
                  className={`w-full mt-10 py-3.5 cursor-pointer rounded-xl font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:opacity-90"
                      : "bg-[#1C1F26] border border-white/10 text-white hover:border-[#2DD4BF]/50"
                  }`}>
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}
                </button>
              }

            </motion.div>
          )
        })}

      </div>
    </div>
  )
}

export default Pricing