'use client';

import React from 'react';
import { Isotope } from '../../types/quiz';

interface PeriodicTableCardProps {
  isotope: Isotope;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export const PeriodicTableCard: React.FC<PeriodicTableCardProps> = ({ 
  isotope, 
  size = 'medium',
  showDetails = true 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16 text-xs',
    medium: 'w-24 h-24 text-sm',
    large: 'w-32 h-32 text-base'
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'actinide': return 'from-purple-500 to-purple-600';
      case 'transition-metal': return 'from-amber-500 to-amber-600';
      case 'nonmetal': return 'from-emerald-500 to-emerald-600';
      case 'metalloid': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Periodic Table Element Card */}
      <div 
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${getCategoryColor(isotope.category)}
          text-white rounded-lg shadow-lg border-2 border-white
          flex flex-col justify-between p-2 relative
          transform hover:scale-105 transition-all duration-200
        `}
      >
        {/* Atomic Number */}
        <div className="text-xs font-bold text-left">
          {isotope.atomicNumber}
        </div>
        
        {/* Element Symbol */}
        <div className="text-center flex-1 flex items-center justify-center">
          <span className="font-bold text-lg leading-none">
            {isotope.elementSymbol}
          </span>
        </div>
        
        {/* Mass Number */}
        <div className="text-xs font-bold text-right">
          {isotope.massNumber}
        </div>
        
        {/* Isotope indicator */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
          !
        </div>
      </div>
      
      {/* Element Name and Details */}
      {showDetails && (
        <div className="text-center">
          <div className="font-semibold text-gray-800 text-sm">
            {isotope.name}
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {isotope.category.replace('-', ' ')}
          </div>
          {isotope.halfLife && (
            <div className="text-xs text-gray-500 mt-1">
              t½: {isotope.halfLife}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
