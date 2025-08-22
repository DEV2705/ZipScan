import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Users,
    AlertTriangle,
    FileText,
    Calendar,
    TrendingUp,
    Search,
    Filter,
    Eye,
    Upload,
    ChevronDown,
    ChevronRight
} from 'lucide-react';
import { plagiarismAPI } from '../services/api';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const BatchResultPage = () => {
    const { batchId } = useParams();
    const navigate = useNavigate();
    const [batchData, setBatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('similarity_desc');
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedParents, setExpandedParents] = useState(new Set(['root']));

    useEffect(() => {
        fetchBatchResults();
    }, [batchId]);

    const fetchBatchResults = async () => {
        try {
            setLoading(true);
            const response = await plagiarismAPI.getBatchResults(batchId);
            console.log('🔍 Batch Data:', response.data); // Debug log
            console.log('📊 Hierarchical Projects:', response.data?.hierarchical_projects); // Debug log
            console.log('👥 Student Summary:', response.data?.student_summary); // Debug log
            setBatchData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load batch results');
        } finally {
            setLoading(false);
        }
    };

    const toggleParent = (parent) => {
        const newExpanded = new Set(expandedParents);
        if (newExpanded.has(parent)) {
            newExpanded.delete(parent);
        } else {
            newExpanded.add(parent);
        }
        setExpandedParents(newExpanded);
    };

    const getPlagiarismColor = (percentage) => {
        if (percentage > 70) return 'bg-red-500/20 text-red-300 border-red-500/30';
        if (percentage > 50) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        return 'bg-green-500/20 text-green-300 border-green-500/30';
    };

    const getSeverityBadge = (percentage) => {
        if (percentage > 70) return { text: 'High Risk', color: 'bg-red-500' };
        if (percentage > 50) return { text: 'Medium Risk', color: 'bg-yellow-500' };
        return { text: 'Low Risk', color: 'bg-green-500' };
    };

    const filteredResults = batchData?.detailed_results?.filter(result =>
        result.student_id_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.student_id_2.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'similarity_desc':
                return b.similarity_percentage - a.similarity_percentage;
            case 'similarity_asc':
                return a.similarity_percentage - b.similarity_percentage;
            case 'student_asc':
                return a.student_id_1.localeCompare(b.student_id_1);
            default:
                return 0;
        }
    });

    // Hierarchical Project View Component
    const HierarchicalProjectView = ({ hierarchicalProjects }) => {
        const filteredHierarchicalProjects = (projects) => {
            return projects.filter(project =>
                !searchTerm ||
                project.student_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        };

        return (
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by student ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Hierarchical Display */}
                {Object.entries(hierarchicalProjects || {}).map(([parent, projects]) => (
                    <div key={parent} className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6">
                        {/* Parent Header */}
                        <div
                            className="flex items-center justify-between p-4 bg-white/5 cursor-pointer rounded-lg mb-4"
                            onClick={() => toggleParent(parent)}
                        >
                            <div className="flex items-center space-x-3">
                                {expandedParents.has(parent) ? (
                                    <ChevronDown className="w-5 h-5 text-gray-300" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-300" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg text-white">
                                        {parent === 'root' ? 'Main Batch' : parent}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {projects.length} projects
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full">
                                    {projects.filter(p => p.plagiarism_detected).length} flagged
                                </span>
                                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                                    {projects.filter(p => !p.plagiarism_detected).length} clean
                                </span>
                            </div>
                        </div>

                        {/* Projects Table */}
                        {expandedParents.has(parent) && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-white/10">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Student ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Most Similar To
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Similarity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white/5 divide-y divide-white/5">
                                        {filteredHierarchicalProjects(projects).map((project, index) => (
                                            <tr key={index} className="hover:bg-white/10">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                    {project.student_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {project.similar_to || 'None'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPlagiarismColor(project.similarity_percentage)}`}>
                                                        {project.similarity_percentage}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.plagiarism_detected
                                                            ? 'bg-red-500/20 text-red-300'
                                                            : 'bg-green-500/20 text-green-300'
                                                        }`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex justify-center items-center min-h-96">
                        <Loading />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto p-6">
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setError('')}
                    />
                    <div className="mt-4">
                        <button
                            onClick={() => navigate('/faculty/upload')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200"
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
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-200/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/faculty/upload')}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-300" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{batchData?.batch?.batch_name}</h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Analyzed on {new Date(batchData?.batch?.uploaded_at).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {batchData?.batch?.total_projects} projects
                                    </div>
                                    {batchData?.batch?.total_nested_zips > 0 && (
                                        <div className="flex items-center">
                                            <FileText className="w-4 h-4 mr-1" />
                                            {batchData?.batch?.total_nested_zips} nested ZIPs
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate('/faculty/history')}
                                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition duration-200 flex items-center space-x-2"
                            >
                                <FileText className="w-4 h-4" />
                                <span>View All Batches</span>
                            </button>
                            <button
                                onClick={() => navigate('/faculty/upload')}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200 flex items-center space-x-2"
                            >
                                <Upload className="w-4 h-4" />
                                <span>Analyze New Batch</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">
                            {batchData?.summary?.total_comparisons || 0}
                        </div>
                        <div className="text-sm text-gray-400">Total Comparisons</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-2">
                            {batchData?.summary?.flagged_projects || 0}
                        </div>
                        <div className="text-sm text-gray-400">High Similarity Projects</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-2">
                            {batchData?.summary?.clean_projects || 0}
                        </div>
                        <div className="text-sm text-gray-400">Clean Projects</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6 text-center">
                        <div className="text-2xl font-bold text-orange-400 mb-2">
                            {batchData?.summary?.plagiarism_percentage || 0}%
                        </div>
                        <div className="text-sm text-gray-400">Similarity Rate</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('comparisons')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'comparisons'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            Detailed Comparisons
                        </button>
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'students'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            Student Projects
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white">Batch Overview</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Assignment Topic</p>
                                    <p className="text-white">{batchData?.batch?.topic}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Upload Date</p>
                                    <p className="text-white">{new Date(batchData?.batch?.uploaded_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Total Projects</p>
                                    <p className="text-white">{batchData?.batch?.total_projects}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Batch Status</p>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                                        Analysis Complete
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'comparisons' && (
                    <div className="space-y-6">
                        {/* Search and Filter */}
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search student IDs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="similarity_desc" className="bg-slate-800">Similarity: High to Low</option>
                                    <option value="similarity_asc" className="bg-slate-800">Similarity: Low to High</option>
                                    <option value="student_asc" className="bg-slate-800">Student: A to Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Comparisons Table */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-white/10">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Student 1
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Student 2
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Similarity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Risk Level
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white/5 divide-y divide-white/5">
                                        {sortedResults.map((result, index) => {
                                            const severity = getSeverityBadge(result.similarity_percentage);
                                            return (
                                                <tr key={result.id || index} className="hover:bg-white/10">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                        {result.student_id_1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                        {result.student_id_2}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getPlagiarismColor(result.similarity_percentage)}`}>
                                                            {result.similarity_percentage}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${result.plagiarized_status === 'Yes'
                                                                ? 'bg-red-500/20 text-red-300'
                                                                : 'bg-green-500/20 text-green-300'
                                                            }`}>
                                                            {result.plagiarized_status === 'Yes' ? 'Flagged' : 'Clean'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className={`w-2 h-2 rounded-full mr-2 ${severity.color}`}></div>
                                                            <span className="text-sm text-gray-300">{severity.text}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {/* Show message if no results */}
                                {sortedResults.length === 0 && (
                                    <div className="text-center py-12">
                                        <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-400">No comparison results found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 🔥 UPDATED: Students tab with fallback handling */}
                {activeTab === 'students' && (
                    <div>
                        {batchData?.hierarchical_projects ? (
                            <HierarchicalProjectView hierarchicalProjects={batchData.hierarchical_projects} />
                        ) : batchData?.student_summary ? (
                            // Fallback: Use student_summary if hierarchical_projects is missing
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6">
                                <h3 className="text-lg font-semibold mb-4 text-white">Student Summary</h3>
                                
                                {/* Search Bar */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="relative flex-1 max-w-md">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search by student ID..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-white/10">
                                        <thead className="bg-white/5">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Student ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Project Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Total Files
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Code Lines
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white/5 divide-y divide-white/5">
                                            {batchData.student_summary
                                                .filter(student => 
                                                    !searchTerm || 
                                                    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((student, index) => (
                                                <tr key={index} className="hover:bg-white/10">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                        {student.student_id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                        {student.project_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                        {student.total_files}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                        {student.code_lines}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                            student.plagiarism_detected
                                                                ? 'bg-red-500/20 text-red-300'
                                                                : 'bg-green-500/20 text-green-300'
                                                        }`}>
                                                            {student.plagiarism_detected ? 'Flagged' : 'Clean'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            // Debug/Empty state
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6 text-center py-12">
                                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">No Student Data Available</h3>
                                <p className="text-gray-400 mb-4">
                                    Student project data is not available for this batch.
                                </p>
                                <button 
                                    onClick={fetchBatchResults} 
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200"
                                >
                                    Refresh Data
                                </button>
                                {/* Debug info - remove in production */}
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm text-gray-400">Debug Info</summary>
                                    <pre className="text-xs text-gray-400 mt-2 bg-white/5 p-2 rounded overflow-auto max-h-40">
                                        {JSON.stringify({
                                            has_hierarchical_projects: !!batchData?.hierarchical_projects,
                                            has_student_summary: !!batchData?.student_summary,
                                            keys: Object.keys(batchData || {}),
                                            batch_data_sample: {
                                                batch: batchData?.batch,
                                                summary: batchData?.summary
                                            }
                                        }, null, 2)}
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-12 flex justify-center space-x-4">
                    <button
                        onClick={() => navigate('/faculty/upload')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200 flex items-center space-x-2"
                    >
                        <Upload className="w-4 h-4" />
                        <span>Analyze Another Batch</span>
                    </button>
                    <button
                        onClick={() => navigate('/faculty/history')}
                        className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition duration-200 flex items-center space-x-2"
                    >
                        <FileText className="w-4 h-4" />
                        <span>View Batch History</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BatchResultPage;
