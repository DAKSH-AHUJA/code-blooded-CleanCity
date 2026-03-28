import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import "./Home.css";
import { motion } from "framer-motion";
import { ToastContainer } from 'react-toastify';

import { AnimatePresence } from "framer-motion";



function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [faqFilter, setFaqFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add("animate-fade-up");
        }
      });
    };
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
const questions = [
  {
    id: 1,
    question: "What is EcoSync?",
    answer: "EcoSync is a civic engagement platform that allows citizens to report and track local issues in their communities, such as potholes, broken streetlights, and garbage collection problems.",
    popular: true,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx={12} cy={12} r={10} />
        <path d="M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 5" />
        <circle cx={12} cy={17} r={1} />
      </svg>
    )
  },
  {
    id: 2,
    question: "How do I report an issue?",
    answer: "To report an issue, simply take a photo of the problem, add a description, and mark the location on the map. Your report will be sent to the appropriate city department for review.",
    media: "/faq-report-demo.gif",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x={3} y={3} width={18} height={14} rx={2} />
        <circle cx={7.5} cy={8.5} r={1.5} />
        <path d="M21 21l-6-6-4 4-5-5" />
      </svg>
    )
  },
  {
    id: 3,
    question: "Is EcoSync free to use?",
    answer: "Yes, EcoSync is completely free for citizens to use. There are no hidden fees or charges.",
    popular: true,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 8c-1.5 0-2.7 1.3-2.7 2.7 0 .3.2.8.4 1.1.3.6 1 .7 1.4.7h2.6c.5 0 1.2-.1 1.5-.8.2-.3.4-.8.4-1 0-1.5-1.2-2.7-2.7-2.7Z" />
        <path d="M12 15h.01" />
        <circle cx={12} cy={12} r={10} />
      </svg>
    )
  },
  {
    id: 4,
    question: "How can I track the status of my report?",
    answer: "You can track the status of your report through the EcoSync app or website. You will receive notifications when your issue is reviewed and resolved.",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" />
        <circle cx={12} cy={12} r={10} />
      </svg>
    )
  },
  {
    id: 5,
    question: "Can I vote on issues reported by others?",
    answer: "Yes! You can upvote issues reported by other citizens to help prioritize them for resolution.",
    popular: true,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M5 15l7-7 7 7" />
      </svg>
    )
  }
];

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      ),
      title: "Report Issues",
      description: "Easily report problems with photos, location data, and detailed descriptions for faster resolution.",
      features: ["Photo uploads", "Map integration", "Categorized issues"],
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      title: "Track Progress",
      description: "Follow the status of your reports from submission to resolution with real-time insights.",
      features: ["Real-time updates", "Status notifications", "Resolution timeline"],
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Community Voting",
      description: "Upvote issues in your area to help prioritize what matters most to your community.",
      features: ["Issue upvoting", "Trending issues", "Community feedback"],
      gradient: "from-cyan-400 to-blue-500"
    }
  ];
  const steps = [
    {
      step: "01",
      title: "Report an Issue",
      description: "Take a photo, mark the location on the map, and add a detailed description of the problem you've encountered and we will reach you out soon.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      step: "02",
      title: "City Review",
      description: "City workers review and prioritize issues based on severity, impact, and community votes to ensure efficient resource allocation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
        </svg>
      ),
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      step: "03",
      title: "Track Resolution",
      description: "Follow the progress of your report from submission to completion with real-time updates and transparent communication.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      gradient: "from-cyan-500 to-blue-600"
    }
  ];


  // Render Home Page UI with JSX
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="toast-body custom-toast-shadow"
        bodyClassName="text-sm font-medium"
      />

      <Helmet>
        <title>EcoSync | Report Local Issues & Improve Your Community</title>
        <meta name="description" content="EcoSync helps citizens report and track local civic issues like potholes, broken lights, and garbage collection problems. Make your city better today!" />
      </Helmet>


      <main className="flex-1">
        <section className="py-2 md:py-4 lg:py-6 xl:py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center min-h-[calc(100vh-8rem)]">
              <div className="flex flex-col justify-center space-y-6 animate-on-scroll">
                <div className="w-full bg-white dark:bg-gray-900 pt-8 md:pt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-12">
        
        {/* Text + Buttons + Stars */}
        <div className="flex flex-col items-start text-left max-w-[600px] gap-6">
         <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl leading-tight"
>
  Report Local Issues. <br />
  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
    Make Your City Better.
  </span>
</motion.h1>

          <p className="text-muted-foreground md:text-xl leading-relaxed">
            EcoSync helps citizens report and track local civic issues like potholes,
            broken lights, and garbage collection problems. Join thousands making their
            communities better.
          </p>

          {/* Buttons aligned with text */}
          <nav aria-label="primary actions" className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] group"
              onClick={() => navigate('/report-issue')}
            >
              Report an Issue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

      </nav>

      {/* ⭐ Rating just below buttons */}
      <div className="flex items-center gap-1 mt-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-2">
          4.8/5 from 2,500+ users
        </span>
      </div>
    </div>
  </div>
</div>


              </div>
              <div className="flex items-center justify-center animate-on-scroll">
                <div className="relative w-full max-w-[400px] aspect-[4/3] overflow-hidden rounded-xl border shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <img src="pexels.jpg" alt="EcoSync App Interface showing issue reporting" className="shadow-lg object-cover w-full h-full transform transition-transform duration-500 hover:scale-105 hover:rotate-1" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-xs font-medium text-gray-700">✅ Live Demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-emerald-900/20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-100/40 to-emerald-100/40 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 mb-6">
            <span className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Everything you need
            </span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">to improve your community</span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            EcoSync provides a comprehensive platform for citizens and city workers to collaborate 
            on local issues and build stronger communities together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/50 dark:to-teal-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>

              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="12" 
                          height="12" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="white" 
                          strokeWidth="3"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-200/50 dark:group-hover:border-emerald-700/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>

        <section className="relative py-24 bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-emerald-900/10 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-l from-teal-100/30 to-cyan-100/30 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 border border-emerald-200/60 dark:border-emerald-700/50 mb-8 shadow-sm">
            <span className="text-emerald-800 dark:text-emerald-200 font-bold text-sm uppercase tracking-wider">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800 dark:text-slate-200">Simple process,</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              powerful results
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            EcoSync makes it easy to report issues and track their resolution in just a few simple steps. 
            Join thousands of citizens making their communities better.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:block relative">
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-800"></div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative mb-6 flex justify-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      
                
                    </div>

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700"></div>
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>


        <motion.section
    id="faqs"
    className="bg-gray-50 dark:bg-gray-900 py-6 md:py-12 lg:py-16"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={containerVariants}
>

  <div className="container px-4 mx-auto">
    <motion.div className="flex flex-col items-center space-y-4 text-center w-full" variants={itemVariants}>
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">FAQs</div>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Find answers to commonly asked questions about EcoSync platform features and services.
        </p>
      </div>
      {/* FAQ Filter */}
      <div className="flex gap-2 items-center justify-center mt-2">
        {["All", "Popular"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full transition
              ${faqFilter === type
                ? "bg-emerald-500 text-white font-semibold"
                : "bg-emerald-100 text-emerald-800"}`}
            onClick={() => setFaqFilter(type)}
            aria-pressed={faqFilter === type}
          >
            {type}
          </button>
        ))}
      </div>
    </motion.div>

    <div className="w-full mt-8 max-w-3xl mx-auto space-y-4">
      {(faqFilter === "All" ? questions : questions.filter(f => f.popular)).map((faq) => (
        <div
          key={faq.id}
          className="faq-card-glass py-2 px-1 mb-2 w-full overflow-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveFaq(activeFaq === faq.id ? null : faq.id);
            }
          }}
        >
          <button
            className={`w-full text-left flex items-center justify-between px-4 py-3 border-0 outline-none focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-none rounded-lg transition-colors duration-300 text-base md:text-lg
              ${activeFaq === faq.id
                ? "bg-white dark:bg-emerald-700/30 text-emerald-900 dark:text-white font-semibold"
                : "bg-emerald-50 dark:bg-[#181e2f] text-emerald-800 dark:text-white hover:bg-emerald-100 dark:hover:bg-[#22273b]"
              }`}
            style={{ minHeight: 56 }}
            onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
            aria-expanded={activeFaq === faq.id}
            aria-controls={`faq-answer-${faq.id}`}
          >
            <span className="flex items-center gap-2 font-medium">
              {faq.icon}
              {faq.question}
              {faq.popular && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-700 text-xs font-semibold">
                  Popular
                </span>
              )}
            </span>
            {activeFaq === faq.id ? (
              <svg className="w-5 h-5 text-emerald-500 transition-transform duration-300 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-emerald-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>

          <AnimatePresence initial={false}>
            {activeFaq === faq.id && (
              <motion.div
                id={`faq-answer-${faq.id}`}
                className="mt-1 px-4 bg-white/90 dark:bg-[#151c29ef] rounded-b-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                layout
              >
                <motion.p
                  className="py-3 text-left text-gray-700 dark:text-white"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
                {/* {faq.media && (
                  <img
                    src={faq.media}
                    alt="FAQ explainer"
                    className="mb-2 rounded-lg shadow-sm w-full max-w-xs"
                    style={{ pointerEvents: "none" }}
                    loading="lazy"
                  />
                )} */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>

    <style>{`
      .faq-card-glass {
        background: rgba(255,255,255,0.85);
        border-radius: 1rem;
        box-shadow: 0 2px 16px rgba(44,62,80,0.05);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(52,211,153,0.12);
        margin-bottom: 18px;
        transition: box-shadow 0.3s, background 0.3s;
      }
      .faq-card-glass:focus-within,
      .faq-card-glass:hover {
        box-shadow: 0 6px 48px rgba(32,90,90,0.14);
        background: rgba(240,253,250,0.97);
      }
      .dark .faq-card-glass {
        background: rgba(18,22,34,0.83);
        border: 1px solid rgba(16,185,129,0.09);
      }
      .dark .faq-card-glass:focus-within,
      .dark .faq-card-glass:hover {
        background: rgba(16,185,129,0.04);
        box-shadow: 0 10px 48px rgba(16,185,129,0.14);
      }
    `}</style>
  </div>

    
</motion.section>      </main>
    </div>
  );
}

export default Home;




