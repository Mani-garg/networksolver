export const defaultPayloads = {
  nodal: {
    nodeCount: 2,
    resistors: [
      { from: 1, to: 0, resistance: 10 },
      { from: 1, to: 2, resistance: 5 },
      { from: 2, to: 0, resistance: 20 },
    ],
    currentSources: [{ from: 0, to: 1, current: 2 }],
  },
  mesh: {
    meshCount: 2,
    resistanceMatrix: [
      [10, -2],
      [-2, 8],
    ],
    voltageVector: [12, 5],
  },
  thevenin: {
    sourceVoltage: 24,
    sourceResistance: 6,
    loadResistance: 12,
  },
  ac: {
    frequency: 50,
    sourceVoltage: 120,
    seriesComponents: [
      { type: 'R', value: 10 },
      { type: 'L', value: 0.1 },
      { type: 'C', value: 0.0001 },
    ],
  },
};
