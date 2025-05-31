import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import { announcementService } from '../../services/announcementService';

const CreateAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      await announcementService.createAnnouncement(formData);
      navigate('/announcements');
    } catch (error) {
      setSubmitError(error.message || 'Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-sm max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Announcement</h2>
      
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md flex items-start">
          <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            id="title"
            name="title"
            label="Announcement Title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter announcement title"
            error={errors.title}
            required
          />
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="description" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter announcement description"
            rows={6}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all ${
              errors.description 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Announcement'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/announcements')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateAnnouncementForm;