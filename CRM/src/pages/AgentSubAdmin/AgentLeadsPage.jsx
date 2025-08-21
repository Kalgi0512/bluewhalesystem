import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ChevronDown, Edit2, Trash2, MoreVertical, User, Briefcase, Filter, Eye, Phone, Mail } from 'lucide-react';
import LeadsFilters from "../../components/LeadsFilter";
import { useNavigate } from "react-router-dom";
import AddLeadModal from "../../components/AddLeadModal";
import EditLeadModal from "../../components/EditLeadModal";

const AgentLeadsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  const navigate = useNavigate();

  const handleLeadClick = (leadId) => {
    navigate(`/sales-dashboard/leads/${leadId}`);
  };

  const handleEditLead = (lead) => {
    //  edit logic 
    console.log("Editing lead:", lead);
  };

  const handleDeleteLead = (lead) => {
    //  delete logic 
    console.log("Deleting lead:", lead);
  };

  const handleAddLead = (newLead) => {
    // api
    console.log("New lead added:", newLead);
    // For demo
    alert(`New lead for ${newLead.name} has been added successfully!`);
  };

  const handleSaveLead = (updatedLead) => {
    // api
    console.log("Lead updated:", updatedLead);
    // for demo
    alert(`Lead ${updatedLead.name} has been updated successfully!`);
  };

const leads = [
  {
    id: 1,
    name: 'John Smith',
    type: 'Customer',
    profession: 'Software Engineer',
    status: 'Initial Contact',
    assigned: 'Sarah Johnson',
    contact: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    lastContact: '2023-05-15',
    priority: 'High'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    type: 'Customer',
    profession: 'Nurse',
    status: 'Assessment',
    assigned: 'Sarah Johnson',
    contact: 'maria.g@email.com',
    phone: '+1 (555) 456-7890',
    lastContact: '2023-05-10',
    priority: 'High'
  },
  {
    id: 3,
    name: 'Ahmed Khan',
    type: 'Customer',
    profession: 'Construction Manager',
    status: 'Offer Received',
    assigned: 'Mike Chen',
    contact: 'ahmed.k@email.com',
    phone: '+1 (555) 654-3210',
    lastContact: '2023-05-17',
    priority: 'High'
  },
  {
    id: 4,
    name: 'Sophie Martin',
    type: 'Customer',
    profession: 'Chef',
    status: 'Rejected',
    assigned: 'David Wilson',
    contact: 'sophie.m@email.com',
    phone: '+1 (555) 210-9876',
    lastContact: '2023-05-12',
    priority: 'Medium'
  },
  {
    id: 5,
    name: 'Liam Brown',
    type: 'Customer',
    profession: 'Mechanical Engineer',
    status: 'Interview Scheduled',
    assigned: 'Emma Davis',
    contact: 'liam.b@email.com',
    phone: '+1 (555) 765-4321',
    lastContact: '2023-05-14',
    priority: 'High'
  },
  {
    id: 6,
    name: 'Emily Johnson',
    type: 'Customer',
    profession: 'Teacher',
    status: 'Documentation',
    assigned: 'Mike Chen',
    contact: 'emily.j@email.com',
    phone: '+1 (555) 678-1234',
    lastContact: '2023-05-16',
    priority: 'Medium'
  },
  {
    id: 7,
    name: 'Raj Patel',
    type: 'Customer',
    profession: 'Accountant',
    status: 'Visa Processing',
    assigned: 'Sarah Johnson',
    contact: 'raj.p@email.com',
    phone: '+1 (555) 890-4321',
    lastContact: '2023-05-11',
    priority: 'Low'
  },
];


  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || lead.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesAssigned = assignedFilter === 'All' || lead.assigned === assignedFilter;
    return matchesSearch && matchesType && matchesStatus && matchesAssigned;
  });

  // Pagination
  const leadsPerPage = 5;
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Initial Contact': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assessment': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Documentation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Visa Processing': return 'bg-green-100 text-green-800 border-green-200';
      case 'Offer Received': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Interview Scheduled': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const uniqueTypes = ['All', ...new Set(leads.map(lead => lead.type))];
  const uniqueStatuses = ['All', ...new Set(leads.map(lead => lead.status))];
  const uniqueAssigned = ['All', ...new Set(leads.map(lead => lead.assigned))];

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
              Agent Leads
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Manage your agent leads and track progress</p>
          </div>
          
          <motion.button
            onClick={() => setIsAddLeadOpen(true)}
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
            Add Lead
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
              placeholder="Search leads by name, email, or profession..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
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
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
              >
                {uniqueAssigned.map(assigned => <option key={assigned} value={assigned}>{assigned}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Leads List */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Leads ({filteredLeads.length})</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-400px)]">
            <AnimatePresence>
              {paginatedLeads.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {paginatedLeads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() => handleLeadClick(lead.id)}
                      onMouseEnter={() => setHoveredRow(lead.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                          <p className="text-sm text-gray-600">{lead.profession} • {lead.type}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Contact</p>
                          <p className="text-sm font-medium">{lead.contact}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium">{lead.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Assigned To</p>
                          <p className="text-sm font-medium">{lead.assigned}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Contact</p>
                          <p className="text-sm font-medium">{lead.lastContact}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                        <div className={`flex gap-2 transition-opacity duration-200 ${hoveredRow === lead.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentLead(lead);
                              setIsEditModalOpen(true);
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteLead(lead);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No leads found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  </div>
                </motion.div>
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
            <div className="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left">
              Showing {(currentPage - 1) * leadsPerPage + 1} to {Math.min(currentPage * leadsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
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
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
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
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
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
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onSave={handleAddLead}
      />

      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveLead}
        lead={currentLead}
      />
    </motion.div>
  );
};

export default AgentLeadsPage;