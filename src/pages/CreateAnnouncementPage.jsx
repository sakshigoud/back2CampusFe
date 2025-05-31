import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CreateAnnouncementForm from '../components/announcement/CreateAnnouncementForm';
import { useAuth } from '../contexts/AuthContext';

const CreateAnnouncementPage = () => {
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
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Announcement</h1>
          <p className="text-gray-600">
            Share important news and updates with the alumni community
          </p>
        </div>
        
        <CreateAnnouncementForm />
      </motion.div>
    </div>
  );
};

export default CreateAnnouncementPage;