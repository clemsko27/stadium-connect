
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Clock, Navigation, Sun, Zap, Wind, Droplets, TrendingUp, MapPin, Shirt } from 'lucide-react';
import { t } from '../translations';

export const HomePage: React.FC = () => {
  const { currentStadium, settings, setActiveTab, setNavigationTarget } = useStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [manualTimeMinutes, setManualTimeMinutes] = useState(currentTime.getHours() * 60 + currentTime.getMinutes());
  const [sunAngle, setSunAngle] = useState(0);
  const [sunIntensity, setSunIntensity] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [clothingRecommendation, setClothingRecommendation] = useState('');
  const [displayTemp, setDisplayTemp] = useState(currentStadium.weather.temp);

  // Mettre à jour l'heure en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (!document.getElementById('time-slider')?.matches(':active')) {
        setManualTimeMinutes(now.getHours() * 60 + now.getMinutes());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculer la position du soleil et la température dynamique
  useEffect(() => {
    const hours = Math.floor(manualTimeMinutes / 60);
    const minutes = manualTimeMinutes % 60;
    const timeInMinutes = hours * 60 + minutes;
    
    // Calcul de la température dynamique
    const peakTempHour = 14;
    const hourDiff = Math.abs(hours - peakTempHour);
    const tempDrop = Math.min(10, hourDiff * 0.8);
    setDisplayTemp(Math.round(currentStadium.weather.temp - tempDrop));

    const sunrise = 6 * 60;
    const sunset = 20 * 60;
    
    if (timeInMinutes < sunrise || timeInMinutes > sunset) {
      setSunAngle(180);
      setSunIntensity(0);
      setRecommendation('🌙 Nuit - Éclairage artificiel');
      setClothingRecommendation('🧥 Veste recommandée');
    } else {
      const dayProgress = (timeInMinutes - sunrise) / (sunset - sunrise);
      const angle = 360 - (dayProgress * 180);
      setSunAngle(angle);
      
      const intensityFactor = 1 - Math.abs(dayProgress - 0.5) * 2;
      setSunIntensity(intensityFactor);
      
      if (timeInMinutes >= 12 * 60 && timeInMinutes <= 15 * 60) {
        setRecommendation('☀️ Soleil intense');
        setClothingRecommendation('🧢 Casquette + 😎 Lunettes + 🧴 Crème solaire');
      } else if (timeInMinutes >= 16 * 60 && timeInMinutes <= 18 * 60) {
        setRecommendation('🌤️ Soleil modéré');
        setClothingRecommendation('😎 Lunettes de soleil recommandées');
      } else if (timeInMinutes >= 18 * 60) {
        setRecommendation('🌅 Coucher de soleil');
        setClothingRecommendation('👕 Maillot de l\'équipe');
      } else {
        setRecommendation('🌤️ Matinée agréable');
        setClothingRecommendation('👕 Tenue légère + 🧢 Casquette');
      }
    }
  }, [manualTimeMinutes, currentStadium]);

  const bestEntrance = currentStadium.pois
    .filter(p => p.type === 'gate')
    .sort((a, b) => a.waitTime - b.waitTime)[0];

  const bestFood = currentStadium.pois
    .filter(p => p.type === 'food')
    .sort((a, b) => a.waitTime - b.waitTime)[0];

  const navigateTo = (poiId: string, tab: 'map') => {
    setNavigationTarget(poiId);
    setActiveTab(tab);
    if ('vibrate' in navigator) navigator.vibrate([20, 10, 20]);
  };

  const getSunColor = () => {
    if (sunIntensity > 0.8) return '#FDB813';
    if (sunIntensity > 0.5) return '#FFA500';
    if (sunIntensity > 0.2) return '#FF6B35';
    return '#1e293b';
  };

  const getSunPosition = () => {
    const angle = (sunAngle - 180) * (Math.PI / 180);
    const radius = currentStadium.sports.includes('tennis') ? 140 : 160;
    const centerX = 200;
    const centerY = currentStadium.sports.includes('tennis') ? 120 : 140;
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY - radius * Math.sin(angle)
    };
  };

  const sunPos = getSunPosition();

  const formatWaitTime = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 1) return '< 1 min';
    return `${minutes} min`;
  };

  const getUVIndex = () => {
    if (sunIntensity > 0.8) return 9;
    if (sunIntensity > 0.6) return 7;
    if (sunIntensity > 0.3) return 4;
    return 1;
  };

  const uvIndex = getUVIndex();
  const uvColor = uvIndex >= 8 ? 'text-red-500' : uvIndex >= 6 ? 'text-orange-500' : uvIndex >= 3 ? 'text-yellow-500' : 'text-green-500';

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Hero: Position du Soleil 3D avec Slider */}
      <div className="bg-gradient-to-br from-blue-600 via-primary to-blue-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Header avec météo live */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sun className="text-yellow-300" size={24} />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Live</h2>
                  <p className="text-white/80 text-xs">{currentStadium.name}</p>
                </div>
              </div>
            </div>
            <div className="text-right bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
              <p className="text-white text-3xl font-bold">{displayTemp}°C</p>
              <p className="text-white/80 text-[10px]">{currentStadium.weather.condition}</p>
            </div>
          </div>

          {/* Container Fusionné : Visualisation 3D + Slider */}
          <div className="relative w-full bg-gradient-to-b from-blue-900 to-slate-900 rounded-2xl border border-white/20 overflow-hidden shadow-inner">
            <div className="h-56 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="sunGradient">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="50%" stopColor={getSunColor()} />
                    <stop offset="100%" stopColor={getSunColor()} stopOpacity="0" />
                  </radialGradient>
                  {/* Yellow Halo Gradient */}
                  <radialGradient id="haloGradient">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                  </radialGradient>
                  <pattern id="stadiumPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#1e293b" opacity="0.1" />
                    <circle cx="10" cy="10" r="1" fill="#475569" />
                  </pattern>
                </defs>

                {/* Arc de trajectoire */}
                <path
                  d={currentStadium.sports.includes('tennis') 
                    ? "M 40 120 Q 200 -20 360 120" 
                    : "M 40 140 Q 200 -20 360 140"}
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  opacity="0.4"
                />

                {/* Stade */}
                {currentStadium.sports.includes('tennis') ? (
                  <>
                    <rect x="120" y="120" width="160" height="60" fill="url(#stadiumPattern)" rx="5" />
                    <rect x="125" y="125" width="150" height="50" fill="#c2410c" opacity="0.7" />
                    <line x1="200" y1="125" x2="200" y2="175" stroke="white" strokeWidth="1.5" />
                    <text x="200" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                      Court Principal
                    </text>
                  </>
                ) : (
                  <>
                    <ellipse cx="200" cy="140" rx="140" ry="45" fill="url(#stadiumPattern)" />
                    <ellipse cx="200" cy="140" rx="120" ry="35" fill="#16a34a" opacity="0.7" />
                    <circle cx="200" cy="140" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
                    <text x="200" y="205" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" opacity="0.9">
                      Pelouse
                    </text>
                  </>
                )}

                {/* Rayons du soleil */}
                {sunIntensity > 0.2 && (
                  <>
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * Math.PI / 180;
                      const length = 15 + sunIntensity * 10;
                      return (
                        <line
                          key={i}
                          x1={sunPos.x}
                          y1={sunPos.y}
                          x2={sunPos.x + Math.cos(angle) * length}
                          y2={sunPos.y + Math.sin(angle) * length}
                          stroke={getSunColor()}
                          strokeWidth="2.5"
                          opacity={sunIntensity * 0.7}
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </>
                )}

                {/* Le Soleil */}
                <circle
                  cx={sunPos.x}
                  cy={sunPos.y}
                  r={12 + sunIntensity * 8}
                  fill="url(#sunGradient)"
                  opacity={0.3 + sunIntensity * 0.7}
                />
                <circle
                  cx={sunPos.x}
                  cy={sunPos.y}
                  r={10}
                  fill={getSunColor()}
                  opacity={0.4 + sunIntensity * 0.6}
                >
                  <animate
                    attributeName="r"
                    values="10;12;10"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Halo Jaune (au lieu de l'ombre) */}
                {sunIntensity > 0.3 && (
                  <ellipse
                    cx={200 + (sunPos.x - 200) * 0.3}
                    cy={currentStadium.sports.includes('tennis') ? 155 : 170}
                    rx="75"
                    ry="25"
                    fill="url(#haloGradient)"
                    filter="blur(5px)"
                  />
                )}
              </svg>
            </div>

            {/* Slider temporel fusionné */}
            <div className="px-6 pb-6 relative z-20 -mt-2">
              <input
                id="time-slider"
                type="range"
                min={360}
                max={1320}
                step={15}
                value={manualTimeMinutes}
                onChange={(e) => setManualTimeMinutes(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FDB813 0%, #FDB813 ${((manualTimeMinutes - 360) / 960) * 100}%, rgba(255,255,255,0.1) ${((manualTimeMinutes - 360) / 960) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-white/40 text-[10px] mt-2 font-medium">
                <span>6h</span>
                <span>12h</span>
                <span>18h</span>
                <span>22h</span>
              </div>
            </div>
          </div>

          {/* Recommandations */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <p className="text-white/80 text-[10px] font-semibold mb-1">ENSOLEILLEMENT</p>
              <p className="text-white font-bold text-sm">{recommendation}</p>
              <p className={`${uvColor} font-bold text-xs mt-1`}>UV Index: {uvIndex}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <div className="flex items-center gap-1 mb-1">
                <Shirt size={12} className="text-white" />
                <p className="text-white/80 text-[10px] font-semibold">À PORTER</p>
              </div>
              <p className="text-white font-semibold text-xs leading-relaxed">{clothingRecommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Météo compacte */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface border border-white/5 rounded-xl p-3 text-center">
          <Sun className="mx-auto mb-1 text-yellow-500" size={20} />
          <p className="text-white text-xl font-bold">{displayTemp}°C</p>
          <p className="text-gray-400 text-[10px]">Température</p>
        </div>
        <div className="bg-surface border border-white/5 rounded-xl p-3 text-center">
          <Wind className="mx-auto mb-1 text-blue-400" size={20} />
          <p className="text-white text-xl font-bold">12 km/h</p>
          <p className="text-gray-400 text-[10px]">Vent</p>
        </div>
        <div className="bg-surface border border-white/5 rounded-xl p-3 text-center">
          <Droplets className="mx-auto mb-1 text-cyan-400" size={20} />
          <p className="text-white text-xl font-bold">45%</p>
          <p className="text-gray-400 text-[10px]">Humidité</p>
        </div>
      </div>

      {/* Recommandations Temps Réel */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="text-accent" size={20} />
          <h3 className="text-white font-bold text-base">Recommandations Temps Réel</h3>
        </div>

        {bestEntrance && (
          <button
            onClick={() => navigateTo(bestEntrance.id, 'map')}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-4 text-left shadow-lg active:scale-98 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Navigation className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Entrée la plus rapide</p>
                  <p className="text-white/80 text-xs">{bestEntrance.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-2xl font-bold">{formatWaitTime(bestEntrance.waitTime)}</p>
                <p className="text-white/70 text-[10px]">d'attente</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${Math.max(10, 100 - (bestEntrance.waitTime / 600 * 100))}%` }}
                ></div>
              </div>
              <span className="text-white text-xs font-medium">🟢 Fluide</span>
            </div>
          </button>
        )}

        {bestFood && (
          <button
            onClick={() => navigateTo(bestFood.id, 'map')}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-4 text-left shadow-lg active:scale-98 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🍔</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">File la plus courte</p>
                  <p className="text-white/80 text-xs">{bestFood.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-2xl font-bold">{formatWaitTime(bestFood.waitTime)}</p>
                <p className="text-white/70 text-[10px]">d'attente</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${Math.max(10, 100 - (bestFood.waitTime / 600 * 100))}%` }}
                ></div>
              </div>
              <span className="text-white text-xs font-medium">
                {bestFood.crowdLevel === 'low' ? '🟢 Faible' : 
                 bestFood.crowdLevel === 'medium' ? '🟠 Moyen' : '🔴 Élevé'}
              </span>
            </div>
          </button>
        )}

        <button
          onClick={() => setActiveTab('services')}
          className="w-full bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-4 shadow-lg active:scale-98 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Clock className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">Pré-commande Mi-Temps</p>
                <p className="text-white/80 text-xs">Évite complètement la file</p>
              </div>
            </div>
            <div className="bg-accent text-primary px-4 py-2 rounded-xl font-bold text-sm">
              Commander
            </div>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-surface border border-white/5 rounded-2xl p-4">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <TrendingUp size={18} className="text-accent" />
          Infos du jour
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Affluence actuelle</span>
            <span className="text-white font-bold">
              {Math.round((currentStadium.currentAttendance / currentStadium.capacity) * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Temps moyen file</span>
            <span className="text-white font-bold">8 min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Services disponibles</span>
            <span className="text-white font-bold">{currentStadium.pois.length}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
