export type DemoDay = {
  date: string;
  recovery: number;
  ansCharge: number;
  sleepScore: number;
  sleepHours: number;
  hrv: number;
  restingHr: number;
  strain: number;
  sport: string | null;
  srpe: number | null;
};

export function getDemoData(days = 30): DemoDay[] {
  const sports = [null, "Trail run", null, "Strength", "Climbing", null, "Cycle", "Swim", null, "Trail run"];
  return Array.from({ length: days }, (_, index) => {
    const offset = days - 1 - index;
    const date = new Date(Date.UTC(2026, 10, 23));
    date.setUTCDate(date.getUTCDate() - offset);
    const cycle = (index * 7 + index * index) % 11;
    const recovery = 58 + ((index * 13) % 29);
    return {
      date: date.toISOString().slice(0, 10),
      recovery,
      ansCharge: 4 + (cycle % 4),
      sleepScore: 72 + ((index * 9) % 24),
      sleepHours: 6.5 + ((index * 4) % 18) / 10,
      hrv: 48 + ((index * 5) % 22),
      restingHr: 51 + ((index * 3) % 7),
      strain: Number((2 + ((index * 11) % 115) / 10).toFixed(1)),
      sport: sports[index % sports.length],
      srpe: sports[index % sports.length] && (sports[index % sports.length] === "Climbing" || sports[index % sports.length] === "Strength") ? 240 + index * 7 : null,
    };
  });
}
