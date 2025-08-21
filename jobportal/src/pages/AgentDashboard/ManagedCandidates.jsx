import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Search, Edit3, Trash2, Eye, FileText, Phone, Mail, User, X, Save, Upload, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ManagedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [viewingCandidate, setViewingCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', skills: '', experience: '', status:'',
    address: '', qualifications: '', cv: null, passport: null, picture: null, drivingLicense: null
  });

  useEffect(() => { fetchCandidates(); }, []);

  useEffect(() => {
    const filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone?.includes(searchTerm)
    );
    setFilteredCandidates(filtered);
  }, [candidates, searchTerm]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/agent/candidates');
      if (data.success) setCandidates(data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch candidates');
    } finally { setLoading(false); }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') submitData.append(key, formData[key]);
      });

      let response;
      if (editingCandidate) {
        response = await axios.put(`/api/agent/candidates/${editingCandidate._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post('/api/agent/candidates', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.data.success) {
        await fetchCandidates();
        resetForm();
        toast.success(editingCandidate ? 'Candidate updated!' : 'Candidate added!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save candidate');
    } finally { setLoading(false); }
  };

  const handleEdit = candidate => {
    setFormData({
      name: candidate.name, email: candidate.email, phone: candidate.phone, status: candidate.status,
      skills: Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills,
      experience: candidate.experience, address: candidate.address,
      qualifications: Array.isArray(candidate.qualifications) ? candidate.qualifications.join(', ') : candidate.qualifications,
      cv: null, passport: null, picture: null, drivingLicense: null
    });
    setEditingCandidate(candidate);
    setShowAddForm(true);
    setActiveTab('info');
  };

  const handleDelete = async candidateId => {
    if (window.confirm('Are you sure you want to remove this candidate?')) {
      try { await axios.delete(`/api/agent/candidates/${candidateId}`); await fetchCandidates(); toast.success('Deleted successfully!'); }
      catch (error) { console.error(error); toast.error('Failed to delete candidate'); }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', phone: '', skills: '', experience: '', status:'',
      address: '', qualifications: '', cv: null, passport: null, picture: null, drivingLicense: null
    });
    setEditingCandidate(null);
    setShowAddForm(false);
    setActiveTab('info');
  };

  const formatDate = dateString => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <AlertCircle className="w-4 h-4" />;
      case "Reviewed": return <Clock className="w-4 h-4" />;
      case "Approved": return <CheckCircle className="w-4 h-4" />;
      case "Rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg";
      case "Reviewed": return "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg";
      case "Approved": return "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg";
      case "Rejected": return "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg";
    }
  };

  if (loading && candidates.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <motion.p 
            className="text-gray-600 font-medium"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Loading candidates...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Beautiful Header */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl opacity-60"></div>
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-gradient-primary rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-heading-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent pb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Managed Candidates
              </motion.h1>
              <motion.p 
                className="text-muted-dark"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Manage candidates visiting your office
              </motion.p>
            </div>
          </div>
          
          <motion.button 
            onClick={() => setShowAddForm(true)} 
            className="flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="p-1 bg-white/20 rounded-lg"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <Plus className="w-4 h-4" />
            </motion.div>
            Add New Candidate
          </motion.button>
        </div>
      </motion.div>

      {/* Beautiful Search Bar */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-30"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-300 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <motion.div 
                className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Search className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Beautiful Candidates List */}
      {filteredCandidates.length === 0 ? (
        <motion.div 
          className="text-center py-16 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl opacity-60"></div>
          <div className="relative">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Users className="w-10 h-10 text-gray-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-600 mb-3">
              {searchTerm ? 'No matching candidates' : 'No candidates yet'}
            </h3>
            <p className="text-gray-500 text-base">
              {searchTerm ? 'Try different search criteria' : 'Add candidates to get started'}
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate, index) => (
            <motion.div 
              key={candidate._id} 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
              
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                {/* Status Badge */}
                <motion.div 
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusStyle(candidate.status)}`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  >
                    {getStatusIcon(candidate.status)}
                  </motion.div>
                  <span>{candidate.status}</span>
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pr-24">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <User className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 mb-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.1 }}
                        >
                          {candidate.name}
                        </motion.h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          {candidate.email && (
                            <motion.div 
                              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Mail className="w-3 h-3 text-blue-600" />
                              {candidate.email}
                            </motion.div>
                          )}
                          {candidate.phone && (
                            <motion.div 
                              className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-green-100 to-green-200 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Phone className="w-3 h-3 text-green-600" />
                              {candidate.phone}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    {candidate.skills && (
                      <motion.div 
                        className="mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <p className="text-sm text-gray-600 mb-2 font-medium">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(candidate.skills) ? candidate.skills : candidate.skills.split(',')).map((skill, i) => (
                            <motion.span 
                              key={i} 
                              className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs font-medium shadow-sm border border-blue-200"
                              whileHover={{ scale: 1.1, y: -2 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 + i * 0.1 }}
                            >
                              {skill.trim()}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Experience */}
                    {candidate.experience && (
                      <motion.p 
                        className="text-gray-600 text-sm mb-2 px-3 py-1 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-l-4 border-blue-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="font-semibold text-blue-600">Experience:</span> {candidate.experience}
                      </motion.p>
                    )}

                    {/* Qualifications */}
                    {candidate.qualifications && (
                      <motion.div 
                        className="mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <p className="text-sm text-gray-600 mb-2 font-medium">Qualifications:</p>
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(candidate.qualifications) ? candidate.qualifications : candidate.qualifications.split(',')).map((q, i) => (
                            <motion.span 
                              key={i} 
                              className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-xs font-medium shadow-sm border border-indigo-200"
                              whileHover={{ scale: 1.1, y: -2 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.4 + i * 0.1 }}
                            >
                              {q.trim()}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex lg:flex-col gap-2">
                    <motion.button 
                      onClick={() => setViewingCandidate(candidate)} 
                      className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-xl font-medium hover:from-blue-200 hover:to-blue-300 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-3 h-3 group-hover/btn:animate-pulse" />
                      View
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => handleEdit(candidate)} 
                      className="flex items-center gap-2 px-3 py-2 text-green-600 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 rounded-xl font-medium hover:from-green-200 hover:to-green-300 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit3 className="w-3 h-3 group-hover/btn:animate-pulse" />
                      Edit
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => handleDelete(candidate._id)} 
                      className="flex items-center gap-2 px-3 py-2 text-red-600 bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-300 rounded-xl font-medium hover:from-red-200 hover:to-red-300 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-3 h-3 group-hover/btn:animate-pulse" />
                      Remove
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Candidate Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4" 
            onClick={resetForm}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50" 
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-2xl">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
                    </h2>
                    <p className="text-gray-600 text-sm">Fill in the candidate information</p>
                  </div>
                </div>
                <motion.button
                  onClick={resetForm}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Beautiful Tabs */}
              <div className="flex mb-6 bg-gradient-to-r from-gray-100 to-blue-100 rounded-2xl p-1">
                <motion.button 
                  onClick={() => setActiveTab('info')} 
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'info' 
                      ? 'bg-gradient-primary text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Personal Info
                </motion.button>
                <motion.button 
                  onClick={() => setActiveTab('documents')} 
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'documents' 
                      ? 'bg-gradient-primary text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Documents
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'info' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          required 
                          className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          required 
                          className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                        <input 
                          type="text" 
                          name="experience" 
                          value={formData.experience} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Skills (comma-separated)</label>
                      <input 
                        type="text" 
                        name="skills" 
                        value={formData.skills} 
                        onChange={handleInputChange} 
                        className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        rows={3} 
                        className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 resize-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Qualifications (comma-separated)</label>
                      <input 
                        type="text" 
                        name="qualifications" 
                        value={formData.qualifications} 
                        onChange={handleInputChange} 
                        className="w-full px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'documents' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    {['cv','passport','picture','drivingLicense'].map(fileType => (
                      <motion.div 
                        key={fileType}
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative p-3 border-2 border-dashed border-gray-300 rounded-2xl group-hover:border-blue-300 transition-all duration-300">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                            {fileType.replace(/([A-Z])/g, ' $1')}
                          </label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="file" 
                              name={fileType} 
                              onChange={handleFileChange} 
                              accept={fileType==='picture'? 'image/*' : '.pdf,.doc,.docx'} 
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-400 transition-all duration-300" 
                            />
                            <motion.div 
                              className="p-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl text-white shadow-lg"
                              whileHover={{ scale: 1.1, rotate: 10 }}
                            >
                              <Upload className="w-4 h-4" />
                            </motion.div>
                          </div>
                          {formData[fileType] && fileType==='picture' && (
                            <motion.img 
                              src={URL.createObjectURL(formData[fileType])} 
                              alt="Preview" 
                              className="w-20 h-20 object-cover rounded-xl mt-3 border-4 border-white shadow-lg" 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                            />
                          )}
                          {formData[fileType] && fileType!=='picture' && (
                            <motion.p 
                              className="text-sm text-blue-600 mt-2 font-medium"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              📄 {formData[fileType].name}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Beautiful Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <motion.button 
                    type="button" 
                    onClick={resetForm} 
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    type="submit" 
                    disabled={loading} 
                    className="flex-1 flex items-center justify-center gap-3 px-5 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <motion.div 
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {loading ? 'Saving...' : (editingCandidate ? 'Update Candidate' : 'Add Candidate')}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Candidate Modal */}
      <AnimatePresence>
        {viewingCandidate && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4" 
            onClick={() => setViewingCandidate(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50" 
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2 bg-gradient-primary rounded-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Candidate Details</h2>
                    <p className="text-gray-600 text-sm">Complete candidate information</p>
                  </div>
                </div>
                <motion.button 
                  onClick={() => setViewingCandidate(null)} 
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="block text-sm font-semibold text-blue-700 mb-1">Name</label>
                    <p className="text-gray-800 font-medium text-base">{viewingCandidate.name}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="block text-sm font-semibold text-green-700 mb-1">Email</label>
                    <p className="text-gray-800 font-medium">{viewingCandidate.email}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="block text-sm font-semibold text-indigo-700 mb-1">Phone</label>
                    <p className="text-gray-800 font-medium">{viewingCandidate.phone || 'Not provided'}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="block text-sm font-semibold text-orange-700 mb-1">Experience</label>
                    <p className="text-gray-800 font-medium">{viewingCandidate.experience || 'Not provided'}</p>
                  </motion.div>
                </div>

                {/* Skills Section */}
                {viewingCandidate.skills && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
                  >
                    <label className="block text-base font-bold text-gray-700 mb-3">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(viewingCandidate.skills) ? viewingCandidate.skills : viewingCandidate.skills.split(',')).map((s,i) => (
                        <motion.span 
                          key={i} 
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-xs font-semibold shadow-lg"
                          whileHover={{ scale: 1.1, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {s.trim()}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Qualifications Section */}
                {viewingCandidate.qualifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                  >
                    <label className="block text-base font-bold text-gray-700 mb-3">Qualifications</label>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(viewingCandidate.qualifications) ? viewingCandidate.qualifications : viewingCandidate.qualifications.split(',')).map((q,i) => (
                        <motion.span 
                          key={i} 
                          className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg"
                          whileHover={{ scale: 1.1, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {q.trim()}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Address */}
                {viewingCandidate.address && (
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="block text-base font-bold text-gray-700 mb-1">Address</label>
                    <p className="text-gray-800 leading-relaxed">{viewingCandidate.address}</p>
                  </motion.div>
                )}

                {/* Date Added */}
                <motion.div 
                  className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <label className="block text-sm font-semibold text-indigo-700 mb-1">Added Date</label>
                  <p className="text-gray-800 font-medium">{formatDate(viewingCandidate.addedAt)}</p>
                </motion.div>

                {/* Documents Section */}
                {viewingCandidate.documents && viewingCandidate.documents.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200"
                  >
                    <label className="block text-base font-bold text-gray-700 mb-3">Documents</label>
                    <div className="flex flex-wrap gap-3">
                      {viewingCandidate.documents.map((doc, i) => (
                        doc.type === 'Picture' ? (
                          <motion.img 
                            key={i} 
                            src={doc.fileUrl} 
                            alt={doc.type} 
                            className="w-20 h-20 object-cover rounded-xl border-4 border-white shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          />
                        ) : (
                          <motion.a 
                            key={i} 
                            href={doc.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FileText className="w-4 h-4" />
                            {doc.type}
                          </motion.a>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagedCandidates;