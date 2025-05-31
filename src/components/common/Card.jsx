import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm overflow-hidden';
  
  const classes = [
    baseClasses,
    hoverable ? 'hover:shadow-md transition-shadow duration-300' : '',
    className,
  ].join(' ');

  const cardVariants = {
    hover: { y: -5, transition: { duration: 0.2 } },
    tap: { y: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hoverable ? 'hover' : undefined}
      whileTap={hoverable && onClick ? 'tap' : undefined}
      variants={cardVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
};

export default Card;