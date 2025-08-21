import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
 FileText,
 User,
 CreditCard,
 CheckCircle,
 AlertCircle,
 Eye,
 Plus,
 Upload,
 Folder
} from "lucide-react";

const documentTypes = [
 { key: "photo", label: "Profile Photo", multiple: false, accept: "image/*", icon: User, color: "from-blue-500 to-blue-600" },
 { key: "passport", label: "Passport Photo", multiple: false, accept: "image/*", icon: CreditCard, color: "from-green-500 to-green-600" },
 { key: "drivingLicense", label: "Driving License", multiple: false, accept: "image/*", icon: CreditCard, color: "from-orange-500 to-orange-600" },
 { key: "cv", label: "CV(s)", multiple: true, accept: ".pdf,.doc,.docx", icon: FileText, color: "from-indigo-500 to-indigo-600" },
];

const Documents = () => {
 const { user, token, loading: authLoading } = useAuth();

 const [existing, setExisting] = useState({ photo: [], passport: [], drivingLicense: [], cv: [] });
 const [files, setFiles] = useState({});
 const [previews, setPreviews] = useState({});
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState("");

 const normalize = arr => arr.map(doc => ({ ...doc, url: (doc.url || "").replace(/\\/g, "/") }));

 // Log auth info when it becomes available
 useEffect(() => {
   if (!authLoading) {
     console.log("Auth loaded. User:", user);
     console.log("Auth loaded. Token:", token);
   }
 }, [authLoading, user, token]);

 // Fetch existing documents
 useEffect(() => {
   if (!user || !token) return;

   const fetchDocs = async () => {
     console.log("Fetching documents for user:", user._id);
     try {
       const { data } = await axios.get("/api/documents", {
         headers: { Authorization: `Bearer ${token}` }
       });
       console.log("Fetched existing documents:", data.documents);

       setExisting({
         photo: normalize(data.documents.photo || []),
         passport: normalize(data.documents.passport || []),
         drivingLicense: normalize(data.documents.drivingLicense || []),
         cv: normalize(data.documents.cv || []),
       });
     } catch (err) {
       console.error("Failed to fetch documents:", err);
     }
   };

   fetchDocs();
 }, [user, token]);

 // Log whenever existing state changes
 useEffect(() => {
   console.log("Existing documents state updated:", existing);
 }, [existing]);

 // Handle file selection
 const handleFileChange = (e, key) => {
   console.log(`File change detected for ${key}`);
   const picked = documentTypes.find(d => d.key === key);
   if (!picked) return;

   if (picked.multiple) {
     setFiles(f => ({ ...f, [key]: Array.from(e.target.files) }));
   } else {
     const file = e.target.files[0];
     setFiles(f => ({ ...f, [key]: file }));

     if (file && file.type.startsWith("image/")) {
       const reader = new FileReader();
       reader.onload = () => setPreviews(p => ({ ...p, [key]: reader.result }));
       reader.readAsDataURL(file);
     }
   }
 };

 // Submit files
 const handleSubmit = async e => {
   e.preventDefault();
   console.log("Submitting files:", files);
   setLoading(true);
   setMessage("");

   try {
     const form = new FormData();
     documentTypes.forEach(({ key, multiple }) => {
       const val = files[key];
       if (!val) return;
       if (multiple) val.forEach(file => form.append(key, file));
       else form.append(key, val);
     });

     const { data } = await axios.post("/api/documents", form, {
       headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
     });

     console.log("Upload response:", data);
     setMessage("Upload successful!");
     setFiles({});
     setPreviews({});
     setExisting({
       photo: normalize(data.documents.photo || []),
       passport: normalize(data.documents.passport || []),
       drivingLicense: normalize(data.documents.drivingLicense || []),
       cv: normalize(data.documents.cv || [])
     });

   } catch (err) {
     console.error("Upload failed:", err);
     setMessage("Upload failed, please try again.");
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   if (message) {
     console.log("Message set:", message);
     const timer = setTimeout(() => setMessage(""), 2500);
     return () => clearTimeout(timer);
   }
 }, [message]);

 if (authLoading) return (
   <div className="flex items-center justify-center h-64">
     <motion.div
       animate={{ rotate: 360 }}
       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
       className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
     />
   </div>
 );
 
 if (!user) return <div className="text-center text-gray-600">Please log in</div>;

 return (
   <div className="space-y-8">
     {/* Header */}
     <motion.div 
       initial={{ opacity: 0, y: -20 }} 
       animate={{ opacity: 1, y: 0 }} 
       transition={{ duration: 0.5 }} 
       className="text-center"
     >
       <div className="flex items-center justify-center gap-3 mb-2">
         <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
           <FileText className="w-7 h-7 text-white" />
         </div>
         <h1 className="text-heading-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
           Document Manager
         </h1>
       </div>
       <p className="text-muted-dark max-w-2xl mx-auto">
         Securely upload and manage your important documents
       </p>
     </motion.div>

     {/* Existing Documents */}
     <motion.div 
       className="space-y-6"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2 }}
     >
       <div className="flex items-center gap-3">
         <Folder className="w-6 h-6 text-blue-600" />
         <h2 className="text-2xl font-bold text-gray-800">
           Your Documents
         </h2>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {documentTypes.map(({ key, label, icon: IconComponent, color }, index) => (
           <motion.div 
             key={key} 
             className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
             whileHover={{ y: -2 }}
           >
             <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white shadow-sm`}>
                 <IconComponent className="w-5 h-5" />
               </div>
               <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                 existing[key]?.length > 0 
                   ? 'bg-green-100 text-green-700' 
                   : 'bg-gray-100 text-gray-500'
               }`}>
                 {existing[key]?.length || 0} files
               </span>
             </div>
             <h3 className="text-lg font-semibold text-gray-800 mb-4">{label}</h3>
             <div className="space-y-2">
               {existing[key]?.length > 0 ? (
                 existing[key].map((doc, docIndex) => (
                   <div 
                     key={doc._id} 
                     className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100"
                   >
                     {key === "cv" ? (
                       <a 
                         href={doc.url} 
                         target="_blank" 
                         rel="noreferrer" 
                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 font-medium transition-colors"
                       >
                         <FileText className="w-4 h-4" /> 
                         <span>{label} #{docIndex + 1}</span>
                       </a>
                     ) : (
                       <img 
                         src={doc.url} 
                         alt={label} 
                         className="w-10 h-10 object-cover rounded-lg border-2 border-white shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
                         onClick={() => window.open(doc.url, "_blank")}
                       />
                     )}
                     <button
                       onClick={() => window.open(doc.url, "_blank")}
                       className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                     >
                       <Eye className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                     </button>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-6">
                   <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                     <IconComponent className="w-5 h-5 text-gray-400" />
                   </div>
                   <p className="text-sm text-gray-500">No documents uploaded</p>
                 </div>
               )}
             </div>
           </motion.div>
         ))}
       </div>
     </motion.div>

     {/* Upload Form */}
     <motion.div 
       className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.4 }}
     >
       <div className="flex items-center gap-3 mb-6">
         <Upload className="w-6 h-6 text-blue-600" />
         <h2 className="text-2xl font-bold text-gray-800">
           Upload New Documents
         </h2>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {documentTypes.map(({ key, label, multiple, accept, icon: IconComponent, color }, index) => (
             <motion.div 
               key={key} 
               className="relative border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 transition-all duration-200 bg-gray-50 hover:bg-blue-50"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.1 }}
             >
               <div className="flex items-center gap-3 mb-4">
                 <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white shadow-sm`}>
                   <IconComponent className="w-5 h-5" />
                 </div>
                 <div>
                   <label className="text-lg font-semibold text-gray-800">{label}</label>
                   <p className="text-sm text-gray-500">
                     {accept.includes('image') ? 'Images only' : 'PDF, DOC, DOCX files'}
                     {multiple && ' (multiple files allowed)'}
                   </p>
                 </div>
               </div>

               {!multiple && previews[key] && (
                 <img 
                   src={previews[key]} 
                   alt="preview" 
                   className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-sm mb-4 mx-auto"
                 />
               )}

               {multiple && files[key]?.length > 0 && (
                 <div className="mb-4 flex items-center gap-2 text-sm text-blue-600 bg-blue-100 p-2 rounded-lg">
                   <FileText className="w-4 h-4" />
                   <span className="font-medium">{files[key].length} file{files[key].length !== 1 ? 's' : ''} selected</span>
                 </div>
               )}

               <input 
                 type="file" 
                 accept={accept} 
                 multiple={multiple} 
                 onChange={e => handleFileChange(e, key)} 
                 disabled={loading} 
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
               />

               <div className="flex flex-col items-center justify-center py-6 px-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                 <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                   <div className="p-2 bg-gray-100 rounded-full">
                     <Plus className="w-5 h-5" />
                   </div>
                   <span className="font-semibold">{files[key] ? 'Change files' : 'Choose files'}</span>
                 </div>
                 <p className="text-xs text-gray-500 mt-2 text-center">
                   Drag and drop or click to browse
                 </p>
               </div>
             </motion.div>
           ))}
         </div>

         <div className="flex justify-center">
           <motion.button 
             type="submit" 
             disabled={loading || Object.keys(files).length === 0} 
             className={`px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200 ${
               loading || Object.keys(files).length === 0
                 ? "bg-gray-400 cursor-not-allowed" 
                 : "bg-gradient-primary hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md"
             }`}
             whileHover={!loading && Object.keys(files).length > 0 ? { scale: 1.02 } : {}}
             whileTap={!loading && Object.keys(files).length > 0 ? { scale: 0.98 } : {}}
           >
             {loading ? (
               <div className="flex items-center gap-2">
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                 />
                 Uploading...
               </div>
             ) : (
               <div className="flex items-center gap-2">
                 <Upload className="w-4 h-4" />
                 Upload Documents
               </div>
             )}
           </motion.button>
         </div>
       </form>

       {/* Message Display */}
       <AnimatePresence>
         {message && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className={`flex items-center justify-center gap-3 p-4 rounded-xl font-semibold mt-6 ${
               message.includes("successful") 
                 ? "bg-green-50 text-green-700 border border-green-200" 
                 : "bg-red-50 text-red-700 border border-red-200"
             }`}
           >
             {message.includes("successful") ? (
               <CheckCircle className="w-5 h-5" />
             ) : (
               <AlertCircle className="w-5 h-5" />
             )}
             <span>{message}</span>
           </motion.div>
         )}
       </AnimatePresence>
     </motion.div>
   </div>
 );
};

export default Documents;