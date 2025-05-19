
import React from 'react';

interface CrawlingProgressProps {
  text?: string;
  className?: string;
}

export const CrawlingIndicator: React.FC<CrawlingProgressProps> = ({ 
  text = "CRAWLING", 
  className = "" 
}) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <span className=" text-yellow-500">{text}</span>
      
      <div className="flex space-x-1">
        <span 
          className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
          style={{
            animation: 'dot-pulse 1.5s infinite',
            animationDelay: '0s'
          }}
        />
        <span 
          className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
          style={{
            animation: 'dot-pulse 1.5s infinite',
            animationDelay: '0.5s'
          }}
        />
        <span 
          className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
          style={{
            animation: 'dot-pulse 1.5s infinite',
            animationDelay: '1s'
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes dot-pulse {
          0%, 20% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          80%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};