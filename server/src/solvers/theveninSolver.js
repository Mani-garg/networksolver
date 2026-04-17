export function solveThevenin(payload) {
  const {
    sourceVoltage,
    sourceResistance,
    loadResistance,
  } = payload;

  const Vs = Number(sourceVoltage);
  const Rs = Number(sourceResistance);
  const Rl = Number(loadResistance);

  if (Rs <= 0 || Rl <= 0) {
    throw new Error('Resistances must be > 0');
  }

  const voc = Vs;
  const isc = Vs / Rs;
  const rth = Rs;
  const inorton = isc;
  const vload = (Vs * Rl) / (Rs + Rl);

  return {
    openCircuitVoltage: Number(voc.toFixed(6)),
    shortCircuitCurrent: Number(isc.toFixed(6)),
    equivalentResistance: Number(rth.toFixed(6)),
    nortonCurrent: Number(inorton.toFixed(6)),
    loadVoltage: Number(vload.toFixed(6)),
    steps: [
      `Vth = Voc = ${voc.toFixed(4)} V`,
      `Rth = deactivate source => ${rth.toFixed(4)} Ω`,
      `In = Isc = Vth / Rth = ${inorton.toFixed(4)} A`,
      `Vload = Vs * Rl / (Rs + Rl) = ${vload.toFixed(4)} V`,
    ],
  };
}
