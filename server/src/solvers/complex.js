export function complex(re = 0, im = 0) {
  return { re, im };
}

export function add(a, b) {
  return complex(a.re + b.re, a.im + b.im);
}

export function subtract(a, b) {
  return complex(a.re - b.re, a.im - b.im);
}

export function multiply(a, b) {
  return complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
}

export function divide(a, b) {
  const den = b.re * b.re + b.im * b.im;
  if (Math.abs(den) < 1e-12) {
    throw new Error('Complex division by zero');
  }
  return complex((a.re * b.re + a.im * b.im) / den, (a.im * b.re - a.re * b.im) / den);
}

export function magnitude(a) {
  return Math.sqrt(a.re * a.re + a.im * a.im);
}

export function phaseDeg(a) {
  return (Math.atan2(a.im, a.re) * 180) / Math.PI;
}

export function toPolarString(a) {
  return `${magnitude(a).toFixed(4)} ∠ ${phaseDeg(a).toFixed(2)}°`;
}
