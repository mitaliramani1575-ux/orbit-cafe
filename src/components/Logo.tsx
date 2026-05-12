import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* The Orbit Ring */}
        <ellipse 
          cx="50" cy="50" rx="45" ry="15" 
          fill="none" 
          stroke="#C08457" 
          strokeWidth="1.5" 
          transform="rotate(-20 50 50)"
          className="opacity-80"
        />
        
        {/* The "O" */}
        <circle 
          cx="50" cy="50" r="30" 
          fill="none" 
          stroke="#E8B88A" 
          strokeWidth="4" 
        />
        
        {/* The Coffee Cup */}
        <path 
          d="M40 55 C 40 65, 60 65, 60 55 L 60 45 L 40 45 Z" 
          fill="#C08457" 
        />
        <path 
          d="M60 48 C 65 48, 65 52, 60 52" 
          fill="none" 
          stroke="#C08457" 
          strokeWidth="2" 
        />
        {/* Steam */}
        <path d="M45 40 Q 47 35, 45 30" fill="none" stroke="#E8B88A" strokeWidth="1" opacity="0.6" />
        <path d="M50 38 Q 52 33, 50 28" fill="none" stroke="#E8B88A" strokeWidth="1" opacity="0.6" />
        <path d="M55 40 Q 57 35, 55 30" fill="none" stroke="#E8B88A" strokeWidth="1" opacity="0.6" />

        {/* Stars */}
        <circle cx="20" cy="30" r="1.5" fill="#F5E6D3" />
        <circle cx="85" cy="40" r="1.2" fill="#F5E6D3" />
        <circle cx="75" cy="80" r="1.5" fill="#F5E6D3" />
      </svg>
    </div>
  );
}
