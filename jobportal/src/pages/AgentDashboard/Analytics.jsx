import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Download,
  RefreshCw,
  Award,
  Target,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Activity,
  Zap,
  Trophy,
  TrendingDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import axios from 'axios';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const COLORS = ['#1B3890', '#0F79C5', '#38BDF8', '#1B3890', '#0F79C5', '#38BDF8'];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/analytics/dashboard');
      if (data.success) {
        setAnalyticsData(data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    try {
      setRefreshing(true);
      await axios.post('/api/analytics/update');
      await fetchAnalytics();
    } catch (error) {
      console.error('Error refreshing analytics:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const exportData = async () => {
    try {
      const response = await axios.get('/api/analytics/export', {
        params: {
          startDate: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString(),
          format: 'csv'
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/90 backdrop-blur-xl rounded-3xl border border-white/70 shadow-2xl p-12"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-transparent border-t-[#1B3890] rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Analytics</h3>
          <p className="text-gray-600">Preparing your performance insights...</p>
        </motion.div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/90 backdrop-blur-xl rounded-3xl border border-white/70 shadow-2xl p-12 max-w-lg"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#1B3890] to-[#0F79C5] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No Analytics Data Available</h3>
          <p className="text-gray-600 leading-relaxed">Analytics data will appear once you start managing candidates and applications. Begin your journey to track your success!</p>
        </motion.div>
      </div>
    );
  }

  const { currentMetrics, monthlyTrends, performanceComparison, jobCategoryBreakdown } = analyticsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-6 p-4 md:p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-3">
              Analytics Dashboard
            </h1>
            <motion.div
              className="h-1 w-32 rounded-full mx-auto lg:mx-0 bg-gradient-to-r from-[#1B3890] to-[#0F79C5]"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.3, duration: 1 }}
            />
            <p className="text-gray-600 mt-3 text-base">
              Track your performance and candidate management metrics
            </p>
          </div>

          <div className="flex gap-3 justify-center lg:justify-end">
            <motion.button
              onClick={refreshAnalytics}
              disabled={refreshing}
              className="flex items-center gap-2 px-5 py-2 bg-white/90 backdrop-blur-xl border border-gray-200 text-gray-700 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: refreshing ? 1 : 1.05, y: refreshing ? 0 : -2 }}
              whileTap={{ scale: refreshing ? 1 : 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#1B3890]' : ''}`} />
              <span className="font-medium">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </motion.button>
            
            <motion.button
              onClick={exportData}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#1B3890] to-[#0F79C5] text-white rounded-2xl hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span className="font-semibold">Export Data</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl hover:bg-white/95 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Total Managed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{currentMetrics?.candidateMetrics?.totalManaged || 0}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                    <ArrowUp className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-600 text-xs font-bold">+{currentMetrics?.candidateMetrics?.newCandidates || 0}</span>
                  </div>
                  <span className="text-gray-500 text-xs">this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3890] to-[#0F79C5] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl hover:bg-white/95 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Total Applications</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{currentMetrics?.applicationMetrics?.totalApplications || 0}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                    <Clock className="w-3 h-3 text-[#0F79C5]" />
                    <span className="text-[#0F79C5] text-xs font-bold">{currentMetrics?.applicationMetrics?.pendingApplications || 0}</span>
                  </div>
                  <span className="text-gray-500 text-xs">pending</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#0F79C5] to-[#38BDF8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl hover:bg-white/95 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Success Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {currentMetrics?.performanceMetrics?.placementSuccessRate?.toFixed(1) || 0}%
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                    <Trophy className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-600 text-xs font-bold">{currentMetrics?.candidateMetrics?.successfulPlacements || 0}</span>
                  </div>
                  <span className="text-gray-500 text-xs">placements</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3890] to-[#0F79C5] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl hover:bg-white/95 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">Satisfaction Score</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {currentMetrics?.performanceMetrics?.clientSatisfactionScore || 0}/5
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                    <Activity className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-600 text-xs font-bold">{currentMetrics?.performanceMetrics?.responseRate || 0}%</span>
                  </div>
                  <span className="text-gray-500 text-xs">response rate</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#0F79C5] to-[#38BDF8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B3890] to-[#0F79C5] rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Monthly Performance Overview</h3>
              <p className="text-gray-600 text-sm">Compare your current month with previous performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceComparison && (
              <>
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-[#1B3890] mb-1">
                    {performanceComparison.thisMonth?.applications || 0}
                  </div>
                  <div className="text-gray-700 font-semibold mb-2 text-sm">Applications This Month</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    (performanceComparison.growth?.applications || 0) >= 0
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {(performanceComparison.growth?.applications || 0) >= 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {Math.abs(performanceComparison.growth?.applications || 0)}% vs last month
                  </div>
                </div>

                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {performanceComparison.thisMonth?.placements || 0}
                  </div>
                  <div className="text-gray-700 font-semibold mb-2 text-sm">Placements This Month</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    (performanceComparison.growth?.placements || 0) >= 0
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {(performanceComparison.growth?.placements || 0) >= 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {Math.abs(performanceComparison.growth?.placements || 0)}% vs last month
                  </div>
                </div>

                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {performanceComparison.thisMonth?.candidates || 0}
                  </div>
                  <div className="text-gray-700 font-semibold mb-2 text-sm">New Candidates This Month</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    (performanceComparison.growth?.candidates || 0) >= 0
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {(performanceComparison.growth?.candidates || 0) >= 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {Math.abs(performanceComparison.growth?.candidates || 0)}% vs last month
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Monthly Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1B3890] to-[#0F79C5] rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Monthly Trends</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends || []}>
                  <defs>
                    <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B3890" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1B3890" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="placementsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F79C5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0F79C5" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#1B3890"
                    strokeWidth={3}
                    fill="url(#applicationsGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="placements"
                    stackId="2"
                    stroke="#0F79C5"
                    strokeWidth={3}
                    fill="url(#placementsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Application Status Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0F79C5] to-[#38BDF8] rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Application Status Distribution</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Approved', value: currentMetrics?.applicationMetrics?.approvedApplications || 0 },
                      { name: 'Pending', value: currentMetrics?.applicationMetrics?.pendingApplications || 0 },
                      { name: 'Rejected', value: currentMetrics?.applicationMetrics?.rejectedApplications || 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="none"
                  >
                    {[
                      { name: 'Approved', value: currentMetrics?.applicationMetrics?.approvedApplications || 0 },
                      { name: 'Pending', value: currentMetrics?.applicationMetrics?.pendingApplications || 0 },
                      { name: 'Rejected', value: currentMetrics?.applicationMetrics?.rejectedApplications || 0 },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Job Categories Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#38BDF8] to-[#1B3890] rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Job Categories Performance</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobCategoryBreakdown || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="applicationsBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B3890" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#1B3890" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="placementsBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F79C5" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#0F79C5" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <Bar dataKey="applications" fill="url(#applicationsBar)" name="Applications" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placements" fill="url(#placementsBar)" name="Placements" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Enhanced Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Quick Stats */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1B3890] to-[#38BDF8] rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Quick Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium text-sm">Average Response Time</span>
                <span className="font-bold text-base text-gray-800">
                  {currentMetrics?.performanceMetrics?.averageTimeToPlacement || 0} days
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium text-sm">Top Performing Category</span>
                <span className="font-bold text-base text-[#0F79C5]">
                  {jobCategoryBreakdown?.[0]?.category || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium text-sm">Success Rate Trend</span>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-bold ${
                  (performanceComparison?.growth?.placements || 0) >= 0
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {(performanceComparison?.growth?.placements || 0) >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="font-bold text-xs">
                    {(performanceComparison?.growth?.placements || 0) >= 0 ? 'Improving' : 'Declining'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600 font-medium text-sm">Client Satisfaction</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (currentMetrics?.performanceMetrics?.clientSatisfactionScore || 0)
                          ? 'text-blue-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Goals and Targets */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0F79C5] to-[#1B3890] rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Goals & Targets</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium text-sm">Monthly Applications</span>
                  <span className="text-xs text-gray-500 font-bold">
                    {currentMetrics?.applicationMetrics?.totalApplications || 0}/50
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1B3890] to-[#0F79C5] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(((currentMetrics?.applicationMetrics?.totalApplications || 0) / 50) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium text-sm">Success Rate Target</span>
                  <span className="text-xs text-gray-500 font-bold">
                    {currentMetrics?.performanceMetrics?.placementSuccessRate?.toFixed(1) || 0}%/30%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#0F79C5] to-[#38BDF8] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(((currentMetrics?.performanceMetrics?.placementSuccessRate || 0) / 30) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium text-sm">Candidate Growth</span>
                  <span className="text-xs text-gray-500 font-bold">
                    {currentMetrics?.candidateMetrics?.newCandidates || 0}/20
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1B3890] to-[#0F79C5] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(((currentMetrics?.candidateMetrics?.newCandidates || 0) / 20) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-base">📈</div>
                    <div>
                      <span className="font-bold text-[#1B3890]">Tip:</span> Focus on high-performing categories to improve your success rate.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-indigo-50 rounded-xl border border-indigo-200">
                    <div className="text-base">⚡</div>
                    <div>
                      <span className="font-bold text-indigo-700">Growth:</span> Maintain consistent outreach to meet your monthly targets.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;