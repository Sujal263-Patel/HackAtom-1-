
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

interface UserProgress {
  level: number;
  xp: number;
  completedLevels: number[];
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [userProgress, setUserProgress] = useState<UserProgress>({ level: 1, xp: 0, completedLevels: [] });
  const [isReading, setIsReading] = useState<boolean>(false);

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Voice reading functionality
  const readText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const levels = {
    1: {
      name: "Nuclear Novice",
      questions: [
        {
          id: 1,
          question: "Which isotope is most commonly used in medical imaging procedures?",
          options: ["Technetium-99m", "Cobalt-60", "Iodine-131", "Uranium-235"],
          correct: 0,
          explanation: "Technetium-99m is used in 80% of nuclear medicine procedures due to its ideal half-life and imaging properties."
        },
        {
          id: 2,
          question: "What is the primary economic advantage of food irradiation?",
          options: ["Lower cost", "Faster processing", "No chemical residues and longer shelf life", "Better taste"],
          correct: 2,
          explanation: "Food irradiation leaves no chemical residues and extends shelf life by up to 300%, reducing food waste significantly."
        }
      ],
      reward: { xp: 100, badge: "First Steps", color: "bg-green-500" }
    },
    2: {
      name: "Isotope Explorer",
      questions: [
        {
          id: 3,
          question: "In industrial applications, what percentage of defects can radiographic testing detect?",
          options: ["85%", "92%", "99.5%", "100%"],
          correct: 2,
          explanation: "Radiographic testing using isotopes like Cobalt-60 can detect 99.5% of structural defects."
        },
        {
          id: 4,
          question: "Which space mission benefit demonstrates RTG systems' ROI?",
          options: ["Reduced weight", "30+ year operational life", "Faster travel", "Better communication"],
          correct: 1,
          explanation: "RTGs provide decades of reliable power, enabling missions like Voyager (45+ years) with ROI of 7:1."
        }
      ],
      reward: { xp: 200, badge: "Knowledge Seeker", color: "bg-blue-500" }
    },
    3: {
      name: "Nuclear Economist",
      questions: [
        {
          id: 5,
          question: "What is the annual market value of the global nuclear medicine industry?",
          options: ["$2.4 billion", "$4.1 billion", "$8.2 billion", "$12.5 billion"],
          correct: 2,
          explanation: "The nuclear medicine market is valued at $8.2 billion annually, growing at 7.8% per year."
        },
        {
          id: 6,
          question: "Which isotope production method is most cost-effective for medical applications?",
          options: ["Reactor production", "Cyclotron production", "Generator systems", "Accelerator production"],
          correct: 2,
          explanation: "Generator systems provide on-demand isotopes at medical facilities, reducing transportation costs."
        }
      ],
      reward: { xp: 300, badge: "Economic Expert", color: "bg-purple-500" }
    },
    4: {
      name: "Nuclear Master",
      questions: [
        {
          id: 7,
          question: "What percentage of global electricity could be powered by nuclear waste isotopes?",
          options: ["5%", "15%", "25%", "35%"],
          correct: 1,
          explanation: "Advanced isotope recovery could power 15% of global electricity needs from existing nuclear waste."
        },
        {
          id: 8,
          question: "Which emerging isotope market shows 20%+ annual growth?",
          options: ["Medical imaging", "Food irradiation", "Targeted radiotherapy", "Industrial gauging"],
          correct: 2,
          explanation: "Targeted radiotherapy using isotopes like Lutetium-177 is growing 20%+ annually due to precision cancer treatment."
        }
      ],
      reward: { xp: 500, badge: "Nuclear Master", color: "bg-gold-500" }
    }
  };

  const currentLevelData = levels[currentLevel as keyof typeof levels];
  const questions = currentLevelData?.questions || [];

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    
    // Update user progress
    const passThreshold = Math.ceil(questions.length * 0.7); // 70% to pass
    if (correctCount >= passThreshold) {
      const newXP = userProgress.xp + currentLevelData.reward.xp;
      const newCompletedLevels = [...userProgress.completedLevels, currentLevel];
      const newProgress = {
        level: Math.max(currentLevel + 1, userProgress.level),
        xp: newXP,
        completedLevels: newCompletedLevels
      };
      setUserProgress(newProgress);
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
    }
    
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const nextLevel = () => {
    if (currentLevel < Object.keys(levels).length) {
      setCurrentLevel(currentLevel + 1);
      resetQuiz();
    }
  };

  const getBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { name: "Perfect Score", color: "bg-gold-500", icon: "ri-trophy-fill" };
    if (percentage >= 70) return { name: "Level Passed", color: "bg-green-500", icon: "ri-medal-line" };
    return { name: "Try Again", color: "bg-gray-500", icon: "ri-refresh-line" };
  };

  if (showResults) {
    const badge = getBadge(score, questions.length);
    const passThreshold = Math.ceil(questions.length * 0.7);
    const passed = score >= passThreshold;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            {/* Level Progress */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Level {currentLevel}: {currentLevelData.name}</h2>
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-sm text-gray-600">XP: {userProgress.xp}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (userProgress.xp / 1000) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">Level {userProgress.level}</div>
              </div>
            </div>

            {/* Results */}
            <div className={`w-24 h-24 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <i className={`${badge.icon} text-3xl text-white`}></i>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {passed ? 'Level Complete!' : 'Level Failed'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              You scored {score} out of {questions.length} questions correctly
            </p>

            {passed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 ${currentLevelData.reward.color} rounded-full flex items-center justify-center`}>
                    <i className="ri-gift-line text-2xl text-white"></i>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Reward Earned!</h3>
                <p className="text-green-700 mb-2">Badge: {currentLevelData.reward.badge}</p>
                <p className="text-green-700">XP Gained: +{currentLevelData.reward.xp}</p>
              </div>
            )}
            
            <div className="space-y-6 text-left mb-8">
              {questions.map((q, index) => {
                const userAnswer = selectedAnswers[q.id];
                const isCorrect = userAnswer === q.correct;
                
                return (
                  <div key={q.id} className={`p-6 rounded-lg border-2 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                          <i className={`ri-${isCorrect ? 'check' : 'close'}-line text-white text-sm`}></i>
                        </div>
                        <h3 className="font-semibold text-gray-900">Question {index + 1}</h3>
                      </div>
                      <button
                        onClick={() => readText(q.question + '. ' + q.explanation)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                        title="Read aloud"
                      >
                        <i className="ri-volume-up-line text-sm"></i>
                      </button>
                    </div>
                    <p className="text-gray-700 mb-3">{q.question}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Your answer: <span className={isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                        {q.options[userAnswer]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 mb-2">
                        Correct answer: <span className="text-green-700 font-medium">{q.options[q.correct]}</span>
                      </p>
                    )}
                    <p className="text-sm text-gray-600 italic">{q.explanation}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {passed && currentLevel < Object.keys(levels).length && (
                <button
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                >
                  Next Level ({currentLevel + 1})
                </button>
              )}
              <button
                onClick={resetQuiz}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Retry Level
              </button>
              <Link href="/modules" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  if (!currentQ) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Level Header */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Level {currentLevel}: {currentLevelData.name}</h2>
              <p className="text-gray-600">Complete this level to unlock the next challenge</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Current XP</div>
              <div className="text-2xl font-bold text-indigo-600">{userProgress.xp}</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{userProgress.completedLevels.length}/{Object.keys(levels).length} levels completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(userProgress.completedLevels.length / Object.keys(levels).length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Nuclear Economics Quiz</h1>
            <div className="flex gap-2">
              <button
                onClick={() => readText(currentQ.question + '. ' + currentQ.options.join(', '))}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  isReading ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <i className={`ri-${isReading ? 'stop' : 'volume-up'}-line mr-2`}></i>
                {isReading ? 'Stop' : 'Read'}
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQ.id] === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQ.id] === index
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQ.id] === index && (
                        <i className="ri-check-line text-xs text-white"></i>
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white hover:bg-green-700 whitespace-nowrap"
              >
                Complete Level
                <i className="ri-send-plane-line ml-2"></i>
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className="px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700 whitespace-nowrap"
              >
                Next
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
