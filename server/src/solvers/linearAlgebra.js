export function gaussianElimination(A, b) {
  const n = A.length;
  const matrix = A.map((row, i) => [...row, b[i]]);
  const steps = [];

  for (let i = 0; i < n; i += 1) {
    let maxRow = i;
    for (let k = i + 1; k < n; k += 1) {
      if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = k;
      }
    }

    if (Math.abs(matrix[maxRow][i]) < 1e-12) {
      throw new Error('Singular matrix encountered while solving equations.');
    }

    if (maxRow !== i) {
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      steps.push(`Swap R${i + 1} with R${maxRow + 1}`);
    }

    for (let k = i + 1; k < n; k += 1) {
      const factor = matrix[k][i] / matrix[i][i];
      for (let j = i; j < n + 1; j += 1) {
        matrix[k][j] -= factor * matrix[i][j];
      }
      steps.push(`R${k + 1} = R${k + 1} - (${factor.toFixed(4)}) * R${i + 1}`);
    }
  }

  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i -= 1) {
    let sum = matrix[i][n];
    for (let j = i + 1; j < n; j += 1) {
      sum -= matrix[i][j] * x[j];
    }
    x[i] = sum / matrix[i][i];
    steps.push(`x${i + 1} = ${x[i].toFixed(6)}`);
  }

  return { solution: x, steps, upperTriangular: matrix.map((row) => row.slice()) };
}

export function formatMatrix(matrix) {
  return matrix
    .map((row) => row.map((v) => (Math.abs(v) < 1e-10 ? 0 : Number(v.toFixed(6)))))
    .map((row) => `[ ${row.join(', ')} ]`)
    .join('\n');
}
