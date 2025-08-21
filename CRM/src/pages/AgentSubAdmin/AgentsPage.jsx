import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, User, Briefcase, Mail, Phone, MapPin, 
  Calendar, ChevronDown, Eye, Edit2, Trash2, Download, Upload 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [agentType, setAgentType] = useState('All'); 
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobInterestFilter, setJobInterestFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

const navigate = useNavigate();

const handleRowClick = (agentId) => {
  navigate(`/sales-dashboard/agents/${agentId}`);
};

const agents = [
  {
    id: 1,
    name: 'John Smith',
    type: 'B2C',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Toronto, Canada',
    profession: 'Placement Agent',
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
    profession: 'Healthcare Agent',
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
    profession: 'Registered Agent',
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
    profession: 'Construction Agent',
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
    profession: 'Hospitality Agent',
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
    profession: 'Finance Agent',
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

  // Filter agents based on search and filters
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = agentType === 'All' || agent.type === agentType;
    const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
    const matchesJobInterest = jobInterestFilter === 'All' || agent.jobInterest === jobInterestFilter;
    const matchesAssigned = assignedFilter === 'All' || agent.assigned === assignedFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesJobInterest && matchesAssigned;
  });

  // Pagination
  const agentsPerPage = 5;
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * agentsPerPage,
    currentPage * agentsPerPage
  );

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

  const uniqueTypes = ['All', ...new Set(agents.map(agent => agent.type))];
  const uniqueStatuses = ['All', ...new Set(agents.map(agent => agent.status))];
  const uniqueJobInterests = ['All', ...new Set(agents.map(agent => agent.jobInterest))];
  const uniqueAssigned = ['All', ...new Set(agents.map(agent => agent.assigned))];

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
              Agents
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Manage your agents and track their progress</p>
          </div>
          
          <motion.button
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
            Add Agent
          </motion.button>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents by name, email, or profession..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-sm sm:text-base shadow-sm"
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
              >
                {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-sm sm:text-base shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {uniqueStatuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-sm sm:text-base shadow-sm"
                value={jobInterestFilter}
                onChange={(e) => setJobInterestFilter(e.target.value)}
              >
                {uniqueJobInterests.map(interest => <option key={interest} value={interest}>{interest}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-sm sm:text-base shadow-sm"
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
              >
                {uniqueAssigned.map(assigned => <option key={assigned} value={assigned}>{assigned}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Agents List */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Agents ({filteredAgents.length})</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-400px)]">
            <AnimatePresence>
              {paginatedAgents.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {paginatedAgents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() => handleRowClick(agent.id)}
                      onMouseEnter={() => setHoveredRow(agent.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.profession} • {agent.type}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getVisaStatusColor(agent.visaStatus)}`}>
                          {agent.visaStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium">{agent.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium">{agent.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-medium">{agent.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span className={`text-xs font-semibold rounded-full border ${getStatusColor(agent.status)}`}>
                            {agent.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Job Interest</p>
                          <p className="text-sm font-medium">{agent.jobInterest}</p>
                        </div>                        
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Last contact: {agent.lastContact}
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
                      <p className="text-lg font-medium">No agents found</p>
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
              Showing {(currentPage - 1) * agentsPerPage + 1} to {Math.min(currentPage * agentsPerPage, filteredAgents.length)} of {filteredAgents.length} agents
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

export default AgentsPage;