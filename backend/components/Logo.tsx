import React from 'react';

const Logo = ({ className = 'h-16 w-16' }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <clipPath id="clip">
          <path d="M50,50 m-38,0 a38,38 0 1,0 76,0 a38,38 0 1,0 -76,0" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip)">
        <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" stroke="#2563EB" />
        <path d="M12 50 A 38 38, 0, 0, 1, 50 12" stroke="#16A34A" strokeWidth="10" fill="none" />
        <path d="M88 50 A 38 38, 0, 0, 1, 50 88" stroke="#F97316" strokeWidth="10" fill="none" />
      </g>
      <path
        d="M 50,22 a 10,10 0 1,0 0,0.01 z M 30,50 C 30,35 40,30 50,30 C 60,30 70,35 70,50 L 50 85 Z"
        fill="#2563EB"
      />
    </svg>
  );
};

export default Logo;