import { describe, expect, it } from "vitest";
import { hrvRecoveryScore, modifiedTrimp, trimpToStrain } from "./metrics";

describe("metric calculations", () => {
  it("calculates zero TRIMP for resting samples", () => {
    expect(modifiedTrimp([{ seconds: 60, bpm: 50 }], 50, 190)).toBe(0);
  });

  it("maps TRIMP through the 0-21 strain curve", () => {
    expect(trimpToStrain(0)).toBe(0);
    expect(trimpToStrain(100)).toBeCloseTo(14.67, 1);
  });

  it("returns an insufficient-history state", () => {
    expect(hrvRecoveryScore(50, [50])).toBeNull();
  });

  it("normalizes a rolling HRV baseline", () => {
    const score = hrvRecoveryScore(60, [50, 52, 54, 56, 58, 60]);
    expect(score).not.toBeNull();
    expect(score!).toBeGreaterThanOrEqual(0);
    expect(score!).toBeLessThanOrEqual(100);
  });
});
