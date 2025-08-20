import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, User, Briefcase, Mail, Phone, MapPin, 
  Calendar, ChevronDown, Eye, Edit2, Trash2, Download, Upload 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CandidatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [candidateType, setCandidateType] = useState('All'); 
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobInterestFilter, setJobInterestFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

const navigate = useNavigate();

const handleRowClick = (candidateId) => {
  navigate(`/sales-dashboard/candidates/${candidateId}`);
};

const candidates = [
  {
    id: 1,
    name: 'John Smith',
    type: 'B2C',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Toronto, Canada',
    profession: 'Software Engineer',
    status: 'New Application',
    jobInterest: 'IT Roles',
    lastContact: '2023-05-15',
    resume: 'Submitted',
    visaStatus: 'Processing',
    agent: null
  },
  {
    id: 2,
    name: 'Emily Carter',
    type: 'B2B',
    email: 'emily.carter@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, USA',
    profession: 'Nurse',
    status: 'Documentation',
    jobInterest: 'Healthcare',
    lastContact: '2023-05-18',
    resume: 'Submitted',
    visaStatus: 'Not Started',
    agent: {
      id: 'AG-101',
      name: 'Global Talent Agency',
      contactPerson: 'Sarah Johnson',
      email: 'info@globaltalent.com',
      phone: '+1 (555) 987-0000'
    }
  },
  {
    id: 3,
    name: 'Maria Garcia',
    type: 'B2C',
    email: 'maria.g@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Vancouver, Canada',
    profession: 'Registered Nurse',
    status: 'Assessment',
    jobInterest: 'Healthcare',
    lastContact: '2023-05-10',
    resume: 'Submitted',
    visaStatus: 'Approved',
    agent: null
  },
  {
    id: 4,
    name: 'Ahmed Khan',
    type: 'B2C',
    email: 'ahmed.k@email.com',
    phone: '+1 (555) 654-3210',
    location: 'Dubai, UAE',
    profession: 'Construction Manager',
    status: 'Offer Received',
    jobInterest: 'Construction',
    lastContact: '2023-05-17',
    resume: 'Submitted',
    visaStatus: 'Approved',
    agent: null
  },
  {
    id: 5,
    name: 'Sophie Martin',
    type: 'B2B',
    email: 'sophie.m@email.com',
    phone: '+1 (555) 210-9876',
    location: 'Paris, France',
    profession: 'Executive Chef',
    status: 'Rejected',
    jobInterest: 'Hospitality',
    lastContact: '2023-05-12',
    resume: 'Submitted',
    visaStatus: 'Rejected',
    agent: {
      id: 'AG-102',
      name: 'Talent Bridge International',
      contactPerson: 'Emma Brown',
      email: 'support@talentbridge.org',
      phone: '+1 (555) 789-0123'
    }
  },
  {
    id: 6,
    name: 'Liam Walker',
    type: 'B2B',
    email: 'liam.w@email.com',
    phone: '+1 (555) 321-4321',
    location: 'London, UK',
    profession: 'Accountant',
    status: 'Completed',
    jobInterest: 'Finance',
    lastContact: '2023-05-05',
    resume: 'Submitted',
    visaStatus: 'Completed',
    agent: {
      id: 'AG-103',
      name: 'Elite Migration Partners',
      contactPerson: 'David Wilson',
      email: 'contact@elitemigration.com',
      phone: '+1 (555) 321-0987'
    }
  }
];

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = candidateType === 'All' || candidate.type === candidateType;
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
    const matchesJobInterest = jobInterestFilter === 'All' || candidate.jobInterest === jobInterestFilter;
    const matchesAssigned = assignedFilter === 'All' || candidate.assigned === assignedFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesJobInterest && matchesAssigned;
  });

  // Pagination
  const candidatesPerPage = 5;
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * candidatesPerPage,
    currentPage * candidatesPerPage
  );

  // Get unique values for filters
  const statusOptions = ['All', ...new Set(candidates.map(c => c.status))];
  const jobInterestOptions = ['All', ...new Set(candidates.map(c => c.jobInterest))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Application': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assessment': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Documentation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Visa Processing': return 'bg-green-100 text-green-800 border-green-200';
      case 'Offer Received': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVisaStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Completed': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 md:p-6"
    >
      <div className="relative z-10">
        {/* Header */}
      <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 text-center md:text-left"
        >
          <div className="space-y-2">
            <motion.h1
              className="text-heading-lg font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              Candidate Management
            </motion.h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage B2B candidates and B2C candidate profiles</p>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {filteredCandidates.filter(c => c.type === 'B2B').length} B2B Candidates
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {filteredCandidates.filter(c => c.type === 'B2C').length} B2C Candidates
              </span>
            </div>
          </div>          
        </motion.div>

        {/* Search and Filters */}
<motion.div
  variants={itemVariants}
  className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl border border-white/20"
>
  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
    {/* Search Bar */}
    <div className="relative flex-1 max-w-full lg:max-w-md">
      <motion.div
        className="absolute inset-y-0 z-1 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none"
        animate={{
          scale: searchQuery ? [1, 1.2, 1] : 1,
          color: searchQuery ? 'var(--color-secondary)' : '#6B7280'
        }}
        transition={{ duration: 0.3 }}
      >
        <Search size={18} className="sm:w-5 sm:h-5" />
      </motion.div>
      <input
        type="text"
        placeholder="Search by name, email, or profession..."
        className="pl-10 sm:pl-12 w-full p-3 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 focus:outline-none bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-md text-xs sm:text-base"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Filters */}
    <div className="flex gap-2 sm:gap-4 flex-wrap">
      {[
        { 
          label: 'Type', 
          value: candidateType, 
          setter: setCandidateType, 
          options: ['All', 'B2B', 'B2C'] 
        },
        { 
          label: 'Status', 
          value: statusFilter, 
          setter: setStatusFilter, 
          options: ['All', ...new Set(candidates.map(c => c.status))] 
        },
        { 
          label: 'Job Interest', 
          value: jobInterestFilter, 
          setter: setJobInterestFilter, 
          options: ['All', ...new Set(candidates.map(c => c.jobInterest))] 
        }
      ].map((filter, index) => (
        <motion.div
          key={filter.label}
          className="relative flex-1 min-w-[120px] sm:min-w-0 sm:flex-none"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <select
            className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all duration-300 hover:shadow-md cursor-pointer w-full text-xs sm:text-sm"
            value={filter.value}
            onChange={(e) => filter.setter(e.target.value)}
          >
            {filter.options.map(option => (
                  <option key={option} value={option}>
                    {option === 'All' ?
                      (filter.label === 'Status' ? 'All Status' : `All ${filter.label}s`) :
                      option}
                  </option>
                ))}
          </select>
          <motion.div
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none"
            animate={{ rotate: filter.value !== 'All' ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown
              size={16}
              className={`sm:w-[18px] sm:h-[18px] ${filter.value !== 'All' ? 'text-[var(--color-secondary)]' : 'text-gray-500'}`}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>

        {/* Candidates Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Filter size={18} className="text-blue-600" />
              Candidate Overview
            </h3>
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              {filteredCandidates.length} of {candidates.length} candidates
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Candidate Information', 'Type', 'Profession', 'Status', 'Job Interest', 'Visa Status', 'Last Contact'].map((header) => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {paginatedCandidates.length > 0 ? (
                    paginatedCandidates.map((candidate) => (
                      <motion.tr
                        key={candidate.id}
                         onClick={() => handleRowClick(candidate.id)}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="group hover:bg-gray-50 transition-all duration-100 cursor-pointer"
                        onMouseEnter={() => setHoveredRow(candidate.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-xl ${candidate.type === 'B2C' ? 'bg-blue-100' : 'bg-indigo-100'}`}>
                              {candidate.type === 'B2C' ? (
                                <User className="h-5 w-5 text-blue-600" />
                              ) : (
                                <Briefcase className="h-5 w-5 text-indigo-600" />
                              )}
                            </div>
                            <div className="space-y-1 cursor-pointer">
                              <div className="text-sm font-semibold text-gray-900">
                                {candidate.name}
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Mail size={12} />
                                <span>{candidate.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Phone size={12} />
                                <span>{candidate.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <MapPin size={12} />
                                <span>{candidate.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                            candidate.type === 'B2C' 
                              ? 'bg-blue-100 text-blue-800 border-blue-200' 
                              : 'bg-indigo-100 text-indigo-800 border-indigo-200'
                          }`}>
                            {candidate.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{candidate.profession}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{candidate.jobInterest}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getVisaStatusColor(candidate.visaStatus)}`}>
                            {candidate.visaStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{candidate.lastContact}</td>                      
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Search size={24} className="text-gray-400" />
                          </div>
                          <div className="text-gray-500">
                            <p className="text-lg font-medium">No candidates found</p>
                            <p className="text-sm">Try adjusting your search criteria</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            <AnimatePresence>
              {paginatedCandidates.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {paginatedCandidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      className="p-6 space-y-3"
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${candidate.type === 'B2C' ? 'bg-blue-100' : 'bg-indigo-100'}`}>
                            {candidate.type === 'B2C' ? (
                              <User className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Briefcase className="h-5 w-5 text-indigo-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.profession}</p>
                            <p className="text-xs text-gray-500">{candidate.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          candidate.type === 'B2C' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {candidate.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Visa Status</p>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getVisaStatusColor(candidate.visaStatus)}`}>
                            {candidate.visaStatus}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Job Interest</p>
                          <p className="text-sm font-medium">{candidate.jobInterest}</p>
                        </div>                        
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Last contact: {candidate.lastContact}
                        </div>                       
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No candidates found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-white/70 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20 gap-4"
          >
            <div className="text-sm text-gray-600 font-medium">
              Showing {(currentPage - 1) * candidatesPerPage + 1} to {Math.min(currentPage * candidatesPerPage, filteredCandidates.length)} of {filteredCandidates.length} candidates
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-primary text-white hover:shadow-lg'
                  }`}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
              >
                Previous
              </motion.button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${currentPage === page
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-primary text-white hover:shadow-lg'
                  }`}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CandidatesPage;