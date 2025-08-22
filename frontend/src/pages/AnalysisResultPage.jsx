// src/pages/AnalysisResultPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Code, 
  Package, 
  Layers, 
  FileText, 
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';
import { analysisAPI } from '../services/api';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const AnalysisResultPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await analysisAPI.getProjectDetails(projectId);
      setProject(response.data.project);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const TechStackIcon = ({ tech }) => {
    const iconMap = {
      'Python': '🐍',
      'JavaScript': '🟨',
      'React': '⚛️',
      'Django': '🎸',
      'HTML': '🏷️',
      'CSS': '🎨',
      'Node.js': '💚',
      'TypeScript': '💙',
      'Vue.js': '💚',
      'Angular': '🅰️',
      'PHP': '🐘',
      'Java': '☕',
      'C++': '⚙️',
      'C': '🔧',
    };
    return <span className="text-2xl mr-2">{iconMap[tech] || '📄'}</span>;
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto p-6">
          <Alert type="error" message={error} onClose={() => setError('')} />
          <div className="mt-4">
            <button 
              onClick={() => navigate('/student/upload')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition duration-200 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <motion.div {...fadeInUp} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/student/upload')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </button>
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-2">
                  <Code className="h-4 w-4 mr-2" />
                  Project Analysis
                </div>
                <h1 className="text-3xl font-bold text-white">{project?.project_name}</h1>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Analyzed on {new Date(project?.uploaded_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/student/history')}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition duration-200 flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>View All Projects</span>
              </button>
              <button 
                onClick={() => navigate('/student/upload')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition duration-200 flex items-center space-x-2"
              >
                <Code className="w-4 h-4" />
                <span>Analyze New Project</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analysis Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tech Stack */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Technology Stack</h2>
              </div>
              
              {project?.tech_stack?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.tech_stack.map((tech, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center">
                        <TechStackIcon tech={tech} />
                        <span className="font-medium text-white">{tech}</span>
                      </div>
                      {project?.tech_stack_confidence && project.tech_stack_confidence[tech] !== undefined && (
                        <span className="ml-3 px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Confidence: {project.tech_stack_confidence[tech]}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No technology stack detected</p>
              )}
            </div>
          </motion.div>

          {/* File Statistics */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Project Stats</h2>
              </div>
              
              {project?.file_stats && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Files</span>
                    <span className="font-bold text-2xl text-blue-400">
                      {project.file_stats.total_files || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Code Files</span>
                    <span className="font-bold text-2xl text-purple-400">
                      {project.file_stats.code_files || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Size</span>
                    <span className="font-bold text-2xl text-cyan-400">
                      {project.file_stats.total_size_mb || 0} MB
                    </span>
                  </div>
                  {project.file_stats.largest_files && project.file_stats.largest_files.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-gray-400 text-sm">Largest Files</span>
                      <ul className="mt-2 space-y-1">
                        {project.file_stats.largest_files.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="text-white truncate pr-2">{f.name}</span>
                            <span className="text-gray-400">{f.size_kb} KB</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Libraries, Features, and Analysis Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Libraries */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center mb-6">
                <Package className="w-6 h-6 text-orange-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Libraries & Dependencies</h2>
              </div>
              
              {project?.libraries?.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {project.libraries.map((lib, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-200">
                      <span className="font-medium text-white">{lib}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No libraries detected</p>
              )}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center mb-6">
                <Layers className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Detected Features</h2>
              </div>
              
              {project?.features?.length > 0 ? (
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      <span className="font-medium text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No features detected</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Analysis Details */}
        {(project?.analysis_details || project?.tech_stack_confidence) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Dependency-based Frameworks */}
            <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 h-full">
                <div className="flex items-center mb-6">
                  <Package className="w-6 h-6 text-orange-400 mr-3" />
                  <h2 className="text-lg font-semibold text-white">Frameworks (Dependencies)</h2>
                </div>
                {project?.analysis_details?.dependency_analysis?.frameworks?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {[...project.analysis_details.dependency_analysis.frameworks].map((fw, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">{fw}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No frameworks inferred from dependency files</p>
                )}
              </div>
            </motion.div>

            {/* Content-based Frameworks */}
            <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 h-full">
                <div className="flex items-center mb-6">
                  <Layers className="w-6 h-6 text-cyan-400 mr-3" />
                  <h2 className="text-lg font-semibold text-white">Frameworks (Content)</h2>
                </div>
                {project?.analysis_details?.content_analysis?.frameworks?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {[...project.analysis_details.content_analysis.frameworks].map((fw, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">{fw}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No frameworks inferred from code contents</p>
                )}
              </div>
            </motion.div>

            {/* Libraries (from dependencies) */}
            <motion.div {...fadeInUp} transition={{ delay: 0.7 }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 h-full">
                <div className="flex items-center mb-6">
                  <Package className="w-6 h-6 text-orange-400 mr-3" />
                  <h2 className="text-lg font-semibold text-white">Dependency Libraries</h2>
                </div>
                {project?.analysis_details?.dependency_analysis?.libraries?.length ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {project.analysis_details.dependency_analysis.libraries.map((lib, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="font-medium text-white text-sm">{lib}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No dependency libraries detected</p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Action Buttons */}
        <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="mt-12 flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/student/upload')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition duration-200 flex items-center space-x-2"
          >
            <Code className="w-4 h-4" />
            <span>Analyze Another Project</span>
          </button>
          <button 
            onClick={() => navigate('/student/history')}
            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition duration-200 flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Project History</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalysisResultPage;
