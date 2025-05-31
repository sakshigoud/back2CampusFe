import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Card from '../common/Card';

const AnnouncementCard = ({ announcement }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card hoverable className="p-0 overflow-hidden">
      <Link to={`/announcements/${announcement._id}`}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {announcement.title}
          </h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              <span>{formatDate(announcement.created_at)}</span>
            </div>
            
            {announcement.author && (
              <div className="flex items-center">
                <FiUser className="mr-1" />
                <span>{announcement.author.name}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 line-clamp-3">
            {announcement.description}
          </p>
          
          <motion.div
            className="mt-4 text-blue-500 font-medium text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Read more &rarr;
          </motion.div>
        </div>
      </Link>
    </Card>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AnnouncementCard;