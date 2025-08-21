import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, MapPin, User, 
  ChevronDown, Video, Phone, Monitor, Building, 
  CheckCircle, XCircle, AlertCircle, MoreVertical, X,
  Eye
} from 'lucide-react';

const CandidateSubAdminMeetingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Meetings data based on your format
  const meetings = [
    {
      id: 1,
      title: "Interview - John Smith",
      date: "2023-05-20",
      time: "10:00 AM",
      duration: "1h",
      participants: ["John Smith (Candidate)", "Sarah Lee (Recruiter)"],
      type: "Candidate Interview",
      status: "Scheduled",
      location: "Zoom",
      notes: "Initial screening interview for IT role.",
      createdBy: "Sarah Lee"
    },
    {
      id: 2,
      title: "Agent Meeting - Global Recruiters",
      date: "2023-05-21",
      time: "2:00 PM",
      duration: "45m",
      participants: ["Agent: Global Recruiters", "Mark Davis (Admin)"],
      type: "Agent Meeting",
      status: "Scheduled",
      location: "Office HQ",
      notes: "Discuss new candidate submissions and compliance documents.",
      createdBy: "Mark Davis"
    },
    {
      id: 3,
      title: "Visa Process Review - Emily Johnson",
      date: "2023-05-22",
      time: "11:30 AM",
      duration: "30m",
      participants: ["Emily Johnson (Candidate)", "Visa Officer"],
      type: "Candidate Interview",
      status: "Completed",
      location: "Google Meet",
      notes: "Reviewed missing medical documents. Next follow-up in 2 weeks.",
      createdBy: "Admin"
    },
    {
      id: 4,
      title: "Team Sync - Sales & Recruitment",
      date: "2023-05-23",
      time: "9:00 AM",
      duration: "1h",
      participants: ["Sales Team", "Recruitment Team"],
      type: "Internal Meeting",
      status: "Scheduled",
      location: "Conference Room 1",
      notes: "Align sales pipeline with candidate placements for upcoming quarter.",
      createdBy: "Admin"
    },
    {
      id: 5,
      title: "Final Interview - Michael Brown",
      date: "2023-05-24",
      time: "3:30 PM",
      duration: "1h",
      participants: ["Michael Brown (Candidate)", "Hiring Manager"],
      type: "Candidate Interview",
      status: "Scheduled",
      location: "Zoom",
      notes: "Final round interview for healthcare position.",
      createdBy: "Admin"
    }
  ];

  // Filter meetings based on search and filters
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || meeting.status === statusFilter;
    const matchesType = typeFilter === 'All' || meeting.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLocationIcon = (location) => {
    if (location.includes('Zoom') || location.includes('Google Meet') || location.includes('Microsoft Teams')) {
      return <Video size={16} className="text-blue-600" />;
    } else if (location.includes('Phone')) {
      return <Phone size={16} className="text-green-600" />;
    } else {
      return <Building size={16} className="text-purple-600" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Candidate Interview': return <User size={16} className="text-indigo-600" />;
      case 'Agent Meeting': return <Monitor size={16} className="text-orange-600" />;
      case 'Internal Meeting': return <Building size={16} className="text-purple-600" />;
      default: return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
              Meetings
            </motion.h1>
            <p className="text-gray-600 text-sm sm:text-base">View all scheduled meetings and interviews</p>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {meetings.filter(m => m.status === 'Scheduled').length} Scheduled
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {meetings.filter(m => m.status === 'Completed').length} Completed
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
                placeholder="Search meetings, participants, or notes..."
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
                  options: ['All', 'Scheduled', 'Completed', 'Canceled'] 
                },
                { 
                  label: 'Type', 
                  value: typeFilter, 
                  setter: setTypeFilter, 
                  options: ['All', 'Candidate Interview', 'Agent Meeting', 'Internal Meeting'] 
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

        {/* Meetings List */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" />
              All Meetings
            </h3>
            <div className="text-sm text-gray-500">
              {filteredMeetings.length} meetings found
            </div>
          </div>

          {/* Desktop Table View (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title & Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Participants</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting) => (
                    <motion.tr
                      key={meeting.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-all duration-100"
                    >
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-gray-900">
                            {meeting.title}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            {getTypeIcon(meeting.type)}
                            {meeting.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(meeting.date)}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} />
                            {meeting.time} • {meeting.duration}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          {getLocationIcon(meeting.location)}
                          {meeting.location}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-xs text-gray-600 max-w-xs">
                          {meeting.participants.slice(0, 2).join(', ')}
                          {meeting.participants.length > 2 && (
                            <span className="text-blue-600"> +{meeting.participants.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <motion.button
                        whileHover={{ scale: 1.1, rotate: 15 }}
                          onClick={() => setSelectedMeeting(meeting)}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-colors cursor-pointer"
                        >
                          <Eye size={16} className="text-blue-600 hover:text-blue-800" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search size={24} className="text-gray-400" />
                        </div>
                        <div className="text-gray-500">
                          <p className="text-lg font-medium">No meetings found</p>
                          <p className="text-sm">Try adjusting your search criteria</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (visible on mobile only) */}
          <div className="md:hidden p-4 space-y-4">
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          {getTypeIcon(meeting.type)}
                          <span className="ml-1">{meeting.type}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-700">{formatDate(meeting.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-700">{meeting.time} • {meeting.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      {getLocationIcon(meeting.location)}
                      <span className="ml-2 text-gray-700">{meeting.location}</span>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex items-start">
                        <User size={16} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-gray-700">
                            {meeting.participants.slice(0, 2).join(', ')}
                            {meeting.participants.length > 2 && (
                              <span className="text-blue-600"> +{meeting.participants.length - 2} more</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMeeting(meeting)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-500 mb-1">No meetings found</p>
                <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Meeting Detail Modal */}
      <AnimatePresence>
        {selectedMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center p-4 z-50"
            onClick={() => setSelectedMeeting(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: -100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mt-8 md:mt-20 h-max"
              onClick={(e) => e.stopPropagation()}
              ref={(el) => el && el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <motion.div 
                className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl"
                layoutId={`header-${selectedMeeting.id}`}
              >
                <h3 className="text-xl font-semibold text-gray-900">Meeting Details</h3>
                <motion.button
                  onClick={() => setSelectedMeeting(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/50 transition-colors"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </motion.div>

              <motion.div 
                className="p-6 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { label: 'Meeting Title', value: selectedMeeting.title, icon: null },
                      { label: 'Type', value: selectedMeeting.type, icon: getTypeIcon(selectedMeeting.type) },
                      { label: 'Date & Time', value: null, special: 'datetime' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4 className="text-sm font-medium text-gray-500 mb-1">{item.label}</h4>
                        {item.special === 'datetime' ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-800">
                              <Calendar size={18} />
                              <span>{formatDate(selectedMeeting.date)}</span>
                            </div>
                            <div className="flex items-center text-sm gap-2 text-gray-800">
                              <Clock size={18} />
                              <span>{selectedMeeting.time} • {selectedMeeting.duration}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-900">
                            {item.icon}
                            <span className={item.label === 'Meeting Title' ? 'text-md font-semibold' : ''}>{item.value}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Location', value: selectedMeeting.location, icon: getLocationIcon(selectedMeeting.location) },
                      { label: 'Status', value: null, special: 'status' },
                      { label: 'Created By', value: selectedMeeting.createdBy, icon: null }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4 className="text-sm font-medium text-gray-500 mb-1">{item.label}</h4>
                        {item.special === 'status' ? (
                          <motion.span 
                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedMeeting.status)}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {selectedMeeting.status}
                          </motion.span>
                        ) : (
                          <div className="flex items-center text-sm gap-2 text-gray-900">
                            {item.icon}
                            <span>{item.value}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 text-sm rounded-lg">{selectedMeeting.notes}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Participants</h4>
                  <div className="space-y-2">
                    {selectedMeeting.participants.map((participant, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: '#e5e7eb' }}
                      >
                        <motion.div 
                          className="p-2 rounded-xl bg-gray-100"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <User className="h-4 w-4 text-gray-600" />
                        </motion.div>
                        <p className="text-sm text-gray-900">{participant}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="p-6 border-t rounded-b-2xl border-gray-100 bg-gray-50 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => setSelectedMeeting(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CandidateSubAdminMeetingsPage;