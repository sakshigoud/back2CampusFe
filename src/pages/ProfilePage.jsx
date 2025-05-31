import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileDetail from '../components/profile/ProfileDetail';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your alumni profile information
          </p>
        </div>
        
        <ProfileDetail />
      </motion.div>
    </div>
  );
};

export default ProfilePage;