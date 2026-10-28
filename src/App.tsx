import { useState, useEffect, useRef, useCallback } from 'react';
import { planets, PlanetData } from './data/planets';

export default function App() {
  const [angles, setAngles] = useState<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(angles);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    const newAngles = anglesRef.current.map((angle, i) => {
      const orbitalSpeed = (2 * Math.PI) / (planets[i].orbitalPeriod / 365);
      return angle + orbitalSpeed * delta * speed * 0.5;
    });

    anglesRef.current = newAngles;
    setAngles([...newAngles]);
    animationRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  const getPlanetPosition = (index: number) => {
    const planet = planets[index];
    const x = Math.cos(angles[index]) * planet.orbitRadius;
    const y = Math.sin(angles[index]) * planet.orbitRadius * 0.4; // elliptical perspective
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a2e] via-[#0d0d3a] to-[#000011] text-white overflow-hidden relative">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 pb-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
          ☀️ Solar System Explorer
        </h1>
        <p className="text-gray-400 text-sm mt-1">Click on any planet to learn more</p>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 px-4">
        {/* Solar System Visualization */}
        <div className="relative flex-shrink-0" style={{ width: '720px', height: '400px' }}>
          {/* Sun */}
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              width: '44px',
              height: '44px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #fff7a0, #ffaa00, #ff6600)',
              boxShadow: '0 0 30px #ffaa00, 0 0 60px #ff6600, 0 0 90px rgba(255, 100, 0, 0.3)',
              animationDuration: '3s',
            }}
          />

          {/* Orbit paths */}
          {planets.map((planet, i) => (
            <div
              key={`orbit-${i}`}
              className="absolute rounded-full border border-white/10"
              style={{
                width: `${planet.orbitRadius * 2}px`,
                height: `${planet.orbitRadius * 0.8}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Planets */}
          {planets.map((planet, i) => {
            const pos = getPlanetPosition(i);
            const isHovered = hoveredPlanet === planet.id;
            const isSelected = selectedPlanet?.id === planet.id;
            return (
              <div
                key={planet.id}
                className="absolute cursor-pointer transition-transform duration-200"
                style={{
                  width: `${planet.size + (isHovered ? 6 : 0)}px`,
                  height: `${planet.size + (isHovered ? 6 : 0)}px`,
                  top: `calc(50% + ${pos.y}px)`,
                  left: `calc(50% + ${pos.x}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: pos.y > 0 ? 20 : 10,
                }}
                onClick={() => setSelectedPlanet(planet)}
                onMouseEnter={() => setHoveredPlanet(planet.id)}
                onMouseLeave={() => setHoveredPlanet(null)}
              >
                <div
                  className="w-full h-full rounded-full transition-all duration-200"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${adjustColor(planet.color, -40)})`,
                    boxShadow: isSelected
                      ? `0 0 12px ${planet.color}, 0 0 24px ${planet.color}`
                      : isHovered
                      ? `0 0 8px ${planet.color}`
                      : `0 0 3px ${planet.color}40`,
                    border: isSelected ? `2px solid white` : 'none',
                  }}
                />
                {/* Saturn's ring */}
                {planet.id === 'saturn' && (
                  <div
                    className="absolute rounded-full border-2 border-yellow-300/50"
                    style={{
                      width: `${planet.size * 1.8}px`,
                      height: `${planet.size * 0.5}px`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotateX(70deg)',
                    }}
                  />
                )}
                {/* Planet label on hover */}
                {isHovered && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-black/70 px-2 py-0.5 rounded">
                    {planet.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Planet Info Panel */}
        <div className="w-full lg:w-80 min-h-[300px]">
          {selectedPlanet ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}, ${adjustColor(selectedPlanet.color, -40)})`,
                    boxShadow: `0 0 15px ${selectedPlanet.color}60`,
                  }}
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedPlanet.name}</h2>
                  <span className="text-xs text-gray-400">{selectedPlanet.type}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{selectedPlanet.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <InfoCard label="Diameter" value={`${selectedPlanet.diameter.toLocaleString()} km`} icon="📏" />
                <InfoCard label="Distance" value={`${selectedPlanet.distanceFromSun} M km`} icon="📍" />
                <InfoCard label="Orbital Period" value={`${selectedPlanet.orbitalPeriod.toLocaleString()} days`} icon="🔄" />
                <InfoCard label="Moons" value={`${selectedPlanet.moons}`} icon="🌙" />
              </div>
              <button
                onClick={() => setSelectedPlanet(null)}
                className="mt-4 w-full text-center text-xs text-gray-500 hover:text-white transition-colors"
              >
                ✕ Close
              </button>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
              <div className="text-5xl mb-3">🪐</div>
              <p className="text-gray-400 text-center text-sm">
                Click on any planet in the solar system to view its details
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {planets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlanet(p)}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span className="text-[9px] text-gray-400">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex flex-col items-center mt-4 pb-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-center gap-6">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Play
              </>
            )}
          </button>

          {/* Speed Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Speed:</span>
            <button
              onClick={() => setSpeed(Math.max(0.25, speed / 2))}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition-colors"
            >
              −
            </button>
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${((Math.log2(speed) + 2) / 4) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setSpeed(Math.min(16, speed * 2))}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition-colors"
            >
              +
            </button>
            <span className="text-xs text-yellow-300 font-mono w-12 text-center">
              {speed}x
            </span>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              const newAngles = planets.map(() => Math.random() * Math.PI * 2);
              anglesRef.current = newAngles;
              setAngles(newAngles);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>

        {/* Planet quick nav */}
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {planets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanet(p)}
              className={`px-2 py-1 rounded-full text-[10px] transition-all duration-200 ${
                selectedPlanet?.id === p.id
                  ? 'bg-white/20 text-white'
                  : 'text-gray-500 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: p.color }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-2.5 text-center">
      <div className="text-lg mb-0.5">{icon}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-xs font-semibold text-gray-200 mt-0.5">{value}</div>
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
