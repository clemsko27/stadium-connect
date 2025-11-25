import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mic, Navigation, Loader2, MicOff } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { useStore } from '../store';
import { MENU_ITEMS } from '../mockData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Salut ! Je suis ton assistant Stadium Companion. Demande-moi de la nourriture, de l'aide pour naviguer, ou des infos sur le match ! 🏟️", sender: 'bot', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { addToCart, setActiveTab, currentStadium, setNavigationTarget } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Reconnaissance vocale
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('La reconnaissance vocale n\'est pas supportée sur ce navigateur. Essayez Chrome sur mobile.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      if ('vibrate' in navigator) navigator.vibrate(10);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
      if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      if ('vibrate' in navigator) navigator.vibrate([20, 30, 20]);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const botResponseText = await generateChatResponse(userMsg.text);
    let displayText = botResponseText;
    
    const jsonMatch = botResponseText.match(/\{[^}]+\}/);
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[0]);
        
        if (data.intent === 'order') {
          const item = MENU_ITEMS.find(i => 
            i.name.toLowerCase().includes(data.item.toLowerCase()) ||
            data.item.toLowerCase().includes(i.name.toLowerCase().split(' ')[0])
          );
          
          if (item) {
            addToCart(item);
            displayText = `✅ ${item.name} ajouté au panier ! (${item.price.toFixed(2)}€)`;
            if ('vibrate' in navigator) navigator.vibrate(50);
          } else {
            displayText = `Je n'ai pas trouvé "${data.item}" dans le menu. Consulte l'onglet Services pour voir tous les produits ! 🍔`;
          }
        } else if (data.intent === 'navigate') {
          const targetType = data.target;
          const targetMap: Record<string, string> = {
            'toilet': 'toilettes',
            'food': 'la buvette',
            'gate': 'la porte d\'entrée',
            'parking': 'le parking'
          };
          
          // Find best POI
          const bestPOI = currentStadium.pois.find(p => p.type === targetType && p.recommended) 
                         || currentStadium.pois.find(p => p.type === targetType);

          if (bestPOI) {
             displayText = `🗺️ Je t'amène vers ${bestPOI.name} (${targetMap[targetType] || targetType}). Suis la ligne bleue sur la carte !`;
             setTimeout(() => {
                 setNavigationTarget(bestPOI.id);
                 setActiveTab('map');
             }, 1500);
          } else {
             displayText = `Désolé, je ne trouve pas de ${targetMap[targetType]} disponible pour le moment.`;
          }
        }
      } catch (e) {
        console.log('JSON parse failed, using plain text response');
      }
    }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: displayText,
      sender: 'bot',
      timestamp: Date.now()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);
  };

  const quickActions = [
    { label: 'Toilettes proches', action: () => { setInputValue("Où sont les toilettes ?"); } },
    { label: 'Commander burger', action: () => { setInputValue("Je veux un burger"); } },
    { label: 'Score du match', action: () => { setInputValue("C'est quoi le score ?"); } },
  ];

  return (
    <>
      {/* Click Outside Handler (Backdrop) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[90]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            if ('vibrate' in navigator) navigator.vibrate(10);
          }}
          className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-primary to-blue-700 rounded-full shadow-lg shadow-blue-900/50 flex items-center justify-center text-white z-[100] hover:scale-105 active:scale-95 transition-transform"
        >
          <MessageSquare size={24} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-dark rounded-full"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-[calc(100vw-2rem)] max-w-sm h-[500px] bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[100] overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Header */}
          <div className="h-14 bg-primary/20 flex items-center justify-between px-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">Assistant Stade</span>
            </div>
            <button 
              onClick={() => {
                setIsOpen(false);
                if ('vibrate' in navigator) navigator.vibrate(10);
              }}
              className="text-gray-400 hover:text-white active:scale-90 transition-transform"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white/10 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-2 rounded-bl-none flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/5 bg-black/20">
            <div className="flex items-center gap-2">
               <button 
                 onClick={handleVoiceInput}
                 disabled={isListening}
                 className={`p-2 rounded-full transition-all active:scale-90 ${
                   isListening 
                     ? 'bg-red-500 text-white animate-pulse' 
                     : 'text-accent hover:text-yellow-400'
                 }`}
               >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
               </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "🎤 Écoute..." : "Pose ta question..."}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-accent/50"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary disabled:opacity-50 hover:bg-yellow-400 active:scale-90 transition-all"
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar pb-1">
                {quickActions.map((qa, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { 
                      qa.action(); 
                      setTimeout(handleSend, 100);
                      if ('vibrate' in navigator) navigator.vibrate(10);
                    }} 
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 text-[10px] text-gray-300 hover:bg-white/10 active:scale-95 border border-white/5 transition-all"
                  >
                    {qa.label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};