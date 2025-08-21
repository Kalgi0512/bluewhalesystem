import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye,
  X
} from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { user } = useAuth();
  const socket = io('http://localhost:5000');

  useEffect(() => {
    fetchApplications();
    socket.on('statusUpdate', (updatedApp) => {
      setApplications(prev => prev.map(app => app._id === updatedApp._id ? updatedApp : app));
      toast.success(`Application status updated to ${updatedApp.status}!`);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let filtered = applications;
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/agent/applications');
      if (data.success) {
        setApplications(data.data);
        toast.success('Applications refreshed successfully!');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Review': return 'bg-blue-100 text-[#1B3890] border-blue-200';
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ApplicationCard = ({ application }) => (
    <motion.div
      className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl border border-white/70 transition-all duration-500 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{application.jobTitle}</h3>
            <p className="text-gray-600 text-lg">Candidate: <span className="font-semibold text-[#1B3890]">{application.candidateName}</span></p>
          </div>
          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(application.status)} shadow-sm`}>
            {application.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Clock className="w-5 h-5 text-[#0F79C5]" />
            <div>
              <span className="font-medium text-gray-800">Applied:</span>
              <p>{formatDate(application.appliedAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <FileText className="w-5 h-5 text-[#38BDF8]" />
            <div>
              <span className="font-medium text-gray-800">Company:</span>
              <p>{application.company}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <motion.button 
            onClick={() => setSelectedApplication(application)}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1B3890] to-[#0F79C5] text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5" />
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ApplicationDetailsModal = () => (
    <AnimatePresence>
      {selectedApplication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedApplication(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/70"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1B3890] to-[#0F79C5] bg-clip-text text-transparent">Application Details</h2>
              <motion.button
                onClick={() => setSelectedApplication(null)}
                className="p-3 text-gray-400 hover:text-gray-600 rounded-2xl hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <label className="block text-sm font-bold text-[#1B3890] mb-2 uppercase tracking-wide">Job Title</label>
                  <p className="text-gray-800 text-lg font-semibold">{selectedApplication.jobTitle}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                  <label className="block text-sm font-bold text-purple-700 mb-2 uppercase tracking-wide">Candidate</label>
                  <p className="text-gray-800 text-lg font-semibold">{selectedApplication.candidateName}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <label className="block text-sm font-bold text-green-700 mb-2 uppercase tracking-wide">Status</label>
                  <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(selectedApplication.status)} shadow-sm`}>
                    {selectedApplication.status}
                  </span>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                  <label className="block text-sm font-bold text-orange-700 mb-2 uppercase tracking-wide">Applied Date</label>
                  <p className="text-gray-800 text-lg font-semibold">{formatDate(selectedApplication.appliedAt)}</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Company</label>
                <p className="text-gray-800 text-lg font-semibold">{selectedApplication.company}</p>
              </div>

              {selectedApplication.coverLetter && (
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200">
                  <label className="block text-sm font-bold text-indigo-700 mb-3 uppercase tracking-wide">Cover Letter</label>
                  <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedApplication.coverLetter}</p>
                  </div>
                </div>
              )}

              {selectedApplication.cv && (
                <div className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl border border-cyan-200">
                  <label className="block text-sm font-bold text-cyan-700 mb-3 uppercase tracking-wide">CV</label>
                  <motion.a
                    href={selectedApplication.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1B3890] to-[#0F79C5] text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="w-5 h-5" />
                    Download CV
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/90 backdrop-blur-xl rounded-3xl border border-white/70 shadow-2xl p-12"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-transparent border-t-[#1B3890] rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Applications</h3>
          <p className="text-gray-600">Fetching your application data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#1B3890]/20 to-[#0F79C5]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#38BDF8]/20 to-[#1B3890]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#0F79C5]/20 to-[#38BDF8]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B3890] via-[#0F79C5] to-[#38BDF8] bg-clip-text text-transparent mb-4">
            My Applications
          </h1>
          <motion.div
            className="h-1.5 w-48 rounded-full mx-auto lg:mx-0 bg-gradient-to-r from-[#1B3890] to-[#0F79C5] mb-4"
            initial={{ width: 0 }}
            animate={{ width: 192 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <p className="text-gray-600 text-lg">Track all applications submitted for your candidates</p>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/70 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0F79C5] w-5 h-5" />
            <input
              type="text"
              placeholder="Search by job title or candidate name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B3890] focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0F79C5] w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B3890] focus:border-transparent appearance-none min-w-[200px] bg-white/70 backdrop-blur-sm transition-all duration-300"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <motion.button 
            onClick={fetchApplications}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1B3890] to-[#0F79C5] text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </motion.button>
        </motion.div>

        {/* Enhanced Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-16 text-center border border-white/70"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#1B3890] to-[#0F79C5] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Applications Found</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters to see more applications.' 
                  : 'No applications have been submitted for your candidates yet. Start by managing your candidates and their job applications.'}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ApplicationCard application={application} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Application Details Modal */}
        <ApplicationDetailsModal />
      </div>
    </div>
  );
};

export default Applications;