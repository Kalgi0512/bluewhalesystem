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

  const handleCandidateClick = (candidateId) => {
    navigate(`/sales-dashboard/candidates/${candidateId}`);
  };
  const handleStatusChange = (applicationId, newStatus) => {
    setJobs(prevJobs => {
      return prevJobs.map(job => {

        const updatedCandidates = job.candidates.map(candidate => {
          if (candidate.id === applicationId) {
            return { ...candidate, status: newStatus };
          }
          return candidate;
        });

        return { ...job, candidates: updatedCandidates };
      });
    });

    if (selectedJob) {
      const updatedSelectedCandidates = selectedJob.candidates.map(candidate => {
        if (candidate.id === applicationId) {
          return { ...candidate, status: newStatus };
        }
        return candidate;
      });

      setSelectedJob({
        ...selectedJob,
        candidates: updatedSelectedCandidates
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
      candidates: [
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
      candidates: [
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
      candidates: [
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
      candidates: [
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
      postedDate: '2023-05-15',
      applications: 7,
      status: 'Active',
      candidates: [
        {
          id: 501,
          name: 'Liam Walker',
          email: 'liam.w@email.com',
          phone: '+1 (555) 321-4321',
          location: 'London, UK',
          appliedDate: '2023-05-20',
          status: 'New Application',
          resume: 'Submitted',
          notes: 'CPA certified with Big 4 experience'
        }
      ]
    }
  ]);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesJob = jobFilter === 'All' || job.title === jobFilter;
    const matchesLocation = locationFilter === 'All' || job.location === locationFilter;

    return matchesSearch && matchesStatus && matchesJob && matchesLocation;
  });

  // If a job is selected, show its candidates
  const displayData = selectedJob
    ? [{ ...selectedJob, isExpanded: true }]
    : filteredJobs;

  // Pagination
  const jobsPerPage = 5;
  const totalPages = Math.ceil(displayData.length / jobsPerPage);
  const paginatedJobs = displayData.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Get unique values for filters
  const statusOptions = ['All', 'Active', 'Closed'];
  const jobOptions = ['All', ...new Set(jobs.map(j => j.title))];
  const locationOptions = ['All', ...new Set(jobs.map(j => j.location))];

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
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'New Application': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Reviewing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Interview Scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Offer Extended': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Hired': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusOptionsForCandidate = [
    'New Application', 'Reviewing', 'Interview Scheduled',
    'Offer Extended', 'Hired', 'Rejected'
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
            <p className="text-gray-600 text-sm sm:text-base">Track jobs and manage candidate applications</p>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {jobs.filter(j => j.status === 'Active').length} Active Jobs
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {jobs.reduce((acc, job) => acc + job.applications, 0)} Total Applications
              </span>
            </div>
          </div>

          {/* <motion.button
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} className="sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
            <span className="hidden sm:inline">Post New Job</span>
            <span className="sm:hidden">New Job</span>
          </motion.button> */}
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
                placeholder="Search by job title, or location..."
                className="pl-10 sm:pl-12 w-full p-3 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 focus:outline-none bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-md text-xs sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              {[
                {
                  label: 'Status',
                  value: statusFilter,
                  setter: setStatusFilter,
                  options: statusOptions
                },
                {
                  label: 'Job',
                  value: jobFilter,
                  setter: setJobFilter,
                  options: jobOptions
                },
                {
                  label: 'Location',
                  value: locationFilter,
                  setter: setLocationFilter,
                  options: locationOptions
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

        {/* Jobs Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between">
            <h3 className="text-md sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Filter size={18} className="text-blue-600" />
              {selectedJob ? 'Applications for ' + selectedJob.title : 'Job Overview'}
            </h3>
            {selectedJob && (
              <motion.button
                onClick={() => setSelectedJob(null)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mt-2 sm:mt-0"
                whileHover={{ x: -5 }}
              >
                <ChevronRight size={16} className="rotate-180" />
                Back to all jobs
              </motion.button>
            )}
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              {displayData.length} {selectedJob ? 'candidates' : 'jobs'} found
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {selectedJob ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Candidate Information</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Information</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Posted Date</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                      <>
                        {/* Job Row */}
                        {!selectedJob && (
                          <motion.tr
                            key={job.id}
                            variants={tableRowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="group hover:bg-gray-50 transition-all duration-100 cursor-pointer"
                            onMouseEnter={() => setHoveredRow(job.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                            onClick={() => setSelectedJob(job)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <motion.div
                                  whileHover={{ rotate: 360, scale: 1.1 }}
                                  transition={{ duration: 0.6 }}
                                  className="p-2 rounded-xl bg-blue-100">
                                  <Briefcase className="h-5 w-5 text-blue-600" />
                                </motion.div>
                                <div className="space-y-1">
                                  <div className="text-sm font-semibold text-gray-900">
                                    {job.title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {job.applications} applicants
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{job.location}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{job.type}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                {job.applications} applications
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(job.status)}`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{job.postedDate}</td>
                          </motion.tr>
                        )}

                        {/* Candidate Rows for Selected Job */}
                        {selectedJob && job.candidates.map((candidate) => (
                          <motion.tr
                            key={candidate.id}
                            variants={tableRowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="group hover:bg-gray-50 transition-all duration-100"
                            onMouseEnter={() => setHoveredRow(candidate.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <td className="px-6 py-4 cursor-pointer">
                              <div className="flex items-center space-x-3">
                                <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                                className="p-2 rounded-xl bg-indigo-100">
                                  <User className="h-5 w-5 text-indigo-600" />
                                </motion.div>
                                <div className="space-y-1">
                                  <div className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-[var(--color-secondary)]" onClick={() => handleCandidateClick(candidate.id)}>
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
                            <td className="px-6 py-4 text-sm text-gray-500">{candidate.appliedDate}</td>
                            <td className="px-6 py-4">
                              <select
                                value={candidate.status}
                                onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                                className={`px-3 py-1 text-xs font-semibold rounded-full border ${getApplicationStatusColor(candidate.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              >
                                {statusOptionsForCandidate.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                  <Eye size={16} />
                                </button>
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                  <Download size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={selectedJob ? 4 : 7} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Search size={24} className="text-gray-400" />
                          </div>
                          <div className="text-gray-500">
                            <p className="text-lg font-medium">No {selectedJob ? 'candidates' : 'jobs'} found</p>
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
              {paginatedJobs.length > 0 ? (
                <div className="divide-y divide-gray-400/60">
                  {paginatedJobs.map((job) => (
                    <>
                      {/* Job Card */}
                      {!selectedJob && (
                        <motion.div
                          key={job.id}
                          className="p-6 space-y-5"
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onClick={() => setSelectedJob(job)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-blue-100">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                <p className="text-sm text-gray-600">{job.company}</p>
                                <p className="text-xs text-gray-500">{job.location}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="justify-self-center">
                              <p className="text-xs text-gray-500">Type</p>
                              <p className="text-sm font-medium">{job.type}</p>
                            </div>
                            <div className="justify-self-center">
                              <p className="text-xs text-gray-500">Applications</p>
                              <p className="text-sm font-medium">{job.applications}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <div className="text-xs text-gray-500">
                              Posted: {job.postedDate}
                            </div>
                            <div className="text-xs text-blue-600 flex items-center">
                              View applications <ChevronRight size={14} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Candidate Cards for Selected Job */}
                      {selectedJob && job.candidates.map((candidate) => (
                        <motion.div
                          key={candidate.id}
                          className="p-6 space-y-6"
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-indigo-100">
                                <User className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                                <p className="text-sm text-gray-600">{candidate.email}</p>
                                <p className="text-xs text-gray-500">{candidate.phone}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getApplicationStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="justify-self-center">
                              <p className="text-xs text-gray-500">Location</p>
                              <p className="text-sm font-medium">{candidate.location}</p>
                            </div>
                            <div className="justify-self-center">
                              <p className="text-xs text-gray-500">Applied</p>
                              <p className="text-sm font-medium">{candidate.appliedDate}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <select
                              value={candidate.status}
                              onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                              className={`flex-1 px-3 py-1 text-xs font-semibold rounded-full border ${getApplicationStatusColor(candidate.status)} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            >
                              {statusOptionsForCandidate.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                              <Download size={16} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No {selectedJob ? 'candidates' : 'jobs'} found</p>
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
              Showing {(currentPage - 1) * jobsPerPage + 1} to {Math.min(currentPage * jobsPerPage, displayData.length)} of {displayData.length} {selectedJob ? 'candidates' : 'jobs'}
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