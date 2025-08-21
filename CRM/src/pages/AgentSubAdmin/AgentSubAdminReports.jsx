import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Calendar, User, FileText, 
  Clock, TrendingUp, ChevronDown, BarChart3,
  Users, FileCheck, FileWarning, Globe, Target
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts';

const AgentSubAdminReports = () => {
  // Sample data for charts
  const statusData = [
    { name: 'New', value: 45, fill: '#3B82F6' },
    { name: 'Processing', value: 30, fill: '#8B5CF6' },
    { name: 'Completed', value: 25, fill: '#10B981' }
  ];

  const visaStageData = [
    { name: 'Not Started', value: 20, fill: '#9CA3AF' },
    { name: 'Processing', value: 50, fill: '#F59E0B' },
    { name: 'Completed', value: 30, fill: '#10B981' }
  ];

  const agentDistributionData = [
    { name: 'B2B', value: 65, fill: '#3B82F6' },
    { name: 'B2C', value: 35, fill: '#8B5CF6' }
  ];

  const processingTimeData = [
    { month: 'Jan', days: 14 },
    { month: 'Feb', days: 12 },
    { month: 'Mar', days: 16 },
    { month: 'Apr', days: 13 },
    { month: 'May', days: 11 },
    { month: 'Jun', days: 10 }
  ];

  const monthlyApplicationsData = [
    { month: 'Jan', applications: 12 },
    { month: 'Feb', applications: 19 },
    { month: 'Mar', applications: 15 },
    { month: 'Apr', applications: 22 },
    { month: 'May', applications: 18 },
    { month: 'Jun', applications: 25 }
  ];

  // Stats cards data
const stats = [
  {
    title: 'Total Agents Managed',
    value: '156',
    subtitle: 'Active in system',
    icon: <Users className="h-6 w-6 text-blue-500" />,
    trend: {
      value: '+12%',
      isPositive: true,
      label: 'vs last month'
    }
  },
  {
    title: 'New Applications (This Month)',
    value: '28',
    subtitle: 'From all sources',
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    trend: {
      value: '+5',
      isPositive: true,
      label: 'from previous month'
    }
  },
  {
    title: 'Pending Documentation',
    value: '17',
    subtitle: 'Requires follow-up',
    icon: <FileWarning className="h-6 w-6 text-amber-500" />,
    trend: {
      value: '-3',
      isPositive: false,
      label: 'outstanding'
    }
  },
  {
    title: 'Average Processing Time',
    value: '12 days',
    subtitle: 'From application to decision',
    icon: <Clock className="h-6 w-6 text-purple-500" />,
    trend: {
      value: '-2 days',
      isPositive: true,
      label: 'improvement'
    }
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-700 font-medium">{label}</p>
          <p className="text-blue-600">
            {payload[0].value} {payload[0].name === 'days' ? 'days' : 'applications'}
          </p>
        </div>
      );
    }
    return null;
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
              Agent Reports & Analytics
            </motion.h1>
            <p className="text-gray-600 text-sm sm:text-base">Track performance and agent metrics</p>
          </div>
          
          <motion.button
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} className="sm:w-5 sm:h-5" />
            Export Report
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-100">
                  {stat.icon}
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.trend.value}</span>
                <span className="text-gray-500">{stat.trend.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Status Distribution */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600" />
              Agent Status Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Visa Stage Breakdown */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Globe size={18} className="text-green-600" />
              Visa Stage Breakdown
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={visaStageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {visaStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Agent distribuiton & Processing Time */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* agent distribution */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Target size={18} className="text-purple-600" />
              Agent Distribution (B2B vs B2C)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={agentDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {agentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Average Processing Time */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-amber-600" />
              Average Processing Time (Days)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={processingTimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="days" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                    name="Days"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Monthly Applications Trend */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              Monthly Applications Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyApplicationsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.2} 
                    name="Applications"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgentSubAdminReports;