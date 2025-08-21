import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  BarChart3,
  User,
  ChevronDown,
  X,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const hoverCard = {
  hover: { 
    scale: 1.02, 
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const hoverButton = {
  hover: { scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" },
  tap: { scale: 0.98 }
};

// Dashboard Stats Component
const DashboardStats = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        variants={hoverCard}
        whileHover="hover"
        className="bg-white/80 rounded-xl shadow-md border border-white/20 p-6"
      >
        <div className="flex justify-between text-center sm:items-start">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <h3 className="text-lg sm:text-2xl font-bold mt-1 text-gray-900">{stat.value}</h3>
            <div className={`flex items-center mt-2 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </div>
          <motion.div 
            className={`hidden sm:block p-3 rounded-lg ${stat.color}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.4 }}
          >
            {stat.icon}
          </motion.div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Leads Summary Component
const LeadsSummary = ({ leadsData }) => (
  <motion.div variants={itemVariants} className="bg-white/80 rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Leads Summary</h2>
      <Link 
        to="/sales-dashboard/leads"
        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer font-medium"
      >
        View All
      </Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Today</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">B2B</span>
            <span className="font-semibold text-gray-900">{leadsData.today.b2b}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">B2C</span>
            <span className="font-semibold text-gray-900">{leadsData.today.b2c}</span>
          </div>
          <div className="h-px bg-gray-100 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">Total</span>
            <span className="font-bold text-[var(--color-secondary)]">{leadsData.today.total}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">This Week</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">B2B</span>
            <span className="font-semibold text-gray-900">{leadsData.week.b2b}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">B2C</span>
            <span className="font-semibold text-gray-900">{leadsData.week.b2c}</span>
          </div>
          <div className="h-px bg-gray-100 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">Total</span>
            <span className="font-bold text-[var(--color-secondary)]">{leadsData.week.total}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Active Chats Component
const ActiveChats = ({ chats }) => (
  <motion.div variants={itemVariants} className="bg-white/80 rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Active Chats</h2>
      <Link 
        to="/sales-dashboard/chats"
        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer font-medium"
      >
        View All
      </Link>
    </div>
    
    <div className="space-y-4">
      {chats.map((chat, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{chat.name}</h3>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          </div>
          {chat.unread > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[20px] text-center">
              {chat.unread}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Applications Pipeline Component
const ApplicationsPipeline = ({ pipelineData }) => (
  <motion.div variants={itemVariants} className="bg-white/80 rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Applications Pipeline</h2>
      <Link 
        to="/sales-dashboard/applications"
        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer font-medium"
      >
        View All
      </Link>
    </div>
    
    <div className="space-y-4">
      {pipelineData.map((stage, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{stage.stage}</span>
            <span className="font-medium text-gray-900">{stage.count}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${stage.percentage}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Upcoming Meetings Component
const UpcomingMeetings = ({ meetings }) => (
  <motion.div variants={itemVariants} className="bg-white/80 rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
      <Link 
        to="/sales-dashboard/meetings"
        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer font-medium"
      >
        View All
      </Link>
    </div>
    
    <div className="space-y-4">
      {meetings.map((meeting, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
            <p className="text-sm text-gray-600">{meeting.time}</p>
          </div>
          <span className="text-xs text-gray-500">{meeting.with}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const statsData = [
    {
      title: "Agents",
      value: "1,234",
      isPositive: true,
      change: "+5.6%",
      icon: <Users className="text-blue-500" size={24} />,
      color: "bg-blue-100"
    },
    {
      title: "Chats",
      value: "89",
      isPositive: true,
      change: "+3.2%",
      icon: <MessageSquare className="text-green-500" size={24} />,
      color: "bg-green-100"
    },
    {
      title: "Applications",
      value: "642",
      isPositive: true,
      change: "+8.7%",
      icon: <FileText className="text-purple-500" size={24} />,
      color: "bg-purple-100"
    },
    {
      title: "Meetings",
      value: "12",
      isPositive: false,
      change: "-1.2%",
      icon: <Calendar className="text-amber-500" size={24} />,
      color: "bg-amber-100"
    }
  ];

  const leadsData = {
    today: {
      b2b: 8,
      b2c: 12,
      total: 20
    },
    week: {
      b2b: 42,
      b2c: 78,
      total: 120
    }
  };

  const activeChats = [
    {
      name: "Robert Johnson",
      lastMessage: "Looking for IT roles in Canada",
      time: "2 min ago",
      unread: 3
    },
    {
      name: "Sarah Williams",
      lastMessage: "Asked about visa process",
      time: "15 min ago",
      unread: 0
    },
    {
      name: "Michael Chen",
      lastMessage: "Sent updated resume",
      time: "30 min ago",
      unread: 1
    },
    {
      name: "Emma Thompson",
      lastMessage: "Confirmed interview time",
      time: "1 hr ago",
      unread: 0
    },
    {
      name: "David Wilson",
      lastMessage: "Requested information about healthcare jobs",
      time: "2 hrs ago",
      unread: 2
    },
    {
      name: "Lisa Brown",
      lastMessage: "Completed application form",
      time: "3 hrs ago",
      unread: 0
    }
  ];

  const pipelineData = [
    { stage: "Applied", count: 42, percentage: 65 },
    { stage: "Interview", count: 18, percentage: 28 },
    { stage: "Placed", count: 4, percentage: 6 }
  ];

  const upcomingMeetings = [
    {
      title: "Visa Consultation",
      time: "Today, 10:30 AM",
      with: "James Wilson",
      type: "call"
    },
    {
      title: "Job Interview Prep",
      time: "Today, 2:00 PM",
      with: "Emma Thompson",
      type: "meeting"
    },
    {
      title: "Follow-up Call",
      time: "Tomorrow, 11:15 AM",
      with: "Michael Chen",
      type: "call"
    },
    {
      title: "Document Review",
      time: "Tomorrow, 3:00 PM",
      with: "Sarah Williams",
      type: "meeting"
    },
    {
      title: "Visa Status Update",
      time: "Day after tomorrow, 9:00 AM",
      with: "Robert Johnson",
      type: "call"
    }
  ];


  return (
    <div className="md:p-6">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
        className="space-y-6"
      >
        {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-heading-lg font-bold bg-gradient-primary bg-clip-text text-transparent">Agent Dashboard Overview</h1>
          <p className="text-muted-dark text-sm sm:text-base">Welcome back! Track your agents' migration journeys in real-time.</p>
        </div>
      </motion.div>

        {/* Stats */}
        <DashboardStats stats={statsData} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LeadsSummary leadsData={leadsData} />
            <ActiveChats 
              chats={activeChats}               
            />
          </div>
          
          <div className="space-y-6">
            <ApplicationsPipeline pipelineData={pipelineData} />
            <UpcomingMeetings 
              meetings={upcomingMeetings} 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;