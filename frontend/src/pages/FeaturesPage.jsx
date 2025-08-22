import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Shield, BarChart3, Users, Cloud, Lock, Cpu } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Analysis',
      description: 'Advanced plagiarism detection using state-of-the-art machine learning algorithms that understand code structure and logic.',
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process multiple projects in seconds with our optimized analysis engine and batch processing capabilities.',
      color: 'text-yellow-400'
    },
    {
      icon: BarChart3,
      title: 'Detailed Reports',
      description: 'Comprehensive similarity scores with visual comparisons and detailed breakdown of potential matches.',
      color: 'text-green-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your code is safe with enterprise-grade security, encryption, and complete privacy protection.',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Separate dashboards for faculty and students with appropriate permissions and access controls.',
      color: 'text-cyan-400'
    },
    {
      icon: Cloud,
      title: 'Cloud-Powered',
      description: 'Scalable cloud infrastructure ensures reliable performance and automatic backups.',
      color: 'text-indigo-400'
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'GDPR compliant with advanced data protection measures and secure data handling practices.',
      color: 'text-red-400'
    },
    {
      icon: Cpu,
      title: 'AI-Powered',
      description: 'Continuously learning AI models that improve accuracy and reduce false positives over time.',
      color: 'text-orange-400'
    }
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to ensure academic integrity with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6">
              Join thousands of educators who trust CodeNest for maintaining academic integrity
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200">
              Start Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
