import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const posts = [
    {
      title: 'Introducing CodeNest: The Future of Plagiarism Detection',
      date: 'August 15, 2025',
      author: 'CodeNest Team',
      excerpt: 'Learn about our mission to revolutionize academic integrity with AI-powered plagiarism detection that actually works.',
      image: '/api/placeholder/400/250',
      category: 'Announcements',
      readTime: '5 min read'
    },
    {
      title: 'Best Practices for Academic Integrity in 2025',
      date: 'August 10, 2025',
      author: 'Dr. Sarah Johnson',
      excerpt: 'Essential guidelines and tips to ensure originality in student submissions and maintain academic standards.',
      image: '/api/placeholder/400/250',
      category: 'Education',
      readTime: '8 min read'
    },
    {
      title: 'How Our Machine Learning Models Detect Plagiarism',
      date: 'August 5, 2025',
      author: 'Tech Team',
      excerpt: 'Deep dive into the sophisticated ML algorithms that power CodeNest\'s detection capabilities.',
      image: '/api/placeholder/400/250',
      category: 'Technology',
      readTime: '12 min read'
    },
    {
      title: 'Case Study: University X Reduces Plagiarism by 90%',
      date: 'July 28, 2025',
      author: 'Case Studies Team',
      excerpt: 'How University X successfully implemented CodeNest and achieved remarkable results in maintaining academic integrity.',
      image: '/api/placeholder/400/250',
      category: 'Case Study',
      readTime: '6 min read'
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
            CodeNest{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Latest insights, updates, and best practices from the CodeNest team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
                  {post.category}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                <span>{post.readTime}</span>
              </div>

              <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="text-sm font-medium">Read more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200">
            Load More Posts
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
