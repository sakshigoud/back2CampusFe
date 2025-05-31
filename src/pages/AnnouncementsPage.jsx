import { motion } from 'framer-motion';
import AnnouncementList from '../components/announcement/AnnouncementList';

const AnnouncementsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Announcements</h1>
          <p className="text-gray-600">
            Stay updated with the latest news and events from your alma mater
          </p>
        </div>
        
        <AnnouncementList />
      </motion.div>
    </div>
  );
};

export default AnnouncementsPage;