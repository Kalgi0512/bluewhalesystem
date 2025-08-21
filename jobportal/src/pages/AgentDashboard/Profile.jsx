import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Camera,
  MapPin,
  Calendar,
  Save,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    companyAddress: "",
    companyLogo: null,
  });
  const [originalFormData, setOriginalFormData] = useState(formData);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pictureFile, setPictureFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("/api/agent/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.data;
        setUser(userData);
        console.log("User data fetched:", userData);

        const newFormData = {
          companyName: userData.companyName || "",
          contactPerson: userData.contactPerson || userData.name || "",
          email: userData.email || "",
          phoneNumber: String(userData.phoneNumber || ""),
          companyAddress: userData.companyAddress || "",
          companyLogo: userData.companyLogo || null,
        };

        setFormData(newFormData);
        setOriginalFormData(newFormData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load profile");
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const getProfilePictureUrl = () => {
    if (!user?.companyLogo) return null;
    if (user.companyLogo.startsWith("http")) return user.companyLogo;
    return `http://localhost:5000/${user.companyLogo}`;
  };

  const profileFields = [
    { key: "companyName", label: "Company Name", icon: User },
    { key: "contactPerson", label: "Contact Person", icon: User },
    { key: "email", label: "Email", icon: Mail },
    { key: "phoneNumber", label: "Phone Number", icon: Phone },
    { key: "companyAddress", label: "Address", icon: MapPin },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("contactPerson", formData.contactPerson);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("companyAddress", formData.companyAddress);

      if (pictureFile) {
        formDataToSend.append("companyLogo", pictureFile);
      }

      const res = await axios.put(
        `/api/agent/update/${user._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            const percentCompleted = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      const updatedUser = res.data.data || res.data;
      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        companyLogo: updatedUser.companyLogo || prev.companyLogo,
      }));

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setOriginalFormData(formData);
      setIsEditing(false);
      setPictureFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl border border-red-200 shadow-2xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "-";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-6 p-4 md:p-6"
      >
        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-200 shadow-2xl p-4 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-blue-700 font-medium">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-3">
            My Profile
          </h1>
          <motion.div
            className="h-1 w-24 rounded-full mx-auto md:mx-0"
            style={{ 
              background: "linear-gradient(90deg, #1B3890, #0F79C5, #1B3890)" 
            }}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <p className="text-gray-600 mt-3 text-base">Manage your professional information</p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl overflow-hidden relative"
        >
          {/* Gradient Header */}
          <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="relative -mt-12 p-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-end gap-4 mb-6">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white to-gray-100 flex items-center justify-center overflow-hidden shadow-xl border-4 border-white">
                  {isEditing && profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : user?.companyLogo ? (
                    <img
                      src={getProfilePictureUrl()}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <motion.button
                    onClick={triggerFileInput}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-indigo-500/90 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-6 h-6 text-white drop-shadow-lg" />
                  </motion.button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </motion.div>

              <div className="flex-1 md:text-left text-center md:ml-4">
                <motion.h2
                  className="text-2xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {user?.name}
                </motion.h2>
                <motion.div
                  className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Joined {joinDate}</span>
                </motion.div>
              </div>

              <motion.button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-xl flex items-center gap-2 group relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isEditing ? "save" : "edit"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isEditing ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                  {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
                </div>
              </motion.button>
            </div>

            {/* Profile Fields */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {profileFields.map((field, index) => (
                <motion.div
                  key={field.key}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div 
                        className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <field.icon className="w-4 h-4 text-blue-600 group-hover:text-indigo-600 transition-colors" />
                      </motion.div>
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {field.label}
                      </label>
                    </div>
                    
                    {isEditing ? (
                      <input
                        type={field.key === "email" ? "email" : field.key === "phoneNumber" ? "tel" : "text"}
                        value={formData[field.key]}
                        onChange={(e) => handleInputChange(e, field.key)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 text-gray-800 font-medium transition-all duration-300"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <div className="px-3 py-2 bg-white/60 rounded-lg border border-gray-200 min-h-[40px] flex items-center">
                        <span className="text-gray-800 font-medium">
                          {formData[field.key] || (
                            <span className="text-gray-400 italic">Not provided</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Upload Progress */}
            <AnimatePresence>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-blue-700 font-medium">Uploading... {uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cancel Button for Edit Mode */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  className="flex justify-center mt-6 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => {
                      setFormData(originalFormData);
                      setIsEditing(false);
                      setProfileImage(null);
                      setPictureFile(null);
                    }}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                    Cancel Changes
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;