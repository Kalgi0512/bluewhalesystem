import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, MapPin, User, 
  ChevronDown, Video, Phone, Monitor, Building, 
  CheckCircle, XCircle, AlertCircle, MoreVertical, X,
  Eye, Plus
} from 'lucide-react';

const AgentSubAdminMeetingsPage = () => {
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
      participants: ["John Smith (Agent)", "Sarah Lee (Recruiter)"],
      type: "Agent Interview",
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
      notes: "Discuss new agent submissions and compliance documents.",
      createdBy: "Mark Davis"
    },
    {
      id: 3,
      title: "Visa Process Review - Emily Johnson",
      date: "2023-05-22",
      time: "11:30 AM",
      duration: "30m",
      participants: ["Emily Johnson (Agent)", "Visa Officer"],
      type: "Agent Interview",
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
      notes: "Align sales pipeline with agent placements for upcoming quarter.",
      createdBy: "Admin"
    },
    {
      id: 5,
      title: "Final Interview - Michael Brown",
      date: "2023-05-24",
      time: "3:30 PM",
      duration: "1h",
      participants: ["Michael Brown (Agent)", "Hiring Manager"],
      type: "Agent Interview",
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
      case 'Agent Interview': return <User size={16} className="text-indigo-600" />;
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

  const uniqueStatuses = ['All', ...new Set(meetings.map(m => m.status))];
  const uniqueTypes = ['All', ...new Set(meetings.map(m => m.type))];

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
              Agent Meetings
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Manage and track your agent meetings</p>
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
            Schedule Meeting
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
              placeholder="Search meetings by title or participant..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Meetings List */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Meetings ({filteredMeetings.length})</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-400px)]">
            {filteredMeetings.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredMeetings.map((meeting) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                        <p className="text-sm text-gray-600">{formatDate(meeting.date)} • {meeting.time}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        {getTypeIcon(meeting.type)}
                        <span className="text-sm">{meeting.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {getLocationIcon(meeting.location)}
                        <span className="text-sm">{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm">{meeting.duration}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Created by: {meeting.createdBy}
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
                    <p className="text-lg font-medium">No meetings found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Meeting Details Modal */}
      <AnimatePresence>
        {selectedMeeting && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">{selectedMeeting.title}</h3>
                <button onClick={() => setSelectedMeeting(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              
              <motion.div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { label: 'Date', value: formatDate(selectedMeeting.date), icon: Calendar },
                      { label: 'Time', value: selectedMeeting.time, icon: Clock },
                      { label: 'Duration', value: selectedMeeting.duration, icon: Clock },
                      { label: 'Type', value: selectedMeeting.type, icon: getTypeIcon(selectedMeeting.type) }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h4 className="text-sm font-medium text-gray-500 mb-1">{item.label}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          {item.icon}
                          <span className="text-gray-900">{item.value}</span>
                        </div>
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

export default AgentSubAdminMeetingsPage;