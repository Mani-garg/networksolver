import { add, complex, divide, multiply, phaseDeg } from './complex.js';

function impedance(component, omega) {
  if (component.type === 'R') {
    return complex(Number(component.value), 0);
  }

  if (component.type === 'L') {
    const xL = omega * Number(component.value);
    return complex(0, xL);
  }

  if (component.type === 'C') {
    const xC = -1 / (omega * Number(component.value));
    return complex(0, xC);
  }

  throw new Error(`Unknown component type: ${component.type}`);
}

export function solveAC(payload) {
  const { frequency, sourceVoltage, seriesComponents = [] } = payload;
  const omega = 2 * Math.PI * Number(frequency);
  const Vs = complex(Number(sourceVoltage), 0);

  if (omega <= 0) throw new Error('frequency must be > 0');

  const zTotal = seriesComponents.reduce((acc, component) => add(acc, impedance(component, omega)), complex(0, 0));
  const current = divide(Vs, zTotal);

  const voltageDrops = seriesComponents.map((component) => {
    const z = impedance(component, omega);
    const v = multiply(current, z);
    return {
      component,
      impedance: z,
      voltage: v,
      magnitude: Number(Math.hypot(v.re, v.im).toFixed(6)),
      phaseDeg: Number(phaseDeg(v).toFixed(6)),
    };
  });

  return {
    omega: Number(omega.toFixed(6)),
    totalImpedance: {
      re: Number(zTotal.re.toFixed(6)),
      im: Number(zTotal.im.toFixed(6)),
      magnitude: Number(Math.hypot(zTotal.re, zTotal.im).toFixed(6)),
      phaseDeg: Number(phaseDeg(zTotal).toFixed(6)),
    },
    current: {
      re: Number(current.re.toFixed(6)),
      im: Number(current.im.toFixed(6)),
      magnitude: Number(Math.hypot(current.re, current.im).toFixed(6)),
      phaseDeg: Number(phaseDeg(current).toFixed(6)),
    },
    voltageDrops,
  };
}
