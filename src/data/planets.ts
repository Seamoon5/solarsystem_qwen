export interface PlanetData {
  id: string;
  name: string;
  diameter: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  color: string;
  orbitRadius: number; // px (scaled for display)
  size: number; // px (scaled for display)
  description: string;
  moons: number;
  type: string;
}

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    color: '#b5b5b5',
    orbitRadius: 60,
    size: 6,
    description: 'The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.',
    moons: 0,
    type: 'Terrestrial',
  },
  {
    id: 'venus',
    name: 'Venus',
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    color: '#e8cda0',
    orbitRadius: 90,
    size: 10,
    description: 'The hottest planet due to its thick atmosphere of carbon dioxide. It rotates backwards compared to most planets.',
    moons: 0,
    type: 'Terrestrial',
  },
  {
    id: 'earth',
    name: 'Earth',
    diameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    color: '#4da6ff',
    orbitRadius: 120,
    size: 11,
    description: 'Our home planet — the only known world with liquid water on its surface and life.',
    moons: 1,
    type: 'Terrestrial',
  },
  {
    id: 'mars',
    name: 'Mars',
    diameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    color: '#e27b58',
    orbitRadius: 155,
    size: 8,
    description: 'The Red Planet, named for its iron oxide surface. Home to the tallest volcano in the solar system — Olympus Mons.',
    moons: 2,
    type: 'Terrestrial',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    diameter: 142984,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    color: '#c88b3a',
    orbitRadius: 200,
    size: 22,
    description: 'The largest planet in our solar system. Its Great Red Spot is a storm larger than Earth that has raged for centuries.',
    moons: 95,
    type: 'Gas Giant',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    diameter: 120536,
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    color: '#e8d082',
    orbitRadius: 250,
    size: 19,
    description: 'Famous for its stunning ring system made of ice and rock. It is the least dense planet — it could float in water!',
    moons: 146,
    type: 'Gas Giant',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    diameter: 51118,
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    color: '#7de8e8',
    orbitRadius: 300,
    size: 15,
    description: 'An ice giant that rotates on its side. Its blue-green color comes from methane in its atmosphere.',
    moons: 28,
    type: 'Ice Giant',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    diameter: 49528,
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    color: '#4969e0',
    orbitRadius: 345,
    size: 14,
    description: 'The windiest planet with speeds up to 2,100 km/h. It was the first planet found by mathematical prediction.',
    moons: 16,
    type: 'Ice Giant',
  },
];
