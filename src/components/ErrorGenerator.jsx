import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ErrorGenerator = ({ errorMessage, onClose }) => {
  return (
    <div className="error-message bg-red-300 text-red-500 border border-red-300 p-4 rounded-lg flex justify-between items-center">
      <p className="font-bold">{errorMessage}</p>
      <div className="flex items-center md:ml-20">
        <FontAwesomeIcon 
          icon={faTimes} 
          className="cursor-pointer" 
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ErrorGenerator;
