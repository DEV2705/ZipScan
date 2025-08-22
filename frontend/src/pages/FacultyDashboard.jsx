import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Users, BarChart3, Shield, Clock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartTrial = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role === 'faculty') {
      navigate('/faculty/upload');
    } else if (user?.role === 'student') {
      navigate('/student/upload');
    } else {
      navigate('/login');
    }
  };

  const handleScheduleDemo = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/contact');
    }
  };

  const features = [
    {
      icon: Upload,
      title: 'Batch Upload & Analysis',
      description: 'Upload multiple student projects at once and get comprehensive plagiarism analysis within minutes.',
      color: 'text-blue-400'
    },
    {
      icon: Users,
      title: 'Student Management',
      description: 'Organize students, track submissions, and manage academic integrity across all your courses.',
      color: 'text-green-400'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed insights into submission patterns, similarity trends, and comprehensive reporting tools.',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security ensures all student data and submissions remain confidential and secure.',
      color: 'text-red-400'
    },
    {
      icon: Clock,
      title: 'Real-time Results',
      description: 'Get instant notifications and results as soon as analysis is complete, with detailed breakdowns.',
      color: 'text-yellow-400'
    },
    {
      icon: FileText,
      title: 'Comprehensive Reports',
      description: 'Generate detailed plagiarism reports with visual comparisons and similarity percentages.',
      color: 'text-cyan-400'
    }
  ];

  const stats = [
    { label: 'Projects Analyzed', value: '10,000+', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Accuracy Rate', value: '99.2%', icon: BarChart3, color: 'text-blue-400' },
    { label: 'Time Saved', value: '500+ hrs', icon: Clock, color: 'text-purple-400' },
    { label: 'Institutions', value: '200+', icon: Users, color: 'text-cyan-400' }
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
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-4">
            <Users className="h-4 w-4 mr-2" />
            Faculty Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Faculty{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful tools for educators to maintain academic integrity with advanced plagiarism detection and comprehensive analytics.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
                <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
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

        {/* CTA Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Workflow?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of educators who trust CodeNest to maintain academic integrity and save hours of manual checking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartTrial}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200"
              >
                {isAuthenticated && user?.role === 'faculty' ? 'Go to Upload' : 'Start Free Trial'}
              </button>
              <button 
                onClick={handleScheduleDemo}
                className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition duration-200"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
