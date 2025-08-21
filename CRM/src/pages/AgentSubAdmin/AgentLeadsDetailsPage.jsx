import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, User, Briefcase, Mail, Phone, Calendar, MapPin, Clock, Edit2, Plus, MessageSquare, UserPlus, CheckCircle, FileText, Send, PhoneCall } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";

const AgentLeadsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'Initial contact made via email. Interested in exploring visa options for software engineering roles.',
      author: 'Sarah Johnson',
      date: '2023-05-15',
      time: '10:30 AM'
    },
    {
      id: 2,
      content: 'Follow-up call scheduled for next week to discuss specific requirements and documentation needed.',
      author: 'Sarah Johnson',
      date: '2023-05-16',
      time: '2:15 PM'
    }
  ]);
  const [newNote, setNewNote] = useState('');

  const lead = {
    id: 1,
    name: 'John Smith',
    type: 'Customer',
    profession: 'Software Engineer',
    status: 'Initial Contact',
    assigned: 'Sarah Johnson',
    contact: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    lastContact: '2023-05-15',
    priority: 'High',
    location: 'San Francisco, CA',
    source: 'Website Inquiry',
    created: '2023-05-01'
  };

  const handleBack = () => {
    navigate('/sales-dashboard/leads');
  };

  const handleEdit = () => {
    console.log('Edit lead');
  };

  const handleConvertToClient = () => {
    console.log("Converting lead to client:", lead);
  };

  const handleAddNote = () => {
    if (newNote.trim() === '') return;

    const note = {
      id: notes.length + 1,
      content: newNote,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNotes([note, ...notes]);
    setNewNote('');
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
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const timelineEvents = [
    {
      id: 1,
      type: 'creation',
      date: lead.created,
      title: 'Lead Created',
      description: 'Lead was added to the system via website inquiry',
      icon: <UserPlus size={16} className="text-blue-500" />
    },
    {
      id: 2,
      type: 'contact',
      date: '2023-05-05',
      title: 'Initial Contact',
      description: 'Sent introductory email with service information and consultation options',
      icon: <Mail size={16} className="text-green-500" />
    },
    {
      id: 3,
      type: 'call',
      date: lead.lastContact,
      title: 'Follow-up Call',
      description: 'Discussed requirements, visa options, and outlined next steps for documentation',
      icon: <Phone size={16} className="text-purple-500" />
    }
  ];

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
    <div
      className="md:p-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 text-center md:text-left">
          <div className="space-y-2">
            <motion.h1 className="text-heading-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              Agent Lead Details
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">View and manage agent lead information</p>
          </div>
          
          <motion.button
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit2 size={16} className="sm:w-5 sm:h-5" />
            Edit Lead
          </motion.button>
        </motion.div>

        {/* Lead Header */}
        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-12 h-12 text-indigo-600" />
              </div>
              <motion.span 
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)}`}
                whileHover={{ scale: 1.05 }}
              >
                {lead.status}
              </motion.span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
              <p className="text-gray-600 mt-1">{lead.profession} • {lead.type}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <span className="text-sm">{lead.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} />
                  <span className="text-sm">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">{lead.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span className="text-sm">Last Contact: {lead.lastContact}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Message
              </motion.button>
              <motion.button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Call
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-indigo-600" />
                Timeline
              </h3>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="relative pl-8 pb-4 last:pb-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center">
                      {event.icon}
                    </div>
                    <div className="absolute left-3 top-6 h-full w-0.5 bg-indigo-100 -z-10 last:hidden" />
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-green-600" />
                Notes
              </h3>
              <div className="space-y-4 mb-6">
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    className="p-4 bg-gray-50 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-gray-600">{note.content}</p>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{note.author}</span>
                      <span>{note.date} • {note.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new note..."
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions & Lead Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Quick Actions
              </h3>
              <div className="space-y-4">
                {[
                  { icon: PhoneCall, label: 'Schedule Call', color: 'from-blue-600 to-cyan-600', hoverColor: 'hover:from-blue-600 hover:to-cyan-600' },
                  { icon: Send, label: 'Send Email', color: 'from-green-600 to-emerald-600', hoverColor: 'hover:from-green-600 hover:to-emerald-600' },
                  { icon: FileText, label: 'Generate Report', color: 'from-purple-600 to-indigo-600', hoverColor: 'hover:from-purple-600 hover:to-indigo-600' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full group relative overflow-hidden flex items-center gap-4 px-6 py-4 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${action.color} ${action.hoverColor}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    <action.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Lead Details */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-gray-600" />
                Lead Information
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Assigned To', value: lead.assigned, icon: User },
                  { label: 'Created On', value: lead.created, icon: Calendar },
                  { label: 'Last Contact', value: lead.lastContact, icon: Clock },
                  { label: 'Lead Type', value: lead.type, icon: FileText }
                ].map((detail, index) => (
                  <motion.div
                    key={detail.label}
                    className="p-4 bg-gradient-to-r from-white/60 to-gray-50/60 rounded-xl border border-white/30 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <detail.icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-dark font-medium">{detail.label}</p>
                        <p className="text-gray-700 font-bold">{detail.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AgentLeadsDetailsPage;