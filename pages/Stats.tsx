import React, { useState } from 'react';
import { useStore } from '../store';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts';
import { Calendar, Users, TrendingUp, Trophy, Timer, ChevronDown, Award } from 'lucide-react';

// Types pour les joueurs
interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  country: string;
  stats: {
    // Football
    goals?: number;
    assists?: number;
    shots?: number;
    passes?: number;
    tackles?: number;
    // Tennis
    aces?: number;
    doubleFaults?: number;
    firstServe?: number;
    points?: number;
    winners?: number;
    unforced?: number;
    // Baseball
    hits?: number;
    runs?: number;
    strikeouts?: number;
    avg?: string;
  };
}

interface TennisScore {
  sets: number[];
  currentSet: string;
  serving: 'home' | 'away';
}

interface MomentumEvent {
  minute: number;
  value: number;
  type: 'goal' | 'card' | 'substitution' | 'ace' | 'break' | 'homerun';
  description: string;
  team: 'home' | 'away';
}

export const StatsPage: React.FC = () => {
  const { currentStats, currentStadium } = useStore();
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away' | null>(null);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);

  const isTennis = currentStadium.sports.includes('tennis');
  const isBaseball = currentStadium.sports.includes('baseball');

  // ========== JOUEURS TENNIS ==========
  const tennisPlayerHome: Player = {
    id: 'nad',
    name: 'Rafael Nadal',
    number: 1,
    position: 'Joueur',
    country: 'ES',
    stats: { 
      aces: 12, 
      doubleFaults: 3, 
      firstServe: 68, 
      points: 84,
      winners: 28,
      unforced: 15
    }
  };

  const tennisPlayerAway: Player = {
    id: 'djo',
    name: 'Novak Djokovic',
    number: 1,
    position: 'Joueur',
    country: 'RS',
    stats: { 
      aces: 15, 
      doubleFaults: 2, 
      firstServe: 72, 
      points: 91,
      winners: 32,
      unforced: 12
    }
  };

  const tennisScore: TennisScore = {
    sets: [6, 4, 6],
    currentSet: '40-30',
    serving: 'home'
  };

  // ========== JOUEURS FOOTBALL ==========
  const footballPlayersHome: Player[] = [
    {
      id: 'mbp',
      name: 'K. Mbappé',
      number: 10,
      position: 'Attaquant',
      country: 'FR',
      stats: { goals: 2, assists: 1, shots: 6, passes: 42, tackles: 2 }
    },
    {
      id: 'grz',
      name: 'A. Griezmann',
      number: 7,
      position: 'Milieu',
      country: 'FR',
      stats: { goals: 0, assists: 2, shots: 3, passes: 58, tackles: 5 }
    },
    {
      id: 'tch',
      name: 'A. Tchouaméni',
      number: 8,
      position: 'Milieu',
      country: 'FR',
      stats: { goals: 0, assists: 0, shots: 1, passes: 67, tackles: 8 }
    }
  ];

  const footballPlayersAway: Player[] = [
    {
      id: 'jp1',
      name: 'T. Kubo',
      number: 9,
      position: 'Attaquant',
      country: 'JP',
      stats: { goals: 1, assists: 0, shots: 4, passes: 35, tackles: 1 }
    },
    {
      id: 'jp2',
      name: 'K. Endo',
      number: 6,
      position: 'Milieu',
      country: 'JP',
      stats: { goals: 0, assists: 1, shots: 2, passes: 52, tackles: 6 }
    },
    {
      id: 'jp3',
      name: 'H. Minamino',
      number: 11,
      position: 'Attaquant',
      country: 'JP',
      stats: { goals: 0, assists: 0, shots: 3, passes: 28, tackles: 3 }
    }
  ];

  // ========== JOUEURS BASEBALL ==========
  const baseballPlayersHome: Player[] = [
    {
      id: 'bb1',
      name: 'M. Trout',
      number: 27,
      position: 'Outfielder',
      country: 'US',
      stats: { hits: 3, runs: 2, strikeouts: 1, avg: '.312' }
    },
    {
      id: 'bb2',
      name: 'S. Ohtani',
      number: 17,
      position: 'Pitcher/DH',
      country: 'JP',
      stats: { hits: 2, runs: 1, strikeouts: 8, avg: '.298' }
    }
  ];

  const baseballPlayersAway: Player[] = [
    {
      id: 'bb3',
      name: 'A. Judge',
      number: 99,
      position: 'Outfielder',
      country: 'US',
      stats: { hits: 2, runs: 1, strikeouts: 2, avg: '.287' }
    },
    {
      id: 'bb4',
      name: 'G. Cole',
      number: 45,
      position: 'Pitcher',
      country: 'US',
      stats: { hits: 1, runs: 0, strikeouts: 10, avg: '.201' }
    }
  ];

  // Événements selon le sport
  const getEventsForSport = (): MomentumEvent[] => {
    if (isTennis) {
      return [
        { minute: 15, value: 55, type: 'ace', description: 'Ace de Nadal', team: 'home' },
        { minute: 28, value: 48, type: 'break', description: 'Break Djokovic', team: 'away' },
        { minute: 42, value: 52, type: 'ace', description: 'Double ace Nadal', team: 'home' },
        { minute: 58, value: 62, type: 'break', description: 'Break Nadal', team: 'home' }
      ];
    } else if (isBaseball) {
      return [
        { minute: 20, value: 58, type: 'homerun', description: 'Home run Trout !', team: 'home' },
        { minute: 35, value: 45, type: 'homerun', description: 'Home run Judge', team: 'away' },
        { minute: 50, value: 55, type: 'homerun', description: 'Home run Ohtani !', team: 'home' }
      ];
    } else {
      return [
        { minute: 23, value: 55, type: 'goal', description: 'But de Mbappé !', team: 'home' },
        { minute: 35, value: 48, type: 'card', description: 'Carton jaune Upamecano', team: 'home' },
        { minute: 52, value: 42, type: 'goal', description: 'But de Kubo', team: 'away' },
        { minute: 67, value: 62, type: 'goal', description: 'But de Mbappé (x2)', team: 'home' },
        { minute: 78, value: 58, type: 'substitution', description: 'Entrée de Dembélé', team: 'home' }
      ];
    }
  };

  const momentumEvents = getEventsForSport();

  const momentumWithEvents = currentStats.momentum.map(point => {
    const event = momentumEvents.find(e => e.minute === point.minute);
    return {
      ...point,
      event: event?.description || null,
      eventType: event?.type || null,
      eventTeam: event?.team || null
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-sm">
          <p className="text-white font-bold text-sm mb-1">{data.minute}'</p>
          <p className="text-gray-400 text-xs">Momentum: {data.value}%</p>
          {data.event && (
            <div className={`mt-2 pt-2 border-t ${
              data.eventTeam === 'home' ? 'border-blue-500/30' : 'border-red-500/30'
            }`}>
              <p className={`text-xs font-semibold ${
                data.eventType === 'goal' || data.eventType === 'homerun' || data.eventType === 'ace' ? 'text-green-400' :
                data.eventType === 'card' ? 'text-yellow-400' : 
                data.eventType === 'break' ? 'text-orange-400' : 'text-blue-400'
              }`}>
                {data.eventType === 'goal' || data.eventType === 'homerun' ? '⚽' :
                 data.eventType === 'card' ? '🟨' :
                 data.eventType === 'ace' ? '🎾' :
                 data.eventType === 'break' ? '💥' : '🔄'} {data.event}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Sélection des joueurs selon le sport
  const getPlayersForTeam = (team: 'home' | 'away') => {
    if (isTennis) {
      return team === 'home' ? [tennisPlayerHome] : [tennisPlayerAway];
    } else if (isBaseball) {
      return team === 'home' ? baseballPlayersHome : baseballPlayersAway;
    } else {
      return team === 'home' ? footballPlayersHome : footballPlayersAway;
    }
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Match Info Header */}
      <div className="bg-surface border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={16} className="text-accent" />
          <span className="text-gray-400 text-xs">23 Novembre 2025 • 21:00</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-accent" />
          <span className="text-gray-400 text-xs">
            {isTennis ? 'Roland-Garros - Finale Messieurs' : 
             isBaseball ? 'World Series - Game 5' :
             'Match Amical International'}
          </span>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="bg-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
         
         <div className="relative z-10">
           <div className="flex items-center justify-between mb-4">
              {/* Home Team */}
              <button
                onClick={() => {
                  setSelectedTeam(selectedTeam === 'home' ? null : 'home');
                  setShowPlayerDetails(true);
                }}
                className={`text-center w-1/3 transition-all active:scale-95 ${
                  selectedTeam === 'home' ? 'scale-105' : ''
                }`}
              >
                 <div className={`w-20 h-20 mx-auto rounded-full p-2 mb-2 shadow-lg transition-all ${
                   selectedTeam === 'home' ? 'ring-4 ring-blue-500' : ''
                 }`}
                   style={{ backgroundColor: 'white' }}
                 >
                    <img 
                      src={isTennis ? `https://flagcdn.com/w80/${tennisPlayerHome.country.toLowerCase()}.png` : 
                           isBaseball ? 'https://flagcdn.com/w80/us.png' :
                           "https://flagcdn.com/w80/fr.png"} 
                      className="w-full h-full rounded-full object-cover" 
                      alt={currentStats.homeTeam}
                    />
                 </div>
                 <span className="text-white font-bold block text-lg">{currentStats.homeTeam}</span>
                 {isTennis && <span className="text-gray-500 text-xs">{tennisPlayerHome.name}</span>}
              </button>
              
              {/* Score */}
              <div className="text-center w-1/3">
                 {isTennis ? (
                   <div>
                     <div className="flex justify-center gap-2 mb-2">
                       {tennisScore.sets.map((set, i) => (
                         <div key={i} className="text-white font-bold text-xl">
                           {set}
                         </div>
                       ))}
                     </div>
                     <div className="text-accent text-2xl font-bold">
                       {tennisScore.currentSet}
                     </div>
                     <p className="text-gray-400 text-xs mt-1">
                       {tennisScore.serving === 'home' ? '🎾 Au service' : ''}
                     </p>
                   </div>
                 ) : (
                   <>
                     <span className="text-5xl font-bold text-white tracking-widest">
                       {currentStats.homeScore} - {currentStats.awayScore}
                     </span>
                     <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full border border-red-500/20">
                        <Timer size={14} className="animate-pulse" />
                        {currentStats.time}
                     </div>
                   </>
                 )}
              </div>

              {/* Away Team */}
              <button
                onClick={() => {
                  setSelectedTeam(selectedTeam === 'away' ? null : 'away');
                  setShowPlayerDetails(true);
                }}
                className={`text-center w-1/3 transition-all active:scale-95 ${
                  selectedTeam === 'away' ? 'scale-105' : ''
                }`}
              >
                 <div className={`w-20 h-20 mx-auto rounded-full p-2 mb-2 shadow-lg transition-all ${
                   selectedTeam === 'away' ? 'ring-4 ring-red-500' : ''
                 }`}
                   style={{ backgroundColor: 'white' }}
                 >
                    <img 
                      src={isTennis ? `https://flagcdn.com/w80/${tennisPlayerAway.country.toLowerCase()}.png` :
                           isBaseball ? 'https://flagcdn.com/w80/jp.png' :
                           "https://flagcdn.com/w80/jp.png"} 
                      className="w-full h-full rounded-full object-cover" 
                      alt={currentStats.awayTeam}
                    />
                 </div>
                 <span className="text-white font-bold block text-lg">{currentStats.awayTeam}</span>
                 {isTennis && <span className="text-gray-500 text-xs">{tennisPlayerAway.name}</span>}
              </button>
           </div>
           
           {/* Possession Bar (sauf tennis) */}
           {!isTennis && (
             <div className="space-y-1">
                 <div className="flex justify-between text-xs text-gray-400">
                    <span>Possession</span>
                 </div>
                 <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden flex">
                    <div style={{ width: `${currentStats.possession[0]}%` }} className="h-full bg-blue-500"></div>
                    <div style={{ width: `${currentStats.possession[1]}%` }} className="h-full bg-red-500"></div>
                 </div>
                 <div className="flex justify-between text-xs text-white font-bold">
                    <span>{currentStats.possession[0]}%</span>
                    <span>{currentStats.possession[1]}%</span>
                 </div>
             </div>
           )}
         </div>
      </div>

      {/* Joueurs sélectionnés */}
      {selectedTeam && showPlayerDetails && (
        <div className="bg-surface border border-white/5 rounded-3xl p-6 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Users size={20} className="text-accent" />
              {isTennis ? 'Joueur' : 'Joueurs'} - {selectedTeam === 'home' ? currentStats.homeTeam : currentStats.awayTeam}
            </h3>
            <button 
              onClick={() => setShowPlayerDetails(false)}
              className="text-gray-400 hover:text-white"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {getPlayersForTeam(selectedTeam).map(player => (
              <div key={player.id} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    {/* AVATAR SANS PHOTO */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-accent flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{player.name.charAt(0)}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent text-primary rounded-full flex items-center justify-center text-[10px] font-bold">
                      {player.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-base">{player.name}</h4>
                    <p className="text-gray-400 text-xs">{player.position}</p>
                  </div>
                  {isTennis && player.stats.aces && player.stats.aces > 10 && (
                    <Award size={20} className="text-accent" />
                  )}
                </div>
                
                {/* Stats selon le sport */}
                {isTennis ? (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-accent text-2xl font-bold">{player.stats.aces}</p>
                      <p className="text-gray-400 text-[10px]">Aces</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-white text-2xl font-bold">{player.stats.firstServe}%</p>
                      <p className="text-gray-400 text-[10px]">1er Service</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-white text-2xl font-bold">{player.stats.points}</p>
                      <p className="text-gray-400 text-[10px]">Points</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-green-400 text-xl font-bold">{player.stats.winners}</p>
                      <p className="text-gray-400 text-[10px]">Winners</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-red-400 text-xl font-bold">{player.stats.unforced}</p>
                      <p className="text-gray-400 text-[10px]">Fautes</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-yellow-400 text-xl font-bold">{player.stats.doubleFaults}</p>
                      <p className="text-gray-400 text-[10px]">Double F.</p>
                    </div>
                  </div>
                ) : isBaseball ? (
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center bg-black/20 rounded-xl p-2">
                      <p className="text-accent text-lg font-bold">{player.stats.hits}</p>
                      <p className="text-gray-400 text-[9px]">Hits</p>
                    </div>
                    <div className="text-center bg-black/20 rounded-xl p-2">
                      <p className="text-white text-lg font-bold">{player.stats.runs}</p>
                      <p className="text-gray-400 text-[9px]">Runs</p>
                    </div>
                    <div className="text-center bg-black/20 rounded-xl p-2">
                      <p className="text-white text-lg font-bold">{player.stats.strikeouts}</p>
                      <p className="text-gray-400 text-[9px]">K's</p>
                    </div>
                    <div className="text-center bg-black/20 rounded-xl p-2">
                      <p className="text-accent text-lg font-bold">{player.stats.avg}</p>
                      <p className="text-gray-400 text-[9px]">AVG</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-2">
                    <div className="text-center">
                      <p className="text-accent text-lg font-bold">{player.stats.goals}</p>
                      <p className="text-gray-400 text-[9px]">Buts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-bold">{player.stats.assists}</p>
                      <p className="text-gray-400 text-[9px]">Passes D.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-bold">{player.stats.shots}</p>
                      <p className="text-gray-400 text-[9px]">Tirs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-bold">{player.stats.passes}</p>
                      <p className="text-gray-400 text-[9px]">Passes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-bold">{player.stats.tackles}</p>
                      <p className="text-gray-400 text-[9px]">Tacles</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Momentum Chart */}
      <div className="bg-surface border border-white/5 rounded-3xl p-4">
         <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
           <TrendingUp size={18} className="text-accent" />
           {isTennis ? 'Momentum du Match' : isBaseball ? 'Momentum du Match' : 'Momentum du Match'}
         </h3>
         <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={momentumWithEvents}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A017" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D4A017" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} />
                  <XAxis 
                    dataKey="minute" 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    label={{ 
                      value: isTennis ? "Jeux" : isBaseball ? "Innings" : "Minutes", 
                      position: "insideBottom", 
                      offset: -5, 
                      fill: "#64748b" 
                    }}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  
                  {momentumEvents.map((event, idx) => (
                    <ReferenceDot
                      key={idx}
                      x={event.minute}
                      y={event.value}
                      r={6}
                      fill={
                        event.type === 'goal' || event.type === 'homerun' || event.type === 'ace' ? '#22c55e' : 
                        event.type === 'card' ? '#eab308' : 
                        event.type === 'break' ? '#f97316' : '#3b82f6'
                      }
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                  
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#D4A017" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* Légende */}
         <div className="mt-4 grid grid-cols-3 gap-2">
           <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1">
             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
             <span className="text-green-300 text-xs font-medium">
               {isTennis ? 'Ace' : isBaseball ? 'Home Run' : 'But'}
             </span>
           </div>
           {!isTennis && (
             <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-2 py-1">
               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
               <span className="text-yellow-300 text-xs font-medium">Carton</span>
             </div>
           )}
           <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-2 py-1">
             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
             <span className="text-blue-300 text-xs font-medium">
               {isTennis ? 'Break' : 'Subst.'}
             </span>
           </div>
         </div>
      </div>

      {/* Key Stats Grid */}
      {!isTennis && (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface/50 border border-white/5 rounded-2xl p-4">
               <div className="text-gray-400 text-xs mb-1">
                 {isBaseball ? 'Hits' : 'Tirs Cadrés'}
               </div>
               <div className="text-2xl font-bold text-white">
                 {isBaseball ? '7' : '6'} <span className="text-gray-600 text-lg">/ {isBaseball ? '5' : '4'}</span>
               </div>
            </div>
            <div className="bg-surface/50 border border-white/5 rounded-2xl p-4">
               <div className="text-gray-400 text-xs mb-1">
                 {isBaseball ? 'Strikeouts' : 'Précision Passes'}
               </div>
               <div className="text-2xl font-bold text-white">
                 {isBaseball ? '12' : '88%'} <span className="text-gray-600 text-lg">/ {isBaseball ? '10' : '76%'}</span>
               </div>
            </div>
            <div className="bg-surface/50 border border-white/5 rounded-2xl p-4">
               <div className="text-gray-400 text-xs mb-1">
                 {isBaseball ? 'Runs' : 'Corners'}
               </div>
               <div className="text-2xl font-bold text-white">
                 {isBaseball ? '4' : '6'} <span className="text-gray-600 text-lg">/ {isBaseball ? '2' : '3'}</span>
               </div>
            </div>
            <div className="bg-surface/50 border border-white/5 rounded-2xl p-4">
               <div className="text-gray-400 text-xs mb-1">
                 {isBaseball ? 'Errors' : 'Cartons Jaunes'}
               </div>
               <div className={`text-2xl font-bold ${isBaseball ? 'text-red-500' : 'text-yellow-500'}`}>
                 {isBaseball ? '2' : '1'} <span className="text-gray-600 text-lg">/ {isBaseball ? '1' : '2'}</span>
               </div>
            </div>
        </div>
      )}

    </div>
  );
};