import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const features = [
    {
      icon: "🔍",
      title: "Smart Analysis",
      description: "Advanced plagiarism detection using machine learning algorithms"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Process multiple projects in seconds with batch analysis"
    },
    {
      icon: "📊",
      title: "Detailed Reports",
      description: "Comprehensive reports with similarity scores and visual comparisons"
    },
    {
      icon: "🛡️",
      title: "Secure & Private",
      description: "Your code is safe with enterprise-grade security"
    }
  ];

  // Smart navigation function
const { user, isAuthenticated } = useAuth();
const navigate = useNavigate();

const handleStartTrial = () => {
  if (!isAuthenticated) {
    // If not logged in, go to login
    navigate('/login');
  } else if (user?.role === 'faculty') {
    // If faculty, go to faculty dashboard
    navigate('/faculty/upload');
  } else if (user?.role === 'student') {
    // If student, go to student dashboard  
    navigate('/student/upload');
  } else {
    // Fallback to login
    navigate('/login');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
          }}
        />
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
      </div>

      {/* Navigation - Updated to show user status */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          
        </motion.div>

      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-medium text-blue-300 border border-blue-500/30 mb-8">
              ✨ AI-Powered Code Analysis
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            It's like{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Googling
            </span>
            <br />
            <span className="text-gray-300">Mid-Sentence</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.5 }}
          >
            CodeNest gives you the answers you didn't study for in every conversation,
            without you even having to ask. Advanced plagiarism detection for academic excellence.
          </motion.p>

          {/* Updated CTA Buttons - Smart navigation */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.7 }}
          >
            <motion.button
              onClick={handleStartTrial}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>

            <Link to="/features">
              <motion.button
                className="px-8 py-4 border-2 border-gray-600 rounded-xl text-lg font-semibold hover:border-gray-400 transition-all duration-300 hover:bg-white/5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Features
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">99%</div>
              <div className="text-gray-400 text-sm">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">10k+</div>
              <div className="text-gray-400 text-sm">Projects Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-400 text-sm">Institutions</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.section
        id="features"
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CodeNest?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced features designed for modern academic integrity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section - Updated with smart navigation */}
      <motion.section
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Transform
              </span>{' '}
              Your Workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of educators and students who trust CodeNest for academic integrity.
            </p>
            
            {/* Smart CTA button */}
            <motion.button
              onClick={handleStartTrial}
              className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>
                  {isAuthenticated 
                    ? `Continue as ${user?.role}` 
                    : 'Start Your Free Trial'
                  }
                </span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>

            {/* Additional links for quick access */}
            {!isAuthenticated && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  View Pricing
                </Link>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  See All Features
                </Link>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
    </div>
  );
};

export default Landing;
