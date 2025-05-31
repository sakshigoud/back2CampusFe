import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBell, FiUsers, FiBookOpen } from 'react-icons/fi';
import AnnouncementCard from '../components/announcement/AnnouncementCard';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { announcementService } from '../services/announcementService';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentAnnouncements = async () => {
      setLoading(true);
      try {
        // Only fetch 3 announcements for the homepage
        const response = await announcementService.getPaginatedAnnouncements(1, 3);
        if (response.success) {
          setAnnouncements(response.data);
        } else {
          setError('Failed to fetch announcements');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAnnouncements();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Welcome to Back2Campus
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Connect with your alma mater and fellow alumni. Stay updated with campus news and networking opportunities.
            </p>
            {isAuthenticated ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/announcements">
                  <Button variant="secondary" size="large">
                    <FiBell className="mr-2" /> View Announcements
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" size="large" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                    <FiUsers className="mr-2" /> My Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button variant="secondary" size="large">
                    Join Our Alumni Network
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="large" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Welcome Message */}
      {isAuthenticated && currentUser && (
        <section className="py-10 bg-blue-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Welcome back, {currentUser.name.split(' ')[0]}!
              </h2>
              <p className="text-gray-600">
                It's great to have you here. Stay connected with your alma mater and fellow alumni.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Announcements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Announcements
            </h2>
            <Link to="/announcements" className="text-blue-500 hover:text-blue-700 flex items-center">
              View All <span className="ml-1">&rarr;</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No announcements yet</h3>
              <p className="text-gray-500">Check back later for updates</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AnnouncementCard announcement={announcement} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">
            Why Join Our Alumni Network?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBell className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Stay Updated</h3>
              <p className="text-gray-600">
                Get the latest news, events, and announcements from your alma mater
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-purple-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Connect with Alumni</h3>
              <p className="text-gray-600">
                Network with fellow graduates and build professional connections
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBookOpen className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Access Resources</h3>
              <p className="text-gray-600">
                Get access to exclusive resources, events, and opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Join Our Alumni Community?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with your alma mater and fellow alumni today.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button variant="primary" size="large">
                    Create Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="large">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;