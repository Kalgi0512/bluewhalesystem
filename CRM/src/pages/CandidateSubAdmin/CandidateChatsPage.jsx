import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MessageSquare, User, Mail, Phone, MapPin, 
  ChevronDown, Paperclip, Send, MoreVertical, Clock,
  Video, PhoneCall, Info, X, ChevronLeft
} from 'lucide-react';

const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  // Sample candidate data with chat history
  const [candidates, setCandidates] = useState([
    {
      id: 101,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'Toronto, Canada',
      position: 'Senior Software Engineer',
      status: 'New Application',
      lastMessage: 'Looking forward to the interview process!',
      lastMessageTime: '2 hours ago',
      unread: 3,
      messages: [
        {
          id: 1,
          text: 'Hello, I wanted to follow up on my application for the Senior Software Engineer position.',
          time: '10:30 AM',
          sender: 'candidate',
        },
        {
          id: 2,
          text: 'Thanks for reaching out! We\'ve reviewed your application and would like to schedule an interview.',
          time: '10:45 AM',
          sender: 'staff',
        },
        {
          id: 3,
          text: 'That\'s great news! I\'m available most days next week.',
          time: '11:15 AM',
          sender: 'candidate',
        },
        {
          id: 4,
          text: 'How about Tuesday at 2 PM? We\'ll have a technical interview with our lead developer.',
          time: '11:30 AM',
          sender: 'staff',
        },
        {
          id: 5,
          text: 'Tuesday at 2 PM works perfectly for me. Looking forward to it!',
          time: '12:00 PM',
          sender: 'candidate',
        },
      ]
    },
    {
      id: 102,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      location: 'Vancouver, Canada',
      position: 'UX Designer',
      status: 'Reviewing',
      lastMessage: 'I\'ve sent my portfolio as requested.',
      lastMessageTime: '1 day ago',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Hi Sarah, we\'re impressed with your background and would love to see your portfolio.',
          time: 'Yesterday',
          sender: 'staff',
        },
        {
          id: 2,
          text: 'Sure! I\'ll send over a link to my portfolio website. It includes case studies from my time at Google.',
          time: 'Yesterday',
          sender: 'candidate',
        },
      ]
    },
    {
      id: 201,
      name: 'Emily Carter',
      email: 'emily.carter@email.com',
      phone: '+1 (555) 456-7890',
      location: 'New York, USA',
      position: 'Registered Nurse',
      status: 'Interview Scheduled',
      lastMessage: 'Confirming the interview location.',
      lastMessageTime: '3 days ago',
      unread: 1,
      messages: [
        {
          id: 1,
          text: 'Hello Emily, we\'d like to schedule an interview for the Registered Nurse position.',
          time: '3 days ago',
          sender: 'staff',
        },
        {
          id: 2,
          text: 'Thank you! I\'m available on Thursday or Friday this week.',
          time: '3 days ago',
          sender: 'candidate',
        },
      ]
    },
    {
      id: 301,
      name: 'Ahmed Khan',
      email: 'ahmed.k@email.com',
      phone: '+1 (555) 654-3210',
      location: 'Dubai, UAE',
      position: 'Construction Project Manager',
      status: 'Offer Extended',
      lastMessage: 'Thank you for the offer!',
      lastMessageTime: '1 week ago',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Congratulations! We\'re pleased to extend an offer for the Construction Project Manager role.',
          time: '1 week ago',
          sender: 'staff',
        },
        {
          id: 2,
          text: 'Thank you so much! I\'m thrilled to accept this opportunity.',
          time: '1 week ago',
          sender: 'candidate',
        },
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [selectedCandidate?.messages]);

  // Filter candidates based on search
  const filteredCandidates = candidates.filter(candidate => {
    return candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
           candidate.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

const handleSendMessage = () => {
  if (messageInput.trim() === '') return;
  
  const newMessage = {
    id: Date.now(),
    text: messageInput,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sender: 'staff'
  };

  // Update the candidates array
  setCandidates(prev => 
    prev.map(candidate => 
      candidate.id === selectedCandidate.id
        ? { 
            ...candidate, 
            messages: [...candidate.messages, newMessage],
            lastMessage: newMessage.text,
            lastMessageTime: 'Just now',
            unread: 0 
          }
        : candidate
    )
  );

  setSelectedCandidate(prev => ({
    ...prev,
    messages: [...prev.messages, newMessage],
    lastMessage: newMessage.text,
    lastMessageTime: 'Just now',
    unread: 0
  }));

  setMessageInput('');
};
  const getStatusColor = (status) => {
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
              Candidate Chats
            </motion.h1>
            <p className="text-gray-600 text-sm sm:text-base">Communicate with job applicants</p>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {candidates.filter(c => c.unread > 0).length} Unread Conversations
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {candidates.length} Total Candidates
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
            <div className="relative flex-1 max-w-full">
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
                placeholder="Search by candidate name, position, or location..."
                className="pl-10 sm:pl-12 w-full p-3 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 focus:outline-none bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-md text-xs sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Candidate List */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden lg:w-2/5"
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MessageSquare size={18} className="text-[var(--color-secondary)]" />
                Conversations
              </h3>
            </div>

            <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map(candidate => (
                  <motion.div
                    key={candidate.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all duration-200 ${
                      selectedCandidate?.id === candidate.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setChatOpen(true);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-indigo-100">
                          <User className="h-5 w-5 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                          <p className="text-sm text-gray-600">{candidate.position}</p>
                          <p className="text-xs text-gray-500">{candidate.location}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-700 truncate">{candidate.lastMessage}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-gray-500">
                          {candidate.lastMessageTime}
                        </div>
                        {candidate.unread > 0 && (
                          <span className="bg-[var(--color-secondary)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {candidate.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
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
            </div>
          </motion.div>

          {/* Chat Panel */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden lg:w-3/5"
          >
            {selectedCandidate ? (
              <>
                <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button 
                      className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                      onClick={() => setSelectedCandidate(null)}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="p-2 rounded-xl bg-indigo-100">
                      <User className="h-5 w-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedCandidate.name}</h3>
                      <p className="text-sm text-gray-600">{selectedCandidate.position} • {selectedCandidate.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.status)}`}>
                      {selectedCandidate.status}
                    </span>
                    <div className="flex gap-1"> 
                      <button className="p-2 text-[var(--color-primary)] hover:bg-blue-50 rounded-lg">
                        <Info size={18} />
                      </button>
                    </div>
                  </div>                  
                </div>

                <div className="p-4 h-[calc(100vh-300px)] overflow-y-auto bg-gray-50/50">
                  <div className="space-y-4">
                    {selectedCandidate.messages.map(message => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-2xl p-4 ${
                            message.sender === 'staff'
                              ? 'bg-[var(--color-secondary)] text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'staff' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                      <Paperclip size={20} />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        placeholder="Type your message..."
                        className="w-full p-3 pr-10 border border-gray-200 text-xs rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 focus:outline-none bg-white/90 resize-none transition-all duration-300 hover:shadow-md sm:text-sm"
                        rows="1"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}                        
                      />
                    </div>
                    <button
                      className="p-3 bg-[var(--color-secondary)] text-white rounded-xl hover:bg-[var(--color-primary)] cursor-pointer transition-colors duration-200"
                      onClick={handleSendMessage}
                      disabled={messageInput.trim() === ''}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare size={36} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a conversation</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a candidate from the list to start chatting. You can discuss interview details, answer questions, and provide updates.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatsPage;