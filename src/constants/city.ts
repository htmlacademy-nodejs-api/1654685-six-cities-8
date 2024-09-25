import { City, Coordinates } from '@/shared/types/index.js';

export const coordinatesCityMap: Record<City, Coordinates> = {
  [City.PARIS]: { x: 48.85661, y: 2.351499 },
  [City.COLOGNE]: { x: 50.938361, y: 6.959974 },
  [City.HAMBURG]: { x: 53.550341, y: 10.000654 },
  [City.BRUSSELS]: { x: 50.846557, y: 4.351697 },
  [City.AMSTERDAM]: { x: 52.370216, y: 4.895168 },
  [City.DUSSELDORF]: { x: 51.225402, y: 6.776314 },
};
