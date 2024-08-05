import React, { useEffect, useState } from 'react';

type AlertProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};

const Alert: React.FC<AlertProps> = ({ message, type = 'info', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 rounded ${typeStyles[type]}`}>
      {message}
    </div>
  );
};

export default Alert;
