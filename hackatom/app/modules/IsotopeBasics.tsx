
'use client';

import { useState } from 'react';

export default function IsotopeBasics() {
  const [selectedElement, setSelectedElement] = useState(null);

  const importantIsotopes = [
    { symbol: 'Tc-99m', name: 'Technetium-99m', uses: 'Medical imaging', color: 'bg-red-500' },
    { symbol: 'Co-60', name: 'Cobalt-60', uses: 'Cancer treatment', color: 'bg-red-600' },
    { symbol: 'I-131', name: 'Iodine-131', uses: 'Thyroid treatment', color: 'bg-purple-500' },
    { symbol: 'Cs-137', name: 'Cesium-137', uses: 'Industrial gauging', color: 'bg-blue-500' },
    { symbol: 'Am-241', name: 'Americium-241', uses: 'Smoke detectors', color: 'bg-green-500' },
    { symbol: 'Sr-90', name: 'Strontium-90', uses: 'Medical devices', color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Isotopes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What Are Isotopes?</h3>
            <p className="text-gray-600 mb-4">
              Isotopes are variants of chemical elements that have the same number of protons 
              but different numbers of neutrons. This difference in neutron count gives each 
              isotope unique properties, making them valuable for specific applications.
            </p>
            <p className="text-gray-600">
              Radioisotopes are unstable isotopes that emit radiation as they decay, 
              providing energy that can be harnessed for medical, industrial, and research purposes.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Properties</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                Same chemical behavior
              </li>
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                Different physical properties
              </li>
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                Controlled radiation emission
              </li>
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                Predictable half-life
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Production Methods */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">How Are Isotopes Produced?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-flashlight-line text-2xl text-white"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Nuclear Reactors</h4>
            <p className="text-gray-600 text-sm">
              Most common method using neutron bombardment in research reactors
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-speed-line text-2xl text-white"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Particle Accelerators</h4>
            <p className="text-gray-600 text-sm">
              High-energy particles create isotopes through nuclear reactions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-recycle-line text-2xl text-white"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Separation</h4>
            <p className="text-gray-600 text-sm">
              Extracting isotopes from nuclear fuel cycle byproducts
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Periodic Table */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Important Isotopes by Application</h3>
        <p className="text-gray-600 mb-6">Click on an isotope to learn more about its uses and economic impact</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {importantIsotopes.map((isotope) => (
            <button
              key={isotope.symbol}
              onClick={() => setSelectedElement(isotope)}
              className={`${isotope.color} hover:opacity-80 text-white p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer`}
            >
              <div className="text-xl font-bold mb-1">{isotope.symbol}</div>
              <div className="text-sm opacity-90">{isotope.uses}</div>
            </button>
          ))}
        </div>

        {selectedElement && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{selectedElement.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Primary Uses:</h5>
                <p className="text-gray-600 mb-4">{selectedElement.uses}</p>
                <h5 className="font-semibold text-gray-900 mb-2">Economic Impact:</h5>
                <p className="text-gray-600">
                  {selectedElement.symbol === 'Tc-99m' && "Used in 80% of nuclear medicine procedures worldwide, with annual market value exceeding $2 billion."}
                  {selectedElement.symbol === 'Co-60' && "Essential for cancer treatment, sterilization industry worth $6 billion annually."}
                  {selectedElement.symbol === 'I-131' && "Thyroid treatment market valued at $500 million, growing 8% yearly."}
                  {selectedElement.symbol === 'Cs-137' && "Industrial applications generate $300 million in annual revenue."}
                  {selectedElement.symbol === 'Am-241' && "Smoke detector industry uses worth $150 million annually."}
                  {selectedElement.symbol === 'Sr-90' && "Medical device power sources market worth $200 million."}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Production Stats:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Production:</span>
                    <span className="font-medium">
                      {selectedElement.symbol === 'Tc-99m' && "15 million Ci"}
                      {selectedElement.symbol === 'Co-60' && "75,000 Ci"}
                      {selectedElement.symbol === 'I-131' && "500,000 Ci"}
                      {selectedElement.symbol === 'Cs-137' && "25,000 Ci"}
                      {selectedElement.symbol === 'Am-241' && "5,000 Ci"}
                      {selectedElement.symbol === 'Sr-90' && "10,000 Ci"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Half-life:</span>
                    <span className="font-medium">
                      {selectedElement.symbol === 'Tc-99m' && "6 hours"}
                      {selectedElement.symbol === 'Co-60' && "5.3 years"}
                      {selectedElement.symbol === 'I-131' && "8 days"}
                      {selectedElement.symbol === 'Cs-137' && "30 years"}
                      {selectedElement.symbol === 'Am-241' && "432 years"}
                      {selectedElement.symbol === 'Sr-90' && "29 years"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per Ci:</span>
                    <span className="font-medium">
                      {selectedElement.symbol === 'Tc-99m' && "$150"}
                      {selectedElement.symbol === 'Co-60' && "$1,000"}
                      {selectedElement.symbol === 'I-131' && "$200"}
                      {selectedElement.symbol === 'Cs-137' && "$500"}
                      {selectedElement.symbol === 'Am-241' && "$1,500"}
                      {selectedElement.symbol === 'Sr-90' && "$2,000"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
