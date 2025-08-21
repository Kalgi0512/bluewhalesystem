import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Filter, User, Briefcase, Mail, Phone, MapPin,
  Calendar, ChevronDown, Eye, Edit2, Trash2, Download, Upload,
  Building, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const JobApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  const handleAgentClick = (agentId) => {
    navigate(`/sales-dashboard/agents/${agentId}`);
  };
  const handleStatusChange = (applicationId, newStatus) => {
    setJobs(prevJobs => {
      return prevJobs.map(job => {

        const updatedAgents = job.agents.map(agent => {
          if (agent.id === applicationId) {
            return { ...agent, status: newStatus };
          }
          return agent;
        });

        return { ...job, agents: updatedAgents };
      });
    });

    if (selectedJob) {
      const updatedSelectedAgents = selectedJob.agents.map(agent => {
        if (agent.id === applicationId) {
          return { ...agent, status: newStatus };
        }
        return agent;
      });

      setSelectedJob({
        ...selectedJob,
        agents: updatedSelectedAgents
      });
    }

    console.log(`Changed application ${applicationId} status to ${newStatus}`);
  };

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'Toronto, Canada',
      type: 'Full-time',
      postedDate: '2023-05-10',
      applications: 15,
      status: 'Active',
      agents: [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          location: 'Toronto, Canada',
          appliedDate: '2023-05-15',
          status: 'New Application',
          resume: 'Submitted',
          notes: 'Strong technical background with 8 years of experience'
        },
        {
          id: 102,
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 (555) 987-6543',
          location: 'Vancouver, Canada',
          appliedDate: '2023-05-16',
          status: 'Reviewing',
          resume: 'Submitted',
          notes: 'Previous experience at Google'
        }
      ]
    },
    {
      id: 2,
      title: 'Registered Nurse',
      company: 'City General Hospital',
      location: 'New York, USA',
      type: 'Full-time',
      postedDate: '2023-05-12',
      applications: 8,
      status: 'Active',
      agents: [
        {
          id: 201,
          name: 'Emily Carter',
          email: 'emily.carter@email.com',
          phone: '+1 (555) 456-7890',
          location: 'New York, USA',
          appliedDate: '2023-05-18',
          status: 'Interview Scheduled',
          resume: 'Submitted',
          notes: 'Excellent references from previous hospital'
        }
      ]
    },
    {
      id: 3,
      title: 'Construction Project Manager',
      company: 'BuildRight Construction',
      location: 'Dubai, UAE',
      type: 'Contract',
      postedDate: '2023-05-05',
      applications: 5,
      status: 'Active',
      agents: [
        {
          id: 301,
          name: 'Ahmed Khan',
          email: 'ahmed.k@email.com',
          phone: '+1 (555) 654-3210',
          location: 'Dubai, UAE',
          appliedDate: '2023-05-17',
          status: 'Offer Extended',
          resume: 'Submitted',
          notes: '10+ years in construction management'
        }
      ]
    },
    {
      id: 4,
      title: 'Executive Chef',
      company: 'Luxury Hotels International',
      location: 'Paris, France',
      type: 'Full-time',
      postedDate: '2023-04-28',
      applications: 12,
      status: 'Closed',
      agents: [
        {
          id: 401,
          name: 'Sophie Martin',
          email: 'sophie.m@email.com',
          phone: '+1 (555) 210-9876',
          location: 'Paris, France',
          appliedDate: '2023-05-12',
          status: 'Rejected',
          resume: 'Submitted',
          notes: 'Not enough experience in luxury hospitality'
        }
      ]
    },
    {
      id: 5,
      title: 'Senior Accountant',
      company: 'Financial Solutions Ltd.',
      location: 'London, UK',
      type: 'Full-time',
      postedDate: '2023-05-08',
      applications: 7,
      status: 'Active',
      agents: [
        {
          id: 501,
          name: 'Liam Walker',
          email: 'liam.w@email.com',
          phone: '+1 (555) 321-4321',
          location: 'London, UK',
          appliedDate: '2023-05-05',
          status: 'Completed',
          resume: 'Submitted',
          notes: 'Certified accountant with international experience'
        }
      ]
    }
  ]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesJob = jobFilter === 'All' || job.title.includes(jobFilter);
    const matchesLocation = locationFilter === 'All' || job.location.includes(locationFilter);
    return matchesSearch && matchesStatus && matchesJob && matchesLocation;
  });

  const jobsPerPage = 5;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const displayData = selectedJob ? selectedJob.agents : paginatedJobs;

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

  const getJobStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'New Application': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Interview Scheduled': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Offer Extended': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const uniqueStatuses = ['All', ...new Set(jobs.map(job => job.status))];
  const uniqueJobs = ['All', ...new Set(jobs.map(job => job.title))];
  const uniqueLocations = ['All', ...new Set(jobs.map(job => job.location))];

  const statusOptionsForCandidate = [
    'New Application',
    'Reviewing',
    'Interview Scheduled',
    'Offer Extended',
    'Rejected'
  ];

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
              Job Applications
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Manage and track job applications</p>
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
            Add Application
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
              placeholder="Search applications by title or company..."
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
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              >
                {uniqueJobs.map(job => <option key={job} value={job}>{job}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-sm sm:text-base shadow-sm"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {uniqueLocations.map(location => <option key={location} value={location}>{location}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Applications List */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">{selectedJob ? `Agents for ${selectedJob.title}` : 'Jobs'} ({displayData.length})</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-400px)]">
            <AnimatePresence>
              {displayData.length > 0 ? (
                <>
                  {displayData.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() => selectedJob ? handleAgentClick(item.id) : setSelectedJob(item)}
                      onMouseEnter={() => setHoveredRow(item.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedJob ? item.name : item.title}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedJob ? item.location : `${item.company} • ${item.location}`}
                          </p>
                        </div>
                        {!selectedJob && (
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getJobStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {!selectedJob ? (
                          <>
                            <div>
                              <p className="text-xs text-gray-500">Type</p>
                              <p className="text-sm font-medium">{item.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Posted Date</p>
                              <p className="text-sm font-medium">{item.postedDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Applications</p>
                              <p className="text-sm font-medium">{item.applications}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-sm font-medium">{item.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="text-sm font-medium">{item.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Location</p>
                              <p className="text-sm font-medium">{item.location}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Applied Date</p>
                              <p className="text-sm font-medium">{item.appliedDate}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        {selectedJob && (
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getApplicationStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        )}
                        <div className={`flex gap-2 transition-opacity duration-200 ${hoveredRow === item.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                            <Download size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No {selectedJob ? 'agents' : 'jobs'} found</p>
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
              Showing {(currentPage - 1) * jobsPerPage + 1} to {Math.min(currentPage * jobsPerPage, displayData.length)} of {displayData.length} {selectedJob ? 'agents' : 'jobs'}
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

export default JobApplicationsPage;