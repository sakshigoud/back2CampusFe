import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiBriefcase, FiPhone, FiAlertCircle } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { departmentService } from '../../services/departmentService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    batch: '',
    department: '',
    job_title: '',
    phone: '',
  });
  
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments();
        if (response.success) {
          setDepartments(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchDepartments();
  }, []);

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
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Batch validation
    if (!formData.batch) {
      newErrors.batch = 'Batch year is required';
    }
    
    // Department validation
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    
    if (!validate()) return;
    
    // Create registration data object (excluding confirmPassword)
    const { confirmPassword, ...registrationData } = formData;
    
    setLoading(true);
    try {
      await register(registrationData);
      navigate('/');
    } catch (error) {
      setRegisterError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
      
      {registerError && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md flex items-start">
          <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
          <span>{registerError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            required
            icon={<FiUser />}
          />
        </div>
        
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            error={errors.email}
            required
            icon={<FiMail />}
          />
        </div>
        
        <div className="mb-4">
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            required
            icon={<FiLock />}
          />
        </div>
        
        <div className="mb-4">
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.confirmPassword}
            required
            icon={<FiLock />}
          />
        </div>
        
        <div className="mb-4">
          <Input
            type="text"
            id="batch"
            name="batch"
            label="Batch Year"
            value={formData.batch}
            onChange={handleChange}
            placeholder="2020-2024"
            error={errors.batch}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all ${
              errors.department ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-500">{errors.department}</p>
          )}
        </div>
        
        <div className="mb-4">
          <Input
            type="text"
            id="job_title"
            name="job_title"
            label="Job Title"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="Software Engineer"
            icon={<FiBriefcase />}
          />
        </div>
        
        <div className="mb-6">
          <Input
            type="tel"
            id="phone"
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
            icon={<FiPhone />}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="mb-4"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterForm;