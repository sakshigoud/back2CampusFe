import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-blue-500 mb-4 inline-block">
              Back2Campus
            </Link>
            <p className="text-gray-600 mt-2 mb-4 max-w-md">
              Connecting alumni with their alma mater and fellow graduates. Stay updated with campus news and networking opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} Back2Campus. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center mt-2 md:mt-0">
              Made with <FiHeart className="text-red-500 mx-1" /> for alumni
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;