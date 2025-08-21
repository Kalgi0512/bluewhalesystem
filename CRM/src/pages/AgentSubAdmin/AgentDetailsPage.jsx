import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, User,
  FileText, MessageSquare, Clock, Download, Building,
  ChevronDown, ChevronUp, Edit, Save, X, Send
} from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";

const mockAgents = [
  {
    id: 1,
    name: 'John Smith',
    type: 'B2C',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Toronto, Canada',
    profession: 'Placement Agent',
    status: 'Active',
    jobInterest: 'IT Roles',
    lastContact: '2023-05-15',
    resume: 'Submitted',
    visaStatus: 'Approved',
    agent: null,
     dob: '1990-05-15',
    gender: 'Male',
    ageRange: '30-35',
    qualification: 'Master\'s Degree',
    experience: '8 years',
    categories: ['IT & Networking', 'Engineering'],
    languages: ['English', 'French'],
    aboutMe: 'Experienced placement agent with 8 years of expertise in developing scalable web applications. Passionate about clean code architecture and mentoring junior developers. Seeking opportunities to work on challenging projects in a collaborative environment.',
    socialNetworks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/johnsmith' },
      { platform: 'GitHub', url: 'https://github.com/johnsmith' }
    ]
  },
];

const AgentDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const foundAgent = mockAgents.find(c => c.id === parseInt(id));
        setAgent(foundAgent || null);
      } catch (error) {
        console.error('Error fetching agent:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  if (!agent) {
    return (
      <div className="p-6 text-center">
        <p>No agent selected</p>
      </div>
    );
  }


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

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="p-6 text-center">
        <p>No agent found with ID: {id}</p>
        <button
          onClick={() => navigate('/sales-dashboard/agents')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Agents
        </button>
      </div>
    );
  }

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
              Agent Details
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">View and manage agent information</p>
          </div>
          
          <motion.button
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit size={16} className="sm:w-5 sm:h-5" />
            Edit Agent
          </motion.button>
        </motion.div>

        {/* Agent Header */}
        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-12 h-12 text-indigo-600" />
              </div>
              <motion.span 
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(agent.status)}`}
                whileHover={{ scale: 1.05 }}
              >
                {agent.status}
              </motion.span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
              <p className="text-gray-600 mt-1">{agent.profession} • {agent.type}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <span className="text-sm">{agent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} />
                  <span className="text-sm">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">{agent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span className="text-sm">Last Contact: {agent.lastContact}</span>
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

        {/* Tabs */}
        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {['personal-info', 'documents', 'application-history'].map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === 'personal-info' ? 'Personal Info' : tab === 'documents' ? 'Documents' : 'Application History'}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'personal-info' && (
              <motion.div
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-500 mt-1">Agent's basic details and contact information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { label: 'Date of Birth', value: agent.dob, icon: Calendar },
                      { label: 'Gender', value: agent.gender, icon: User },
                      { label: 'Age Range', value: agent.ageRange, icon: Clock },
                      { label: 'Qualification', value: agent.qualification, icon: FileText },
                      { label: 'Experience', value: agent.experience, icon: Briefcase }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.label}
                        className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-dark font-medium">{item.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <item.icon className="w-5 h-5 text-gray-500" />
                          <p className="text-gray-900 font-bold">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                      <p className="text-sm text-muted-dark font-medium mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.categories.map(category => (
                          <span key={category} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full border border-indigo-200">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                      <p className="text-sm text-muted-dark font-medium mb-2">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.languages.map(lang => (
                          <span key={lang} className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                      <p className="text-sm text-muted-dark font-medium mb-2">About Me</p>
                      <p className="text-gray-600 leading-relaxed">{agent.aboutMe}</p>
                    </div>

                    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                      <p className="text-sm text-muted-dark font-medium mb-2">Social Networks</p>
                      <div className="space-y-2">
                        {agent.socialNetworks.map(network => (
                          <a 
                            key={network.platform} 
                            href={network.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <span className="text-gray-700">{network.platform}</span>
                            <ChevronRight size={16} className="text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Documents</h3>
                  <p className="text-sm text-gray-500 mt-1">Agent's submitted documents and verification status</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold flex items-center gap-2">
                          <FileText size={18} className="text-indigo-600" />
                          Resume/CV
                        </p>
                        <p className="text-sm text-gray-500">Uploaded on May 15, 2023</p>
                      </div>
                      <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold flex items-center gap-2">
                          <FileText size={18} className="text-green-600" />
                          Education Certificate
                        </p>
                        <p className="text-sm text-gray-500">Uploaded on May 16, 2023</p>
                      </div>
                      <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold flex items-center gap-2">
                          <FileText size={18} className="text-purple-600" />
                          Work Experience Letter
                        </p>
                        <p className="text-sm text-gray-500">Uploaded on May 18, 2023</p>
                      </div>
                      <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="px-4 py-2 bg-white border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-lg hover:bg-blue-100 transition-colors">
                    Upload New Document
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'application-history' && (
              <motion.div
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Application History</h3>
                  <p className="text-sm text-gray-500 mt-1">Agent's application progress timeline</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Initial Application</p>
                        <p className="text-sm text-gray-500">May 15, 2023</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
                        Completed
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">Agent submitted initial application form</p>
                  </div>

                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Skills Assessment</p>
                        <p className="text-sm text-gray-500">May 18, 2023</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
                        Completed
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">Agent completed technical skills assessment with score of 87%</p>
                  </div>

                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Document Verification</p>
                        <p className="text-sm text-gray-500">May 20, 2023</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
                        In Progress
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">Waiting for verification of education certificates</p>
                  </div>

                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Visa Processing</p>
                        <p className="text-sm text-gray-500">Not started</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full border border-gray-200">
                        Pending
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">Will begin after document verification is complete</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgentDetailsPage;