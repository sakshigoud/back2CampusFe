import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiUser, FiBriefcase, FiMail, FiPhone, FiCalendar, FiBook } from 'react-icons/fi';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import { departmentService } from '../../services/departmentService';

const ProfileDetail = () => {
  const { currentUser, updateProfile, loading } = useAuth();
  const [department, setDepartment] = useState(null);
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    job_title: '',
    phone: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        job_title: currentUser.job_title || '',
        phone: currentUser.phone || '',
      });

      // Fetch department details if department ID exists
      if (currentUser.department && typeof currentUser.department === 'string') {
        fetchDepartmentDetails(currentUser.department);
      } else if (currentUser.department && currentUser.department._id) {
        setDepartment(currentUser.department);
      }
    }
  }, [currentUser]);

  const fetchDepartmentDetails = async (departmentId) => {
    setDepartmentLoading(true);
    try {
      const response = await departmentService.getDepartmentById(departmentId);
      if (response.success) {
        setDepartment(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch department details:', error);
    } finally {
      setDepartmentLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 md:h-48 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md">
              <FiUser className="text-blue-500" size={48} />
            </div>
          </div>
        </div>

        <div className="pt-20 p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="job_title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {currentUser.name}
                  </h1>
                  {currentUser.job_title && (
                    <p className="text-gray-600 mt-1 flex items-center">
                      <FiBriefcase className="mr-2" />
                      {currentUser.job_title}
                    </p>
                  )}
                </div>
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline"
                  size="small"
                >
                  <FiEdit2 className="mr-2" /> Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiMail className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                      <p className="text-gray-800">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiPhone className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="text-gray-800">{currentUser.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiCalendar className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Batch</h3>
                      <p className="text-gray-800">{currentUser.batch}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiBook className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Department</h3>
                      {departmentLoading ? (
                        <Loader size="small" />
                      ) : department ? (
                        <p className="text-gray-800">{department.name} ({department.code})</p>
                      ) : (
                        <p className="text-gray-800">Not available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetail;