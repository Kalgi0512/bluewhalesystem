import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
 Menu,
 X,
 Users,
 MessageSquare,
 FileText,
 User,
 LogOut,
 Home,
 ChevronRight,
 BarChart3,
 ClipboardList,
 MessageCircle
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
 { to: "profile", label: "Profile", icon: User },
 { to: "candidates", label: "Managed Candidates", icon: Users },
 { to: "applications", label: "Applications", icon: ClipboardList },
 { to: "inquiries", label: "Inquiries", icon: MessageSquare },
 { to: "documents", label: "Documents", icon: FileText },
 { to: "chat", label: "Chat with Admin", icon: MessageCircle },
 { to: "analytics", label: "Analytics", icon: BarChart3 },
];

const SidebarItem = ({ to, icon: Icon, label, onClick, index, isActive = false }) => {
 const [isHovered, setIsHovered] = useState(false);

 return (
   <motion.div
     initial={{ opacity: 0, x: -20 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ delay: index * 0.1, duration: 0.3 }}
     onHoverStart={() => setIsHovered(true)}
     onHoverEnd={() => setIsHovered(false)}
   >
     <Link
       to={to}
       onClick={onClick}
       className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 relative overflow-hidden w-full text-left transform ${
         isActive
           ? "text-white shadow-lg scale-[1.02] bg-gradient-primary"
           : "text-gray-700 hover:text-[var(--color-secondary)] hover:bg-blue-50"
       }`}
     >
       {/* Active Background */}
       {isActive && (
         <motion.div
           className="absolute inset-0 rounded-xl bg-gradient-primary"
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.3, ease: "easeOut" }}
         />
       )}
      
       {/* Hover Background */}
       {isHovered && !isActive && (
         <motion.div
           className="absolute inset-0 rounded-xl bg-blue-50 border border-blue-200"
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.8, opacity: 0 }}
           transition={{ duration: 0.2 }}
         />
       )}

       <div className="relative z-10 flex items-center gap-3 w-full">
         <motion.div
           whileHover={{ scale: 1.1 }}
           transition={{ type: "spring", stiffness: 400 }}
           className={`p-2 rounded-lg ${
             isActive ? "bg-white/20" : "bg-blue-100 group-hover:bg-blue-200"
           }`}
         >
           <Icon className={`w-4 h-4 transition-all duration-200 ${
             isActive ? "text-white" : "text-[var(--color-secondary)]"
           }`} />
         </motion.div>
         <span className="flex-1 text-sm font-semibold">{label}</span>
         <motion.div
           className={`transition-all duration-200 ${
             isActive ? "text-white opacity-100"
             : "text-blue-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600"
           }`}
           animate={{
             x: (isActive || isHovered) ? 0 : -10,
           }}
           transition={{ duration: 0.2, ease: "easeOut" }}
         >
           <ChevronRight className="w-3 h-3" />
         </motion.div>
       </div>
     </Link>
   </motion.div>
 );
};

const AgentDashboardLayout = () => {
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const location = useLocation();
 const currentPath = location.pathname.split('/').pop() || 'profile';
 const toggleSidebar = () => setSidebarOpen((prev) => !prev);
 const closeSidebar = () => setSidebarOpen(false);
 const { logout } = useAuth();
 const navigate = useNavigate();

 return (
   <div className="min-h-screen flex flex-col md:flex-row relative bg-gray-50">
     {/* Mobile Header */}
     <motion.header
       className="md:hidden flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200"
       initial={{ y: -50, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.4, ease: "easeOut" }}
     >
       <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 0.1 }}
         className="flex items-center gap-3"
       >
         <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
           <User className="w-5 h-5 text-white" />
         </div>
         <h1 className="text-xl font-bold text-gray-800">
           Agent Dashboard
         </h1>
       </motion.div>
       <motion.button
         onClick={toggleSidebar}
         className="p-3 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         transition={{ duration: 0.1 }}
       >
         <AnimatePresence mode="wait">
           <motion.div
             key={sidebarOpen ? "close" : "menu"}
             initial={{ rotate: -90, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             exit={{ rotate: 90, opacity: 0 }}
             transition={{ duration: 0.2 }}
           >
             {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </motion.div>
         </AnimatePresence>
       </motion.button>
     </motion.header>

     {/* Sidebar - Made Sticky with NO Scroll */}
     <AnimatePresence>
       {(sidebarOpen || !window.matchMedia("(max-width: 768px)").matches) && (
         <>
           <motion.aside
             className={`fixed md:sticky md:top-0 left-0 w-72 h-screen bg-white shadow-xl border-r border-gray-200 z-50 overflow-hidden`}
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
             <div className="p-5 h-full flex flex-col">
               {/* Close Button */}
               <div className="md:hidden flex justify-end mb-3">
                 <motion.button
                   onClick={closeSidebar}
                   className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                 >
                   <X className="w-5 h-5" />
                 </motion.button>
               </div>

               {/* Title Section */}
               <motion.div
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1, duration: 0.4 }}
                 className="mb-6"
               >
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm">
                     <User className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <h2 className="text-xl font-bold text-gray-800">
                       Agent Hub
                     </h2>
                     <p className="text-xs text-gray-500">Management Portal</p>
                   </div>
                 </div>
               </motion.div>

               {/* Navigation - NO Scroll */}
               <motion.nav
                 className="flex flex-col space-y-1 flex-1"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.2, duration: 0.4 }}
               >
                 {navItems.map((item, index) => (
                   <SidebarItem
                     key={item.to}
                     {...item}
                     onClick={closeSidebar}
                     index={index}
                     isActive={currentPath === item.to}
                   />
                 ))}

                 {/* Back to Jobs Section */}
                 <motion.div
                   className="pt-3 mt-3 border-t border-gray-200"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4, duration: 0.3 }}
                 >
                   <Link
                     to="/jobs"
                     className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 relative overflow-hidden transform hover:scale-[1.01]"
                     onClick={closeSidebar}
                   >
                     <div className="flex items-center gap-3">
                       <motion.div
                         whileHover={{ scale: 1.1 }}
                         transition={{ type: "spring", stiffness: 400 }}
                         className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100"
                       >
                         <Home className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                       </motion.div>
                       <span className="text-sm font-semibold">Back to Jobs</span>
                     </div>
                   </Link>
                 </motion.div>
               </motion.nav>

               {/* Logout Button */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.3 }}
                 className="pt-3 border-t border-gray-200"
               >
                 <motion.button
                   className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:text-white hover:bg-red-500 font-medium transition-all duration-200 relative overflow-hidden w-full transform hover:scale-[1.01]"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => {
                     logout();
                     navigate('/login');
                   }}
                 >
                   <div className="flex items-center gap-3">
                     <motion.div
                       whileHover={{ scale: 1.1 }}
                       transition={{ type: "spring", stiffness: 400 }}
                       className="p-2 rounded-lg bg-red-100 group-hover:bg-white/20"
                     >
                       <LogOut className="w-4 h-4" />
                     </motion.div>
                     <span className="text-sm font-semibold">Logout</span>
                   </div>
                 </motion.button>
               </motion.div>
             </div>
           </motion.aside>

           {/* Mobile Overlay */}
           {sidebarOpen && (
             <motion.div
               className="fixed inset-0 bg-black/20 z-40 md:hidden"
               onClick={closeSidebar}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
             />
           )}
         </>
       )}
     </AnimatePresence>

     {/* Main Content */}
     <motion.main
       className="flex-1 p-6 overflow-y-auto bg-gray-50"
       initial={{ opacity: 0, x: 20 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ delay: 0.3, duration: 0.5 }}
     >
       {/* Content Wrapper with Better Padding */}
       <motion.div
         className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-full"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4, duration: 0.5 }}
       >
         <Outlet />
       </motion.div>
     </motion.main>
   </div>
 );
};

export default AgentDashboardLayout;