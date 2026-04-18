import { gaussianElimination, formatMatrix } from './linearAlgebra.js';

export function solveMesh(payload) {
  const { meshCount, resistanceMatrix, voltageVector } = payload;

  if (!Number.isInteger(meshCount) || meshCount < 1) {
    throw new Error('meshCount must be a positive integer');
  }

  if (!Array.isArray(resistanceMatrix) || resistanceMatrix.length !== meshCount) {
    throw new Error('resistanceMatrix must be meshCount x meshCount');
  }

  const A = resistanceMatrix.map((row) => row.map(Number));
  const b = voltageVector.map(Number);

  const solved = gaussianElimination(A, b);

  return {
    equations: A.map((row, i) => `${row.map((v, j) => `${v}I${j + 1}`).join(' + ')} = ${b[i]}`),
    matrixForm: {
      A,
      b,
      pretty: `${formatMatrix(A)}\n=\n[ ${b.join(', ')} ]`,
    },
    steps: solved.steps,
    meshCurrents: solved.solution.map((v, i) => ({ mesh: i + 1, current: Number(v.toFixed(6)) })),
  };
}
