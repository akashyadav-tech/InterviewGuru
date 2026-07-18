import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [loadingPlan, setLoadingPlan] = useState(null)
  const dispatch = useDispatch()

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
          color: "#0F6B5C" // Updated to match green theme
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
    // LIGHT THEME BACKGROUND
    <div className='min-h-screen bg-[#FCFCFA] text-[#14171F] py-10 sm:py-16 px-4 sm:px-6 font-sans'>
      
      {/* HEADER SECTION */}
      <div className='max-w-6xl mx-auto mb-12 sm:mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6'>
        
        <button 
          onClick={() => navigate("/")} 
          className='p-3.5 cursor-pointer rounded-md bg-white border border-[#E7E5E1] shadow-sm hover:border-[#CFE3DF] hover:bg-[#F5F5F3] transition-all shrink-0'>
          <FaArrowLeft className='text-[#0F6B5C]' />
        </button>

        <div>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-[#14171F]" style={{ fontFamily: "'Fraunces', serif" }}>
            Choose Your <span className='text-[#0F6B5C]'>Plan</span>
          </h1>
          <p className="text-[#5B6169] mt-2 sm:mt-3 text-sm sm:text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>

      </div>

      {/* PRICING CARDS */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div key={plan.id}
              whileHover={!plan.default && { y: -8 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-lg p-6 sm:p-8 transition-all duration-300 border bg-white
                ${isSelected
                  ? "border-[#0F6B5C] shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-[1.02] md:scale-105 z-10"
                  : "border-[#E7E5E1] hover:border-[#D6D3CE] shadow-sm hover:shadow-md"
                }
                ${plan.default ? "cursor-default opacity-90" : "cursor-pointer"}
              `}
            >

              {/* Best Value Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-6 sm:right-8 -translate-y-1/2 bg-[#0F6B5C] text-white text-[10px] sm:text-xs px-3 py-1.5 rounded-md shadow-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-5 sm:top-6 right-5 sm:right-6 bg-[#F5F5F3] border border-[#E7E5E1] text-[#57534E] text-[10px] sm:text-xs px-3 py-1.5 rounded-md font-semibold uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Current Plan
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-medium text-[#14171F] mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 mb-6">
                <span className="text-4xl font-semibold text-[#14171F]">
                  {plan.price}
                </span>
                <p className="text-[#5B6169] mt-1 text-sm font-medium tracking-wide">
                  {plan.credits} Credits
                </p>
              </div>

              <div className="h-px w-full bg-[#E7E5E1] my-6"></div>

              {/* Description */}
              <p className="text-[#5B6169] text-sm leading-relaxed min-h-[40px]">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#0F6B5C] text-lg mt-0.5 shrink-0" />
                    <span className="text-[#57534E] text-sm font-medium">
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
                  className={`w-full mt-10 py-3.5 cursor-pointer rounded-lg font-semibold tracking-wide transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0F6B5C] hover:bg-[#0B5347] text-white"
                      : "bg-white border border-[#E2E0DC] text-[#14171F] hover:bg-[#F5F5F3]"
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
