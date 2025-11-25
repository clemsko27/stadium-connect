import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { MapPin, Navigation2, Clock, Users, X, Layers, ExternalLink } from 'lucide-react';

export const MapPage: React.FC = () => {
  const { currentStadium, navigationTargetId, setNavigationTarget } = useStore();
  const [selectedPOI, setSelectedPOI] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'roadmap'>('satellite');
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

  // Simuler la position de l'utilisateur (centre du stade par défaut)
  useEffect(() => {
    // En production réelle, utilise : navigator.geolocation.getCurrentPosition()
    setUserLocation(currentStadium.coords);
  }, [currentStadium]);

  useEffect(() => {
    if (navigationTargetId) {
      setSelectedPOI(navigationTargetId);
    }
  }, [navigationTargetId]);

  const selectedPOIData = currentStadium.pois.find(p => p.id === selectedPOI);

  // Construire l'URL Google Maps Embed (PAS BESOIN DE CLÉ API POUR MODE EMBED BASIQUE)
  const buildMapUrl = () => {
    const { lat, lng } = currentStadium.coords;
    
    // Mode Embed sans clé API (limitations : pas de marqueurs custom, mais fonctionne)
    // Pour production avec marqueurs : utilise Google Maps JavaScript API
    const baseUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e${mapType === 'satellite' ? '1' : '0'}!3m2!1sfr!2sfr!4v1`;
    
    return baseUrl;
  };

  // Calculer distance entre 2 points (formule Haversine)
  const calculateDistance = (poi: typeof currentStadium.pois[0]) => {
    if (!userLocation) return null;
    
    const R = 6371e3; // Rayon de la Terre en mètres
    const φ1 = userLocation.lat * Math.PI / 180;
    const φ2 = poi.coords.lat * Math.PI / 180;
    const Δφ = (poi.coords.lat - userLocation.lat) * Math.PI / 180;
    const Δλ = (poi.coords.lng - userLocation.lng) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = Math.round(R * c); // en mètres
    const walkingSpeed = 1.4; // m/s (vitesse de marche moyenne)
    const duration = Math.ceil((distance / walkingSpeed) / 60); // en minutes
    
    return { distance, duration };
  };

  const getPOIIcon = (type: string) => {
    switch (type) {
      case 'food': return '🍔';
      case 'toilet': return '🚻';
      case 'gate': return '🚪';
      case 'merch': return '🛍️';
      case 'parking': return '🅿️';
      case 'aid': return '🏥';
      default: return '📍';
    }
  };

  const getPOIColor = (type: string) => {
    switch (type) {
      case 'food': return '#f59e0b';
      case 'toilet': return '#3b82f6';
      case 'gate': return '#10b981';
      case 'merch': return '#ec4899';
      case 'parking': return '#6366f1';
      case 'aid': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const routeInfo = selectedPOIData ? calculateDistance(selectedPOIData) : null;

  // Ouvrir Google Maps avec itinéraire
  const openGoogleMapsDirections = () => {
    if (!selectedPOIData || !userLocation) return;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedPOIData.coords.lat},${selectedPOIData.coords.lng}&travelmode=walking`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative h-full bg-slate-900 overflow-hidden">
      
      {/* ========== GOOGLE MAPS EMBED - CARTE SATELLITE RÉELLE ========== */}
      <iframe
        src={buildMapUrl()}
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Stadium Map"
      />

      {/* Overlay gradients pour lisibilité */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* ========== EN-TÊTE ========== */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="bg-surface/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-black text-lg leading-tight">{currentStadium.name}</h2>
              <p className="text-gray-400 text-xs mt-0.5">
                📍 {currentStadium.coords.lat.toFixed(4)}, {currentStadium.coords.lng.toFixed(4)}
              </p>
            </div>
            <button
              onClick={() => {
                setMapType(mapType === 'satellite' ? 'roadmap' : 'satellite');
                if ('vibrate' in navigator) navigator.vibrate(10);
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-all active:scale-95 ml-3"
            >
              <Layers size={16} className="text-white" />
              <span className="text-white text-xs font-bold">
                {mapType === 'satellite' ? '🗺️ Plan' : '🛰️ Satellite'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========== LISTE POIs EN BAS (SCROLLABLE) ========== */}
      <div className="absolute bottom-4 left-0 right-0 z-20 pointer-events-auto">
        <div className="px-4 space-y-3">
          
          {/* Scroll horizontal des POIs */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {currentStadium.pois.map((poi) => {
              const distance = calculateDistance(poi);
              const isSelected = poi.id === selectedPOI;
              
              return (
                <button
                  key={poi.id}
                  onClick={() => {
                    setSelectedPOI(poi.id === selectedPOI ? null : poi.id);
                    if ('vibrate' in navigator) navigator.vibrate(10);
                  }}
                  className={`flex-shrink-0 w-40 rounded-2xl p-3 transition-all ${
                    isSelected
                      ? 'bg-accent text-primary scale-105 shadow-2xl'
                      : 'bg-surface/95 backdrop-blur-xl text-white hover:bg-white/10 border border-white/10 shadow-lg'
                  }`}
                >
                  {/* Header POI */}
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ 
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : `${getPOIColor(poi.type)}30`,
                        border: `2px solid ${isSelected ? 'rgba(255,255,255,0.5)' : getPOIColor(poi.type)}`
                      }}
                    >
                      {getPOIIcon(poi.type)}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className={`font-bold text-xs leading-tight line-clamp-2 ${isSelected ? 'text-primary' : 'text-white'}`}>
                        {poi.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Infos distance & temps */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span className="font-medium">{Math.round(poi.waitTime / 60)}min</span>
                    </div>
                    {distance && (
                      <div className="flex items-center gap-1">
                        <Navigation2 size={10} />
                        <span className="font-medium">{distance.distance}m</span>
                      </div>
                    )}
                  </div>

                  {/* Badge affluence */}
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCrowdColor(poi.crowdLevel) }}
                    />
                    <span className="capitalize">{poi.crowdLevel === 'low' ? 'Fluide' : poi.crowdLevel === 'medium' ? 'Moyen' : 'Saturé'}</span>
                  </div>

                  {/* Badge recommandé */}
                  {poi.recommended && (
                    <div className={`mt-2 text-[10px] font-bold px-2 py-1 rounded-full text-center ${
                      isSelected ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                    }`}>
                      ⭐ Recommandé
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========== PANEL DÉTAILLÉ POI SÉLECTIONNÉ ========== */}
          {selectedPOIData && (
            <div className="bg-surface/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/10 animate-[fadeIn_0.3s]">
              
              {/* En-tête POI */}
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ 
                    backgroundColor: `${getPOIColor(selectedPOIData.type)}20`,
                    border: `2px solid ${getPOIColor(selectedPOIData.type)}`
                  }}
                >
                  {getPOIIcon(selectedPOIData.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-black text-xl leading-tight mb-1">{selectedPOIData.name}</h3>
                  <p className="text-gray-400 text-sm capitalize mb-2">{selectedPOIData.type}</p>
                  {routeInfo && (
                    <div className="flex items-center gap-3 text-accent text-xs font-bold">
                      <span>📍 {routeInfo.distance}m</span>
                      <span>•</span>
                      <span>🚶 {routeInfo.duration} min</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedPOI(null);
                    setNavigationTarget(null);
                    if ('vibrate' in navigator) navigator.vibrate(10);
                  }}
                  className="text-gray-400 hover:text-white flex-shrink-0 active:scale-90 transition-transform"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Stats POI */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <Clock size={12} />
                    <span>Attente</span>
                  </div>
                  <p className="text-white font-black text-lg">{Math.round(selectedPOIData.waitTime / 60)}<span className="text-sm">min</span></p>
                </div>

                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <Users size={12} />
                    <span>Affluence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCrowdColor(selectedPOIData.crowdLevel) }}
                    />
                    <p className="text-white font-bold text-sm capitalize">
                      {selectedPOIData.crowdLevel === 'low' ? 'Fluide' : selectedPOIData.crowdLevel === 'medium' ? 'Moyen' : 'Saturé'}
                    </p>
                  </div>
                </div>

                {routeInfo && (
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <Navigation2 size={12} />
                      <span>Marche</span>
                    </div>
                    <p className="text-white font-black text-lg">{routeInfo.duration}<span className="text-sm">min</span></p>
                  </div>
                )}
              </div>

              {/* Badge recommandation */}
              {selectedPOIData.recommended && (
                <div className="bg-accent/20 border border-accent/40 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div className="flex-1">
                    <p className="text-accent font-bold text-sm">Point recommandé</p>
                    <p className="text-accent/80 text-xs">Moins d'attente que la moyenne</p>
                  </div>
                </div>
              )}

              {/* Bouton navigation Google Maps */}
              <button 
                onClick={() => {
                  openGoogleMapsDirections();
                  if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
                }}
                className="w-full bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-primary py-4 rounded-xl font-black text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Navigation2 size={20} />
                Ouvrir dans Google Maps
                <ExternalLink size={16} />
              </button>

              <p className="text-gray-400 text-xs text-center mt-2">
                Navigation GPS en temps réel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========== LÉGENDE ========== */}
      <div className="absolute top-24 right-4 z-20 bg-surface/90 backdrop-blur-xl rounded-xl p-3 shadow-xl border border-white/10 max-w-[160px] pointer-events-auto">
        <p className="text-white text-xs font-bold mb-2 flex items-center gap-1">
          <MapPin size={12} />
          Légende
        </p>
        <div className="space-y-1.5">
          {[
            { icon: '🍔', label: 'Restauration', color: '#f59e0b' },
            { icon: '🚻', label: 'Toilettes', color: '#3b82f6' },
            { icon: '🚪', label: 'Entrées', color: '#10b981' },
            { icon: '🏥', label: 'Urgences', color: '#ef4444' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ backgroundColor: `${item.color}40`, border: `1.5px solid ${item.color}` }}
              >
                {item.icon}
              </div>
              <span className="text-gray-300 text-[11px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};