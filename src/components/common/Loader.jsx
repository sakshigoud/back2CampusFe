import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Loader = ({ size = 'medium', color = 'blue', fullScreen = false }) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };
  
  const colorMap = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    orange: 'border-orange-500',
    gray: 'border-gray-500',
  };
  
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  const loader = (
    <div className="flex justify-center items-center">
      <motion.div
        className={`rounded-full border-4 border-t-transparent ${colorMap[color]} ${sizeMap[size]}`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['blue', 'purple', 'orange', 'gray']),
  fullScreen: PropTypes.bool,
};

export default Loader;