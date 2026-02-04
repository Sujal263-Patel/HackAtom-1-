import { Isotope, Question } from '../types/quiz';

export const isotopes: Isotope[] = [
  {
    symbol: 'U-235',
    name: 'Uranium-235',
    elementSymbol: 'U',
    atomicNumber: 92,
    massNumber: 235,
    neutrons: 143,
    protons: 92,
    electrons: 92,
    halfLife: '704 million years',
    decayType: 'Alpha decay',
    applications: ['Nuclear fuel', 'Nuclear weapons', 'Medical isotopes production'],
    category: 'actinide',
    color: '#8B5CF6'
  },
  {
    symbol: 'U-238',
    name: 'Uranium-238',
    elementSymbol: 'U',
    atomicNumber: 92,
    massNumber: 238,
    neutrons: 146,
    protons: 92,
    electrons: 92,
    halfLife: '4.5 billion years',
    decayType: 'Alpha decay',
    applications: ['Nuclear fuel breeding', 'Depleted uranium', 'Dating rocks'],
    category: 'actinide',
    color: '#8B5CF6'
  },
  {
    symbol: 'Pu-239',
    name: 'Plutonium-239',
    elementSymbol: 'Pu',
    atomicNumber: 94,
    massNumber: 239,
    neutrons: 145,
    protons: 94,
    electrons: 94,
    halfLife: '24,100 years',
    decayType: 'Alpha decay',
    applications: ['Nuclear fuel', 'Nuclear weapons', 'Space missions'],
    category: 'actinide',
    color: '#8B5CF6'
  },
  {
    symbol: 'C-14',
    name: 'Carbon-14',
    elementSymbol: 'C',
    atomicNumber: 6,
    massNumber: 14,
    neutrons: 8,
    protons: 6,
    electrons: 6,
    halfLife: '5,730 years',
    decayType: 'Beta decay',
    applications: ['Radiocarbon dating', 'Medical tracers', 'Archaeological dating'],
    category: 'nonmetal',
    color: '#10B981'
  },
  {
    symbol: 'I-131',
    name: 'Iodine-131',
    elementSymbol: 'I',
    atomicNumber: 53,
    massNumber: 131,
    neutrons: 78,
    protons: 53,
    electrons: 53,
    halfLife: '8.02 days',
    decayType: 'Beta decay',
    applications: ['Thyroid treatment', 'Medical imaging', 'Cancer therapy'],
    category: 'nonmetal',
    color: '#10B981'
  },
  {
    symbol: 'Tc-99m',
    name: 'Technetium-99m',
    elementSymbol: 'Tc',
    atomicNumber: 43,
    massNumber: 99,
    neutrons: 56,
    protons: 43,
    electrons: 43,
    halfLife: '6.01 hours',
    decayType: 'Gamma decay',
    applications: ['Medical imaging', 'Nuclear medicine', 'SPECT scans'],
    category: 'transition-metal',
    color: '#F59E0B'
  },
  {
    symbol: 'Co-60',
    name: 'Cobalt-60',
    elementSymbol: 'Co',
    atomicNumber: 27,
    massNumber: 60,
    neutrons: 33,
    protons: 27,
    electrons: 27,
    halfLife: '5.27 years',
    decayType: 'Beta decay',
    applications: ['Cancer therapy', 'Food irradiation', 'Industrial radiography'],
    category: 'transition-metal',
    color: '#F59E0B'
  },
  {
    symbol: 'Ra-226',
    name: 'Radium-226',
    elementSymbol: 'Ra',
    atomicNumber: 88,
    massNumber: 226,
    neutrons: 138,
    protons: 88,
    electrons: 88,
    halfLife: '1,600 years',
    decayType: 'Alpha decay',
    applications: ['Historical medical treatments', 'Neutron sources', 'Research'],
    category: 'actinide',
    color: '#8B5CF6'
  }
];

export const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Which element symbol represents Uranium in the periodic table?',
    options: ['U', 'Ur', 'Un', 'Ua'],
    correctAnswer: 0,
    explanation: 'Uranium is represented by the symbol "U" in the periodic table. It has atomic number 92 and is an actinide element.',
    isotope: isotopes[0],
    difficulty: 'easy'
  },
  {
    id: 2,
    type: 'identification',
    question: 'Which isotope is shown in the periodic table card and atomic diagram?',
    options: ['Uranium-235', 'Uranium-238', 'Plutonium-239', 'Carbon-14'],
    correctAnswer: 1,
    explanation: 'Uranium-238 has 92 protons and 146 neutrons. It is the most common isotope of uranium, making up about 99.3% of natural uranium.',
    isotope: isotopes[1],
    difficulty: 'medium'
  },
  {
    id: 3,
    type: 'properties',
    question: 'What is the half-life of Carbon-14?',
    options: ['5,730 years', '704 million years', '24,100 years', '8.02 days'],
    correctAnswer: 0,
    explanation: 'Carbon-14 has a half-life of 5,730 years, making it perfect for dating organic materials up to about 50,000 years old.',
    isotope: isotopes[3],
    difficulty: 'easy'
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Which element has the symbol "Tc" in the periodic table?',
    options: ['Titanium', 'Technetium', 'Tellurium', 'Thallium'],
    correctAnswer: 1,
    explanation: 'Technetium (Tc) is a transition metal with atomic number 43. It is the first artificially produced element.',
    isotope: isotopes[5],
    difficulty: 'medium'
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Which decay type does Plutonium-239 undergo?',
    options: ['Beta decay', 'Gamma decay', 'Alpha decay', 'Positron emission'],
    correctAnswer: 2,
    explanation: 'Plutonium-239 undergoes alpha decay, emitting an alpha particle (helium nucleus) and transforming into Uranium-235.',
    isotope: isotopes[2],
    difficulty: 'medium'
  },
  {
    id: 6,
    type: 'properties',
    question: 'What category does Cobalt-60 belong to in the periodic table?',
    options: ['Actinide', 'Nonmetal', 'Transition metal', 'Metalloid'],
    correctAnswer: 2,
    explanation: 'Cobalt-60 is a transition metal. Transition metals are found in the d-block of the periodic table and have partially filled d orbitals.',
    isotope: isotopes[6],
    difficulty: 'medium'
  },
  {
    id: 7,
    type: 'properties',
    question: 'How many neutrons does Iodine-131 have?',
    options: ['53', '78', '131', '184'],
    correctAnswer: 1,
    explanation: 'Iodine-131 has 78 neutrons (mass number 131 - atomic number 53 = 78 neutrons).',
    isotope: isotopes[4],
    difficulty: 'easy'
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: 'Which isotope is commonly used in medical imaging?',
    options: ['Uranium-238', 'Plutonium-239', 'Technetium-99m', 'Radium-226'],
    correctAnswer: 2,
    explanation: 'Technetium-99m is the most widely used medical radioisotope, ideal for imaging due to its short half-life and gamma emission.',
    isotope: isotopes[5],
    difficulty: 'medium'
  },
  {
    id: 9,
    type: 'properties',
    question: 'Which element has the highest atomic number among these isotopes?',
    options: ['Uranium-235', 'Plutonium-239', 'Radium-226', 'Cobalt-60'],
    correctAnswer: 1,
    explanation: 'Plutonium-239 has the highest atomic number at 94. Atomic number represents the number of protons in the nucleus.',
    isotope: isotopes[2],
    difficulty: 'hard'
  },
  {
    id: 10,
    type: 'identification',
    question: 'Which isotope with symbol "Ra" was historically used in medical treatments?',
    options: ['Radium-226', 'Radon-222', 'Rubidium-87', 'Rhenium-188'],
    correctAnswer: 0,
    explanation: 'Radium-226 (Ra) was historically used in medical treatments before its dangers were fully understood. It is highly radioactive with a 1,600-year half-life.',
    isotope: isotopes[7],
    difficulty: 'medium'
  },
  {
    id: 11,
    type: 'multiple-choice',
    question: 'Which category do most radioactive isotopes used in nuclear fuel belong to?',
    options: ['Nonmetals', 'Transition metals', 'Actinides', 'Metalloids'],
    correctAnswer: 2,
    explanation: 'Most nuclear fuel isotopes are actinides, including uranium and plutonium. Actinides are heavy elements with atomic numbers 89-103.',
    isotope: isotopes[7],
    difficulty: 'hard'
  },
  {
    id: 12,
    type: 'properties',
    question: 'What is the mass number of Carbon-14?',
    options: ['6', '8', '14', '20'],
    correctAnswer: 2,
    explanation: 'The mass number of Carbon-14 is 14, which represents the total number of protons and neutrons in the nucleus (6 protons + 8 neutrons = 14).',
    isotope: isotopes[3],
    difficulty: 'medium'
  }
];
