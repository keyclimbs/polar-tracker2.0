export function modifiedTrimp(samples: Array<{ seconds: number; bpm: number }>, restingHr: number, maxHr: number, sex: "male" | "female" = "male") {
  if (maxHr <= restingHr) return 0;
  const b = sex === "male" ? 1.92 : 1.67;
  return samples.reduce((sum, sample) => {
    const delta = Math.max(0, Math.min(1, (sample.bpm - restingHr) / (maxHr - restingHr)));
    return sum + (sample.seconds / 60) * delta * Math.exp(b * delta);
  }, 0);
}

export function trimpToStrain(trimp: number) {
  return 21 * (1 - Math.exp(-0.012 * Math.max(0, trimp)));
}

export function hrvRecoveryScore(todayRmssd: number, rolling: number[]) {
  if (!Number.isFinite(todayRmssd) || todayRmssd <= 0 || rolling.length < 2) return null;
  const values = rolling.filter((value) => Number.isFinite(value) && value > 0).map(Math.log);
  if (values.length < 2) return null;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance);
  if (std === 0) return null;
  const z = (Math.log(todayRmssd) - mean) / std;
  return Math.round(Math.max(0, Math.min(100, z * 16.67 + 50)));
}
