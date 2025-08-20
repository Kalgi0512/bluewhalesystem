import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ClipboardList,
  MessageSquare,
  FileText,
  User,
  LogOut,
  Home,
  ChevronRight,
  Users,
  CheckSquare,
  BarChart3,
  Shield,
  UserCog,
  Settings,
  LayoutDashboard,
  CheckCircle,
  UserPlus,
  CalendarDays
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/sales-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/sales-dashboard/candidates", label: "Candidates", icon: Users },
  { to: "/sales-dashboard/applications", label: "Job Applications", icon: FileText },
  { to: "/sales-dashboard/chats", label: "Chat", icon: MessageSquare },
    { to: "/sales-dashboard/leads", label: "Leads", icon: UserPlus },
  { to: "/sales-dashboard/reviews", label: "Profile Reviews", icon: CheckCircle },
    { to: "/sales-dashboard/meetings", label: "Meetings", icon: CalendarDays },
  { to: "/sales-dashboard/reports", label: "Reports", icon: BarChart3 },
  { to: "/sales-dashboard/settings", label: "Settings", icon: Settings }
];

const SidebarItem = ({ to, icon: Icon, label, onClick, index, isActive = false, isOpen, toggleOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {to ? (
        <Link
          to={to}
          onClick={onClick}
          className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden w-full text-left ${isActive
            ? "text-white"
            : "text-muted-dark hover:text-gray-900"
            }`}
        >
          {/* Active state background (full color) */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(90deg, #1B3890, #0F79C5)"
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Hover state background (subtle) */}
          {isHovered && !isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {/* Hover border animation */}
          {isHovered && !isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 pointer-events-none"
              style={{
                borderColor: "rgba(27, 56, 144, 0.3)"
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <div className="relative z-10 flex items-center gap-3 w-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-gray-600 group-hover:text-[#1B3890]"
                }`} />
            </motion.div>

            <span className="flex-1 text-description-sm">{label}</span>

            <motion.div
              className={`transition-all ${isActive ? "text-white opacity-100"
                : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`}
              animate={{
                x: (isActive || isHovered) ? 0 : -10
              }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </Link>
      ) : (
        <button
          onClick={toggleOpen}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full text-left hover:bg-gray-100 cursor-pointer"
        >
          <Icon className="w-5 h-5 text-gray-600" />
          <span className="flex-1 text-muted-dark hover:text-gray-900">{label}</span>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </motion.div>
        </button>
      )}
    </motion.div>
  );
};

const SalesDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname === "/dashboard" ? "." : location.pathname.replace(/^\/dashboard\//, '');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row relative bg-gradient-soft"
    >
      {/* Mobile Header */}
      <motion.header
        className="md:hidden flex items-center justify-end px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-gradient-primary text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence>
            <motion.div
              key={sidebarOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !window.matchMedia("(max-width: 768px)").matches) && (
          <>
            <motion.aside
              className={`fixed md:relative top-0 left-0 w-72 h-content bg-white/90 backdrop-blur-xl border-r border-white/30 z-50 shadow-2xl md:shadow-lg overflow-y-auto sm:overflow-y-hidden`}
              initial={{ x: -288, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -288, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
            >
              <div className="p-8 space-y-8 h-screen flex flex-col">
                {/* Close button for mobile */}
                <div className="md:hidden flex justify-end">
                  <button
                    onClick={closeSidebar}
                    className="p-2 rounded-full text-muted-dark hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <img src="/blue-whale-logo.webp" alt="Blue Whale Logo" className="w-auto h-15" />
                </motion.div>

                {/* Navigation */}
                <motion.nav
                  className="flex flex-col space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {navItems.map((item, index) =>
                    item.children ? (
                      <div key={item.label}>
                        <SidebarItem
                          label={item.label}
                          icon={item.icon}
                          index={index}
                          isOpen={adminOpen}
                          toggleOpen={() => setAdminOpen(prev => !prev)}
                        />
                        <AnimatePresence>
                          {adminOpen && (
                            <motion.div
                              className="ml-8 space-y-1"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.children.map((child, childIndex) => (
                                <SidebarItem
                                  key={child.to}
                                  {...child}
                                  onClick={closeSidebar}
                                  index={childIndex}
                                  isActive={currentPath === child.to}
                                />
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <SidebarItem
                        key={item.to}
                        {...item}
                        onClick={closeSidebar}
                        index={index}
                        isActive={currentPath === item.to}
                      />
                    )
                  )}


                </motion.nav>

                {/* Logout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.button
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-white font-medium transition-all duration-300 relative overflow-hidden w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // logout logic 
                      console.log("Logging out...")
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <LogOut className="w-5 h-5" />
                      </motion.div>
                      Logout
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                onClick={closeSidebar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        className="flex-1 lg:p-12 overflow-y-auto relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-10 blur-md"
            style={{ background: "linear-gradient(90deg, #1B3890, #0F79C5)" }}
          />
          <div
            className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-10  blur-md"
            style={{ background: "linear-gradient(90deg, #0F79C5, #1B3890)" }}
          />
        </div>

        {/* Content wrapper with glass effect */}
        <motion.div
          className="relative z-10 bg-white/50 backdrop-blur-sm lg:rounded-2xl p-5 lg:p-8 min-h-full shadow-xl border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default SalesDashboardLayout;