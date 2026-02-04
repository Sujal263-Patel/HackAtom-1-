
'use client';

import { useState } from 'react';

export default function SectorApplications() {
  const [selectedSector, setSelectedSector] = useState('medicine');

  const sectors = {
    medicine: {
      title: 'Medical Applications',
      icon: 'ri-heart-pulse-line',
      color: 'red',
      marketSize: '$8.2 billion',
      growth: '7.8%',
      applications: [
        {
          name: 'Cancer Treatment',
          isotope: 'Cobalt-60, Iridium-192',
          impact: '85% cure rate for early-stage cancers',
          economics: 'Treatment costs 60% lower than surgery',
          patients: '2.5 million annually'
        },
        {
          name: 'Medical Imaging',
          isotope: 'Technetium-99m',
          impact: '30 million procedures yearly',
          economics: 'Reduces diagnostic time by 75%',
          patients: '1 in 7 people globally'
        },
        {
          name: 'Thyroid Treatment',
          isotope: 'Iodine-131',
          impact: '95% success rate',
          economics: 'Outpatient treatment saves $15,000 per patient',
          patients: '150,000 annually'
        }
      ]
    },
    agriculture: {
      title: 'Agricultural Applications',
      icon: 'ri-plant-line',
      color: 'green',
      marketSize: '$2.4 billion',
      growth: '12.5%',
      applications: [
        {
          name: 'Food Irradiation',
          isotope: 'Cobalt-60, Cesium-137',
          impact: 'Extends shelf life by 300%',
          economics: 'Reduces food waste by $400 billion globally',
          patients: '500,000 tons processed'
        },
        {
          name: 'Pest Control',
          isotope: 'Sterile Insect Technique',
          impact: '90% reduction in targeted pests',
          economics: 'Saves $2.5 billion in crop protection',
          patients: '200 million hectares protected'
        },
        {
          name: 'Soil Analysis',
          isotope: 'Neutron activation',
          impact: 'Precise nutrient mapping',
          economics: 'Increases crop yields by 25%',
          patients: '50 million soil samples'
        }
      ]
    },
    industry: {
      title: 'Industrial Applications',
      icon: 'ri-hammer-line',
      color: 'blue',
      marketSize: '$4.1 billion',
      growth: '6.2%',
      applications: [
        {
          name: 'Non-Destructive Testing',
          isotope: 'Cobalt-60, Iridium-192',
          impact: '99.5% defect detection rate',
          economics: 'Prevents $50 billion in infrastructure failures',
          patients: '10 million inspections'
        },
        {
          name: 'Material Gauging',
          isotope: 'Cesium-137, Americium-241',
          impact: 'Real-time thickness measurement',
          economics: 'Reduces material waste by 15%',
          patients: '1 million gauges deployed'
        },
        {
          name: 'Pipeline Inspection',
          isotope: 'Selenium-75',
          impact: 'Detects corrosion before failure',
          economics: 'Saves $20 billion in leak prevention',
          patients: '500,000 km inspected'
        }
      ]
    },
    space: {
      title: 'Space Technology',
      icon: 'ri-rocket-line',
      color: 'purple',
      marketSize: '$850 million',
      growth: '15.3%',
      applications: [
        {
          name: 'Radioisotope Power',
          isotope: 'Plutonium-238',
          impact: '30+ year power source',
          economics: 'Enables $50 billion space missions',
          patients: '45 active spacecraft'
        },
        {
          name: 'Deep Space Missions',
          isotope: 'Multi-Mission RTG',
          impact: 'Powers Voyager, Cassini, Curiosity',
          economics: 'ROI of 7:1 on scientific discoveries',
          patients: '15 major missions'
        },
        {
          name: 'Satellite Systems',
          isotope: 'Strontium-90',
          impact: 'Remote sensing capabilities',
          economics: 'Supports $300 billion satellite industry',
          patients: '2,000+ satellites'
        }
      ]
    }
  };

  const currentSector = sectors[selectedSector];

  return (
    <div className="space-y-8">
      {/* Sector Navigation */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Sector Applications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(sectors).map(([key, sector]) => (
            <button
              key={key}
              onClick={() => setSelectedSector(key)}
              className={`p-6 rounded-xl transition-all transform hover:scale-105 cursor-pointer ${
                selectedSector === key
                  ? `bg-${sector.color}-500 text-white shadow-lg`
                  : `bg-${sector.color}-50 text-${sector.color}-700 hover:bg-${sector.color}-100`
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                selectedSector === key
                  ? 'bg-white/20'
                  : `bg-${sector.color}-500`
              }`}>
                <i className={`${sector.icon} text-xl ${
                  selectedSector === key ? 'text-white' : 'text-white'
                }`}></i>
              </div>
              <div className="font-semibold text-sm">{sector.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sector Overview */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center mb-6">
          <div className={`w-16 h-16 bg-${currentSector.color}-500 rounded-xl flex items-center justify-center mr-4`}>
            <i className={`${currentSector.icon} text-2xl text-white`}></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{currentSector.title}</h3>
            <p className="text-gray-600">Market Impact & Economic Analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{currentSector.marketSize}</div>
            <div className="text-gray-600">Market Size (2024)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{currentSector.growth}</div>
            <div className="text-gray-600">Annual Growth Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{currentSector.applications.length}</div>
            <div className="text-gray-600">Key Applications</div>
          </div>
        </div>
      </div>

      {/* Applications Detail */}
      <div className="space-y-6">
        {currentSector.applications.map((app, index) => (
          <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{app.name}</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 bg-${currentSector.color}-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                      <i className="ri-radioactive-line text-sm text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Isotope Used</div>
                      <div className="text-gray-600">{app.isotope}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 bg-${currentSector.color}-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                      <i className="ri-trophy-line text-sm text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Impact</div>
                      <div className="text-gray-600">{app.impact}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 bg-${currentSector.color}-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                      <i className="ri-money-dollar-circle-line text-sm text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Economic Benefit</div>
                      <div className="text-gray-600">{app.economics}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 bg-${currentSector.color}-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                      <i className="ri-bar-chart-line text-sm text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Scale</div>
                      <div className="text-gray-600">{app.patients}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h5 className="text-lg font-semibold text-gray-900 mb-4">Real-World Example</h5>
                <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://readdy.ai/api/search-image?query=${
                      selectedSector === 'medicine' ? 'Modern medical nuclear imaging scanner in hospital, patient undergoing nuclear medicine procedure, high-tech medical equipment, clean clinical environment with advanced technology displays and monitoring systems' :
                      selectedSector === 'agriculture' ? 'Food irradiation facility with gamma ray equipment, agricultural products being processed for preservation, modern food safety technology, industrial food processing plant with nuclear sterilization equipment' :
                      selectedSector === 'industry' ? 'Industrial non-destructive testing with radiography equipment, pipeline inspection using nuclear technology, quality control in manufacturing with isotope gauging systems, modern industrial facility' :
                      'Space mission radioisotope thermoelectric generator powering deep space probe, nuclear power system on Mars rover, space technology with nuclear energy source, advanced spacecraft systems'
                    }&width=400&height=250&seq=${selectedSector}-${index}&orientation=landscape`}
                    alt={app.name}
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  {selectedSector === 'medicine' && "Nuclear medicine procedures provide precise diagnosis and treatment with minimal invasive procedures, revolutionizing patient care."}
                  {selectedSector === 'agriculture' && "Food irradiation technology extends shelf life while maintaining nutritional value, reducing global food waste significantly."}
                  {selectedSector === 'industry' && "Radiographic testing ensures infrastructure safety and quality, preventing costly failures and maintaining industrial standards."}
                  {selectedSector === 'space' && "Radioisotope power systems enable long-duration space missions, powering scientific instruments for decades in extreme environments."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
