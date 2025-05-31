import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnnouncementCard from './AnnouncementCard';
import Pagination from '../common/Pagination';
import Loader from '../common/Loader';
import { announcementService } from '../../services/announcementService';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await announcementService.getPaginatedAnnouncements(currentPage, limit);
        if (response.success) {
          setAnnouncements(response.data);
          setTotalPages(response.pagination.total_pages);
        } else {
          setError('Failed to fetch announcements');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No announcements found</h3>
        <p className="text-gray-500">Check back later for updates</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {announcements.map((announcement) => (
          <motion.div key={announcement._id} variants={item}>
            <AnnouncementCard announcement={announcement} />
          </motion.div>
        ))}
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-8"
      />
    </div>
  );
};

export default AnnouncementList;