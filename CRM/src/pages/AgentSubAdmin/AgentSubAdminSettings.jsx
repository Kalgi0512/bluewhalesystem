import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Lock, Mail, Calendar, FileText, Shield,
  ChevronRight, Save, Smartphone, Palette, Sun, Moon,
  Check, Eye, EyeOff
} from 'lucide-react';

const AgentSubAdminSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    profile: {
      firstName: 'Sarah',
      lastName: 'Lee',
      email: 'sarah.lee@example.com',
      phone: '+1 (555) 123-4567',
    },
    
    // Notification Preferences
    notifications: {
      agentUpdates: true,
      documentUpdates: true,
      statusChanges: true,
      meetingReminders: true,
      emailNotifications: true,
      inAppNotifications: true
    },    
 
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const getIconForSection = (section) => {
    switch (section) {
      case 'profile': return <User size={18} className="text-blue-500" />;
      case 'notifications': return <Bell size={18} className="text-green-500" />;     
      default: return <User size={18} className="text-gray-500" />;
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-description-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={settings.profile.firstName}
                    onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={settings.profile.lastName}
                    onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-description-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Agent Updates', key: 'agentUpdates' },
                  { label: 'Document Updates', key: 'documentUpdates' },
                  { label: 'Status Changes', key: 'statusChanges' },
                  { label: 'Meeting Reminders', key: 'meetingReminders' },
                  { label: 'Email Notifications', key: 'emailNotifications' },
                  { label: 'In-App Notifications', key: 'inAppNotifications' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    <button 
                      onClick={() => handleToggle(item.key)}
                      className="relative inline-flex items-center justify-center"
                    >
                      <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${settings.notifications[item.key] ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${settings.notifications[item.key] ? 'translate-x-6' : ''}`}></div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section to view settings</div>;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'profile': return 'Personal Preferences';
      case 'notifications': return 'Notifications';
      default: return 'Settings';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'profile': return 'Manage your personal information and security settings';
      case 'notifications': return 'Configure how you receive notifications and alerts';
      default: return 'Manage your account preferences';
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
              Settings
            </motion.h1>
            <p className="text-muted-dark text-sm sm:text-base">Manage your account preferences and notifications</p>
          </div>
          
          <motion.button
            className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl bg-gradient-primary transition-all duration-300 text-sm sm:text-base cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(15, 121, 197, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={16} className="sm:w-5 sm:h-5" />
            Save Changes
          </motion.button>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4 border-r border-gray-200 bg-gray-50">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Settings</h3>
                <nav className="space-y-1">
                  {['profile', 'notifications'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-left transition-all duration-200 ${
                        activeSection === section
                          ? 'bg-gray-300 text-black shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getIconForSection(section)}
                      <span className="text-sm font-medium capitalize">
                        {section === 'profile' ? 'Personal Preferences' : section}
                      </span>
                      <ChevronRight size={16} className={`ml-auto ${activeSection === section ? 'text-black' : 'text-gray-400'}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="p-6">
                <h2 className="text-description-lg font-semibold text-gray-800 mb-2">{getSectionTitle()}</h2>
                <p className="text-muted-dark mb-6">
                  {getSectionDescription()}
                </p>

                {renderSectionContent()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AgentSubAdminSettings;