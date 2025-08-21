import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Eye,
  X,
  Filter,
  Plus,
  Sparkles
} from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newInquiry, setNewInquiry] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const { user } = useAuth();
  const socket = io('http://localhost:5000');

  useEffect(() => {
    fetchInquiries();
    socket.on('inquiryResponse', (updatedInquiry) => {
      setInquiries(prev => prev.map(inq => inq._id === updatedInquiry._id ? updatedInquiry : inq));
      toast.success('New response to your inquiry!');
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let filtered = inquiries;
    if (searchTerm) {
      filtered = filtered.filter(inq =>
        inq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inq => inq.status === statusFilter);
    }
    setFilteredInquiries(filtered);
  }, [inquiries, searchTerm, statusFilter]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/agent/inquiries');
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInquiry = async (e) => {
    e.preventDefault();
    if (!newInquiry.trim()) return;
    try {
      const { data } = await axios.post('/api/agent/inquiries', { content: newInquiry });
      if (data.success) {
        setInquiries(prev => [data.inquiry, ...prev]);
        setNewInquiry('');
        toast.success('Inquiry sent successfully!');
      }
    } catch (error) {
      toast.error('Failed to send inquiry');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'In Review': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Closed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case 'In Review': return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white';
      case 'Resolved': return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      case 'Closed': return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const InquiryCard = ({ inquiry, index }) => (
    <motion.div
      className="group relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <motion.h3 
              className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors"
              whileHover={{ x: 5 }}
            >
              {inquiry.subject || 'General Inquiry'}
            </motion.h3>
            <p className="text-gray-600 line-clamp-2 leading-relaxed">{inquiry.content}</p>
          </div>
          
          <motion.div
            className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getStatusStyle(inquiry.status)}`}
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(inquiry.status)}
              {inquiry.status}
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200">
              <Clock className="w-4 h-4" />
            </div>
            {formatDate(inquiry.createdAt)}
          </motion.div>
        </div>

        {inquiry.response && (
          <motion.div 
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Admin Response:
            </p>
            <p className="text-green-800">{inquiry.response}</p>
          </motion.div>
        )}

        <div className="flex justify-end">
          <motion.button
            onClick={() => setSelectedInquiry(inquiry)}
            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const InquiryDetailsModal = () => (
    <AnimatePresence>
      {selectedInquiry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <motion.h2 
                className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Inquiry Details
              </motion.h2>
              <motion.button
                onClick={() => setSelectedInquiry(null)}
                className="p-3 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Subject</label>
                  <p className="text-gray-800 bg-gray-50 rounded-lg p-3">{selectedInquiry.subject || 'General Inquiry'}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Status</label>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(selectedInquiry.status)}`}>
                    {getStatusIcon(selectedInquiry.status)}
                    {selectedInquiry.status}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Message Content</label>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedInquiry.content}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Date Submitted</label>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(selectedInquiry.createdAt)}</span>
                </div>
              </div>

              {selectedInquiry.response && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-green-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Admin Response
                  </label>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-400">
                    <p className="text-green-800 whitespace-pre-wrap leading-relaxed">{selectedInquiry.response}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-medium">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          My Inquiries
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Create and track inquiries to admin support
        </motion.p>
        <motion.div
          className="h-1 w-24 rounded-full mt-4 mx-auto md:mx-0"
          style={{ background: "linear-gradient(90deg, #1B3890, #0F79C5)" }}
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* New Inquiry Form */}
      <motion.div 
        className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="p-3 rounded-xl bg-gradient-primary text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800">Send New Inquiry</h3>
        </div>
        
        <form onSubmit={handleCreateInquiry} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your inquiry message..."
              value={newInquiry}
              onChange={(e) => setNewInquiry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
            />
          </div>
          <motion.button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
            Send Inquiry
          </motion.button>
        </form>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-[200px] bg-white/80 backdrop-blur-sm transition-all duration-300"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          
          <motion.button
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Inquiries List */}
      <div className="space-y-6">
        {filteredInquiries.length === 0 ? (
          <motion.div 
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-16 text-center border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <MessageSquare className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-gray-600 mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              No Inquiries Found
            </motion.h3>
            <motion.p 
              className="text-gray-500 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search filters.'
                : 'No inquiries have been created yet. Send your first inquiry above!'}
            </motion.p>
          </motion.div>
        ) : (
          filteredInquiries.map((inquiry, index) => (
            <InquiryCard key={inquiry._id || index} inquiry={inquiry} index={index} />
          ))
        )}
      </div>

      {/* Inquiry Details Modal */}
      <InquiryDetailsModal />
    </div>
  );
};

export default Inquiries;