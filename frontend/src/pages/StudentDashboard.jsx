import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, History, Lock, Zap, BarChart3, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartTrial = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role === 'student') {
      navigate('/student/upload');
    } else if (user?.role === 'faculty') {
      navigate('/faculty/upload');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMore = () => {
    navigate('/features');
  };

  const features = [
    {
      icon: Upload,
      title: 'Easy Project Submission',
      description: 'Simple drag-and-drop interface to upload your projects for comprehensive analysis and feedback.',
      color: 'text-green-400'
    },
    {
      icon: Eye,
      title: 'Instant Results',
      description: 'Get real-time analysis results with detailed similarity reports and improvement suggestions.',
      color: 'text-blue-400'
    },
    {
      icon: History,
      title: 'Project History',
      description: 'Track all your past submissions and monitor your progress in maintaining academic integrity.',
      color: 'text-purple-400'
    },
    {
      icon: Lock,
      title: 'Privacy Protected',
      description: 'Your projects and data are completely secure with enterprise-grade privacy protection.',
      color: 'text-red-400'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Understand your coding patterns and get insights into your programming development.',
      color: 'text-yellow-400'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get analysis results within seconds, allowing you to iterate and improve quickly.',
      color: 'text-cyan-400'
    }
  ];

  const benefits = [
    { label: 'Projects Analyzed', value: '50,000+', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Student Satisfaction', value: '98%', icon: User, color: 'text-blue-400' },
    { label: 'Average Response Time', value: '<30s', icon: Zap, color: 'text-purple-400' },
    { label: 'Privacy Score', value: '100%', icon: Lock, color: 'text-red-400' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4">
            <User className="h-4 w-4 mr-2" />
            Student Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Student{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empower your academic journey with intelligent project analysis, instant feedback, and comprehensive integrity checking.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
                <IconComponent className={`w-8 h-8 ${benefit.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-white mb-1">{benefit.value}</div>
                <div className="text-sm text-gray-400">{benefit.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* How it Works Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Project</h3>
              <p className="text-gray-300">Simply drag and drop your project files or ZIP archive</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-gray-300">Our advanced AI analyzes your code for similarities and patterns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Results</h3>
              <p className="text-gray-300">Receive detailed reports with actionable insights and suggestions</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Start Your Academic Success Journey</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who use CodeNest to ensure their work maintains the highest academic integrity standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartTrial}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition duration-200"
              >
                {isAuthenticated && user?.role === 'student' ? 'Go to Upload' : 'Start Free Analysis'}
              </button>
              <button 
                onClick={handleLearnMore}
                className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
