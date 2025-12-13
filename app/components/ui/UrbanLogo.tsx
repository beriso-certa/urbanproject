import React from 'react';

const UrbanLogo = ({ className = '' }) => (
  <svg 
    className={className}
    width="40" 
    height="40" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Urban Logo"
  >
    <rect x="20" y="20" width="60" height="60" rx="4" className="fill-current" />
    <path d="M40 40H60V60H40V40Z" className="fill-black" />
    <path d="M40 70H60V90H40V70Z" className="fill-black" />
    <path d="M70 40H90V60H70V40Z" className="fill-black" />
  </svg>
);

export default UrbanLogo;
