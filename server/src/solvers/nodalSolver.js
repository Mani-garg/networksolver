import { gaussianElimination, formatMatrix } from './linearAlgebra.js';

export function solveNodal(payload) {
  const { nodeCount, resistors = [], currentSources = [] } = payload;

  if (!Number.isInteger(nodeCount) || nodeCount < 1) {
    throw new Error('nodeCount must be a positive integer');
  }

  const A = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(0));
  const b = Array(nodeCount).fill(0);
  const equationTerms = Array.from({ length: nodeCount }, () => []);

  resistors.forEach((r) => {
    const from = r.from - 1;
    const to = r.to - 1;
    const value = Number(r.resistance);

    if (value <= 0) {
      throw new Error('Resistance must be > 0');
    }

    const g = 1 / value;

    if (from >= 0 && from < nodeCount) {
      A[from][from] += g;
      equationTerms[from].push(`${g.toFixed(4)}V${from + 1}`);
      if (to >= 0) {
        A[from][to] -= g;
        equationTerms[from].push(`-${g.toFixed(4)}V${to + 1}`);
      }
    }

    if (to >= 0 && to < nodeCount) {
      A[to][to] += g;
      equationTerms[to].push(`${g.toFixed(4)}V${to + 1}`);
      if (from >= 0) {
        A[to][from] -= g;
        equationTerms[to].push(`-${g.toFixed(4)}V${from + 1}`);
      }
    }
  });

  currentSources.forEach((s) => {
    const to = s.to - 1;
    const from = s.from - 1;
    const current = Number(s.current);

    if (to >= 0 && to < nodeCount) {
      b[to] += current;
    }
    if (from >= 0 && from < nodeCount) {
      b[from] -= current;
    }
  });

  const equations = equationTerms.map((terms, idx) => `${terms.join(' ')} = ${b[idx].toFixed(4)}`);

  const solved = gaussianElimination(A, b);

  return {
    equations,
    matrixForm: {
      A,
      b,
      pretty: `${formatMatrix(A)}\n=\n[ ${b.map((x) => Number(x.toFixed(6))).join(', ')} ]`,
    },
    steps: solved.steps,
    nodeVoltages: solved.solution.map((v, i) => ({ node: i + 1, voltage: Number(v.toFixed(6)) })),
  };
}
