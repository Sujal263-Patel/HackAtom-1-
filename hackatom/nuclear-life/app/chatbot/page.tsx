
'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Welcome message
    setMessages([{
      id: 1,
      text: "Hello! I'm your AI assistant for nuclear technology and isotopes. Ask me anything about isotope applications, costs, safety, manufacturing, or any nuclear technology topics!",
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const knowledgeBase = {
    isotopes: {
      'tc-99m': {
        name: 'Technetium-99m',
        halfLife: '6 hours',
        uses: 'Medical imaging, SPECT scans',
        cost: '$150/Ci',
        production: 'Nuclear reactors',
        safety: 'Low radiation, short half-life',
        applications: ['Heart imaging', 'Bone scans', 'Brain imaging']
      },
      'co-60': {
        name: 'Cobalt-60',
        halfLife: '5.3 years',
        uses: 'Cancer treatment, sterilization',
        cost: '$1000/Ci',
        production: 'Nuclear reactors',
        safety: 'High energy gamma rays',
        applications: ['Radiotherapy', 'Food sterilization', 'Medical device sterilization']
      },
      'i-131': {
        name: 'Iodine-131',
        halfLife: '8 days',
        uses: 'Thyroid treatment',
        cost: '$200/Ci',
        production: 'Fission products',
        safety: 'Beta and gamma radiation',
        applications: ['Thyroid cancer', 'Hyperthyroidism', 'Thyroid ablation']
      },
      'pu-238': {
        name: 'Plutonium-238',
        halfLife: '87.7 years',
        uses: 'Space power systems',
        cost: '$50000/Ci',
        production: 'Neptunium irradiation',
        safety: 'Alpha radiation, high security',
        applications: ['RTGs', 'Deep space missions', 'Mars rovers']
      },
      'cs-137': {
        name: 'Cesium-137',
        halfLife: '30 years',
        uses: 'Industrial gauging',
        cost: '$500/Ci',
        production: 'Fission byproduct',
        safety: 'Beta and gamma radiation',
        applications: ['Thickness gauging', 'Level detection', 'Well logging']
      }
    },
    manufacturing: {
      facility: {
        cost: '$50-500 million',
        timeline: '3-7 years',
        permits: 'Nuclear regulatory approval required',
        risks: 'Regulatory, technical, market',
        roi: '15-25% depending on isotope'
      },
      equipment: {
        reactor: '$100-300 million',
        hotCells: '$10-50 million',
        qualityControl: '$5-15 million',
        packaging: '$2-8 million'
      }
    },
    economics: {
      marketSize: '$150 billion globally',
      growth: '8-12% annually',
      medical: '$8.2 billion market',
      industrial: '$4.1 billion market',
      agriculture: '$2.4 billion market',
      space: '$850 million market'
    }
  };

  const generateResponse = (input: string): string => {
    const query = input.toLowerCase();
    
    // Check for specific isotopes
    for (const [key, isotope] of Object.entries(knowledgeBase.isotopes)) {
      if (query.includes(key) || query.includes(isotope.name.toLowerCase())) {
        return `**${isotope.name}** information:
        
📍 **Half-life:** ${isotope.halfLife}
💰 **Cost:** ${isotope.cost}
🔬 **Primary uses:** ${isotope.uses}
⚡ **Production:** ${isotope.production}
🛡️ **Safety:** ${isotope.safety}
📋 **Applications:** ${isotope.applications.join(', ')}

Would you like to know more about manufacturing costs, safety protocols, or economic analysis for this isotope?`;
      }
    }

    // Manufacturing and cost questions
    if (query.includes('manufacturing') || query.includes('build') || query.includes('facility')) {
      return `**Nuclear Facility Manufacturing Costs:**

🏭 **Facility Construction:** $50-500 million
⏱️ **Timeline:** 3-7 years
📋 **Key Equipment Costs:**
• Nuclear Reactor: $100-300 million
• Hot Cells: $10-50 million  
• Quality Control: $5-15 million
• Packaging Systems: $2-8 million

📊 **Financial Analysis:**
• ROI: 15-25% depending on isotope
• Payback Period: 4-6 years
• Operating Costs: $10-30 million/year

⚠️ **Major Risks:**
• Regulatory approval delays
• Technical challenges
• Market demand fluctuations
• Safety compliance costs

Would you like a detailed cost breakdown for a specific isotope production facility?`;
    }

    // Economic questions
    if (query.includes('cost') || query.includes('price') || query.includes('economic')) {
      return `**Nuclear Technology Economics:**

🌐 **Global Market:** $150 billion
📈 **Growth Rate:** 8-12% annually

**Market Breakdown:**
• Medical: $8.2 billion (highest growth)
• Industrial: $4.1 billion (stable demand)
• Agriculture: $2.4 billion (emerging markets)
• Space Technology: $850 million (high value)

**Cost Factors:**
• Production complexity
• Safety requirements
• Regulatory compliance
• Transportation logistics
• Storage infrastructure

**Profitability Drivers:**
• Medical applications (highest margins)
• Long-term contracts
• Geographic monopolies
• Technology licensing

Need specific cost analysis for any particular isotope or application?`;
    }

    // Safety questions
    if (query.includes('safety') || query.includes('risk') || query.includes('danger')) {
      return `**Nuclear Technology Safety:**

🛡️ **Safety Protocols:**
• Radiation monitoring systems
• Containment structures  
• Emergency response plans
• Worker protection programs

⚠️ **Risk Management:**
• Multiple safety barriers
• Automated shutdown systems
• Regular safety inspections
• International safety standards

**Radiation Exposure Limits:**
• Workers: 20 mSv/year maximum
• Public: 1 mSv/year maximum
• Medical procedures: Controlled doses

**Transportation Safety:**
• Type B packages for high activity
• Specialized vehicles
• Route planning
• Emergency response teams

**Environmental Impact:**
• Minimal when properly managed
• Strict waste disposal protocols
• Long-term monitoring programs

What specific safety aspect would you like to know more about?`;
    }

    // Applications
    if (query.includes('application') || query.includes('use')) {
      return `**Nuclear Technology Applications:**

🏥 **Medical (80% of procedures):**
• Cancer treatment (2.5M patients/year)
• Medical imaging (30M procedures/year)
• Sterilization (medical devices)

🌾 **Agriculture:**
• Food preservation (500K tons/year)
• Pest control (200M hectares)
• Crop improvement research

🏭 **Industry:**
• Non-destructive testing (10M inspections)
• Material gauging (1M devices)
• Quality control systems

🚀 **Space Technology:**
• Deep space missions (45+ spacecraft)
• Satellite power systems
• Mars exploration

Each application has unique economic benefits and technical requirements. Which sector interests you most?`;
    }

    // General fallback
    return `I can help you with information about:

🔬 **Isotope Details:** Tc-99m, Co-60, I-131, Pu-238, Cs-137, and more
💰 **Economic Analysis:** Costs, ROI, market size, profitability
🏭 **Manufacturing:** Facility costs, equipment, timeline, risks
🛡️ **Safety & Regulations:** Protocols, risks, compliance
📊 **Applications:** Medical, industrial, agriculture, space
🌍 **Market Trends:** Growth rates, emerging opportunities

Just ask me anything specific about nuclear technology, isotopes, costs, safety, or applications! For example:
• "What's the cost of building a Tc-99m production facility?"
• "How safe is Cobalt-60 for medical use?"
• "What are the economics of food irradiation?"`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    "What is Technetium-99m used for?",
    "How much does it cost to build a nuclear facility?",
    "What are the safety risks of isotopes?",
    "Which isotopes are most profitable?",
    "How do nuclear applications compare economically?"
  ];

  if (!isMounted) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.text}</div>
              <div
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                }`}
                suppressHydrationWarning={true}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2">
          <div className="text-sm text-gray-600 mb-2">Quick questions:</div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about isotopes, costs, safety, manufacturing..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <i className="ri-send-plane-line"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
