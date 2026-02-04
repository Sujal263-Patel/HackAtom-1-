'use client';

import React from 'react';
import { Isotope } from '../../types/quiz';
import { PeriodicTableCard } from './PeriodicTableCard';

interface AtomicDiagramProps {
  isotope: Isotope;
  animated?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const AtomicDiagram: React.FC<AtomicDiagramProps> = ({ 
  isotope, 
  animated = true, 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const particleSizes = {
    small: { proton: 2, neutron: 2, electron: 1 },
    medium: { proton: 3, neutron: 3, electron: 1.5 },
    large: { proton: 4, neutron: 4, electron: 2 }
  };

  const particles = particleSizes[size];

  // Calculate electron shell positions
  const getElectronShells = (atomicNumber: number) => {
    const shells = [];
    let remaining = atomicNumber;
    const shellCapacities = [2, 8, 18, 32, 32, 18, 8];
    
    for (let i = 0; i < shellCapacities.length && remaining > 0; i++) {
      const electronsInShell = Math.min(remaining, shellCapacities[i]);
      shells.push({
        radius: 20 + (i * 15),
        electrons: electronsInShell
      });
      remaining -= electronsInShell;
    }
    
    return shells;
  };

  const electronShells = getElectronShells(isotope.atomicNumber);

  // Generate nucleus particles positions
  const generateNucleusParticles = () => {
    const particles = [];
    const totalParticles = isotope.atomicNumber + isotope.neutrons;
    const nucleusRadius = Math.max(8, Math.sqrt(totalParticles) * 2);
    
    // Add protons
    for (let i = 0; i < isotope.atomicNumber; i++) {
      const angle = (i / isotope.atomicNumber) * 2 * Math.PI;
      const radius = ((i * 37) % 100) / 100 * nucleusRadius; // Deterministic radius
      particles.push({
        type: 'proton',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        id: `proton-${i}`
      });
    }
    
    // Add neutrons
    for (let i = 0; i < isotope.neutrons; i++) {
      const angle = (i / isotope.neutrons) * 2 * Math.PI + Math.PI;
      const radius = ((i * 23) % 100) / 100 * nucleusRadius; // Deterministic radius
      particles.push({
        type: 'neutron',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        id: `neutron-${i}`
      });
    }
    
    return particles;
  };

  const nucleusParticles = generateNucleusParticles();

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Periodic Table Card */}
      <PeriodicTableCard isotope={isotope} size="large" showDetails={false} />
      
      {/* Atomic Structure Diagram */}
      <div className={`relative ${sizeClasses[size]} mx-auto`}>
        <svg 
          className="w-full h-full" 
          viewBox="-100 -100 200 200"
          style={{ overflow: 'visible' }}
        >
          {/* Electron shells */}
          {electronShells.map((shell, shellIndex) => (
            <g key={`shell-${shellIndex}`}>
              {/* Shell orbit */}
              <circle
                cx="0"
                cy="0"
                r={shell.radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              
              {/* Electrons in this shell */}
              {Array.from({ length: shell.electrons }).map((_, electronIndex) => {
                const angle = (electronIndex / shell.electrons) * 2 * Math.PI;
                const x = Math.cos(angle) * shell.radius;
                const y = Math.sin(angle) * shell.radius;
                
                return (
                  <circle
                    key={`electron-${shellIndex}-${electronIndex}`}
                    cx={x}
                    cy={y}
                    r={particles.electron}
                    fill="#fbbf24"
                    className={animated ? 'animate-pulse' : ''}
                  >
                    {animated && (
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values={`0 0 0;360 0 0`}
                        dur={`${2 + shellIndex * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                );
              })}
            </g>
          ))}
          
          {/* Nucleus */}
          <g>
            {nucleusParticles.map((particle) => (
              <circle
                key={particle.id}
                cx={particle.x}
                cy={particle.y}
                r={particles[particle.type as keyof typeof particles]}
                fill={particle.type === 'proton' ? '#ef4444' : '#6b7280'}
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            ))}
          </g>
          
          {/* Nucleus label */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="4"
            fill="#1f2937"
            fontWeight="bold"
          >
            {isotope.elementSymbol}
          </text>
        </svg>
        
        {/* Legend */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Protons</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>Neutrons</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Electrons</span>
          </div>
        </div>
      </div>
      
      {/* Detailed Information */}
      <div className="bg-gray-50 rounded-lg p-4 max-w-md">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Protons:</span>
            <span className="ml-2 text-gray-800">{isotope.protons}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Neutrons:</span>
            <span className="ml-2 text-gray-800">{isotope.neutrons}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Electrons:</span>
            <span className="ml-2 text-gray-800">{isotope.electrons}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Mass Number:</span>
            <span className="ml-2 text-gray-800">{isotope.massNumber}</span>
          </div>
        </div>
        {isotope.decayType && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="font-medium text-gray-600">Decay Type:</span>
            <span className="ml-2 text-gray-800">{isotope.decayType}</span>
          </div>
        )}
      </div>
    </div>
  );
};
