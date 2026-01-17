import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Head & Cap */}
      <path 
        d="M100 80C125 80 145 60 145 35H55C55 60 75 80 100 80Z" 
        fill="white" 
        stroke={color} 
        strokeWidth="4" 
      />
      <circle cx="100" cy="85" r="45" stroke={color} strokeWidth="4" fill="white" />
      
      {/* Eyes and Smile */}
      <circle cx="85" cy="85" r="4" fill={color} />
      <circle cx="115" cy="85" r="4" fill={color} />
      <path d="M90 105C90 105 100 112 110 105" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Body / Thobe */}
      <path 
        d="M60 130L50 170H150L140 130H60Z" 
        fill="white" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinejoin="round" 
      />
      <path d="M100 130V170" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Arms */}
      <path d="M60 135L40 160" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M140 135L160 160" stroke={color} strokeWidth="4" strokeLinecap="round" />

      {/* Rehal (Quran Stand) */}
      <path 
        d="M70 185L130 155M130 185L70 155" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round" 
      />
      
      {/* Quran (Open Book) */}
      <path 
        d="M75 160C85 150 115 150 125 160" 
        stroke={color} 
        strokeWidth="4" 
        fill="white" 
      />
      <path d="M100 155V165" stroke={color} strokeWidth="2" />
      
      {/* Prayer Mat Base */}
      <path 
        d="M40 190H160C170 190 180 180 180 170V170M40 190C30 190 20 180 20 170V170" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default Logo;