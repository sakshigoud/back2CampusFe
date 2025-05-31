import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiBriefcase } from 'react-icons/fi';
import Loader from '../common/Loader';
import { announcementService } from '../../services/announcementService';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncementDetail = async () => {
      setLoading(true);
      try {
        const response = await announcementService.getAnnouncementById(id);
        if (response.success) {
          setAnnouncement(response.data);
        } else {
          setError('Failed to fetch announcement details');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching announcement details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnouncementDetail();
    }
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        <Link
          to="/announcements"
          className="px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Announcements
        </Link>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Announcement not found</h3>
        <Link
          to="/announcements"
          className="px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center mt-4"
        >
          <FiArrowLeft className="mr-2" /> Back to Announcements
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/announcements"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Announcements
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {announcement.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              <span>{formatDate(announcement.created_at)}</span>
            </div>

            {announcement.author && (
              <>
                <div className="flex items-center">
                  <FiUser className="mr-1" />
                  <span>{announcement.author.name}</span>
                </div>

                {announcement.author.job_title && (
                  <div className="flex items-center">
                    <FiBriefcase className="mr-1" />
                    <span>{announcement.author.job_title}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">
              {announcement.description}
            </p>
          </div>

          {announcement.author && announcement.author.department && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Posted by:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">{announcement.author.name}</p>
                <p className="text-gray-600">{announcement.author.job_title}</p>
                <p className="text-gray-600">
                  {announcement.author.department.name} ({announcement.author.department.code})
                </p>
                <p className="text-gray-600">Batch: {announcement.author.batch}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementDetail;