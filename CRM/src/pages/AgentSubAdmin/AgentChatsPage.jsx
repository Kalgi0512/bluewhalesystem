import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MessageSquare, User, Mail, Phone, MapPin, 
  ChevronDown, Paperclip, Send, MoreVertical, Clock,
  Video, PhoneCall, Info, X, ChevronLeft
} from 'lucide-react';

const AgentChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  // Sample agent data with chat history
  const [agents, setAgents] = useState([
    {
      id: 101,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'Toronto, Canada',
      position: 'Senior Placement Agent',
      status: 'Active',
      lastMessage: 'Looking forward to the new leads!',
      lastMessageTime: '2 hours ago',
      unread: 3,
      messages: [
        {
          id: 1,
          text: 'Hello, I wanted to follow up on the new agent leads.',
          time: '10:30 AM',
          sender: 'agent',
        },
        {
          id: 2,
          text: 'Thanks for reaching out! We\'ve reviewed your leads and would like to schedule a meeting.',
          time: '10:45 AM',
          sender: 'staff',
        },
        {
          id: 3,
          text: 'That\'s great news! I\'m available most days next week.',
          time: '11:15 AM',
          sender: 'agent',
        },
        {
          id: 4,
          text: 'How about Tuesday at 2 PM? We\'ll have a discussion with our lead developer.',
          time: '11:30 AM',
          sender: 'staff',
        },
        {
          id: 5,
          text: 'Tuesday at 2 PM works perfectly for me. Looking forward to it!',
          time: '12:00 PM',
          sender: 'agent',
        },
      ]
    },
    {
      id: 102,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      location: 'Vancouver, Canada',
      position: 'UX Placement Agent',
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
          sender: 'agent',
        },
      ]
    },
    {
      id: 201,
      name: 'Emily Carter',
      email: 'emily.carter@email.com',
      phone: '+1 (555) 456-7890',
      location: 'New York, USA',
      position: 'Healthcare Placement Agent',
      status: 'Meeting Scheduled',
      lastMessage: 'Confirming the meeting location.',
      lastMessageTime: '3 days ago',
      unread: 1,
      messages: [
        {
          id: 1,
          text: 'Hello Emily, we\'d like to schedule a meeting for the Healthcare Placement Agent position.',
          time: '3 days ago',
          sender: 'staff',
        },
        {
          id: 2,
          text: 'Thank you! I\'m available on Thursday or Friday this week.',
          time: '3 days ago',
          sender: 'agent',
        },
      ]
    },
    {
      id: 301,
      name: 'Ahmed Khan',
      email: 'ahmed.k@email.com',
      phone: '+1 (555) 654-3210',
      location: 'Dubai, UAE',
      position: 'Construction Placement Agent',
      status: 'Offer Extended',
      lastMessage: 'Thank you for the offer!',
      lastMessageTime: '1 week ago',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Congratulations! We\'re pleased to extend an offer for the Construction Placement Agent role.',
          time: '1 week ago',
          sender: 'staff',
        },
        {
          id: 2,
          text: 'Thank you so much! I\'m thrilled to accept this opportunity.',
          time: '1 week ago',
          sender: 'agent',
        },
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedAgent?.messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedAgent) return;

    const newMessage = {
      id: selectedAgent.messages.length + 1,
      text: messageInput,
      time: 'Just now',
      sender: 'staff',
    };

    setAgents(prev => prev.map(agent => {
      if (agent.id === selectedAgent.id) {
        return {
          ...agent,
          messages: [...agent.messages, newMessage],
          lastMessage: messageInput,
          lastMessageTime: 'Just now'
        };
      }
      return agent;
    }));

    setSelectedAgent(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setMessageInput('');
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => b.unread - a.unread);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'meeting scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'offer extended': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 md:p-6"
    >
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 text-center md:text-left"
        >
          <div className="space-y-2">
            <motion.h1
              className="text-heading-lg font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              Agent Chats
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Communicate with your agents in real-time</p>
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
            New Chat
          </motion.button>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents by name, email, or position..."
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
                <option>All Statuses</option>
                <option>Active</option>
                <option>Reviewing</option>
                <option>Meeting Scheduled</option>
                <option>Offer Extended</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Agents ({sortedAgents.length})</h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(100vh-300px)]">
              <AnimatePresence>
                {sortedAgents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setChatOpen(true);
                    }}
                    className={`flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                      selectedAgent?.id === agent.id ? 'bg-gray-50' : ''
                    }`}
                    onMouseEnter={() => setHoveredRow(agent.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-indigo-600" />
                      </div>
                      {agent.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {agent.unread}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
                        <span className="text-xs text-gray-500">{agent.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{agent.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {selectedAgent ? (
                <>
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setSelectedAgent(null)}
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedAgent.name}</h3>
                        <p className="text-sm text-gray-600">{selectedAgent.position} • {selectedAgent.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAgent.status)}`}>
                        {selectedAgent.status}
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
                      {selectedAgent.messages.map(message => (
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
                    Choose an agent from the list to start chatting. You can discuss leads details, answer questions, and provide updates.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentChatsPage;