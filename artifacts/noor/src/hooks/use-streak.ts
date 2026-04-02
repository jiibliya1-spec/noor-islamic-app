const STREAK_KEY = "noor_streak";

export interface StreakData {
  lastActiveDate: string; // "YYYY-MM-DD"
  streak: number;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadStreakData(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw) as StreakData;
  } catch {
    // ignore
  }
  return { lastActiveDate: "", streak: 0 };
}

/**
 * Increment the streak for today if it hasn't been counted yet.
 * - Same day  → no-op, returns current data
 * - Yesterday → streak + 1
 * - Older     → streak resets to 1
 */
export function bumpStreak(): StreakData {
  const today = todayStr();
  const data = loadStreakData();

  if (data.lastActiveDate === today) return data; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const newStreak =
    data.lastActiveDate === yesterdayStr ? data.streak + 1 : 1;

  const newData: StreakData = { lastActiveDate: today, streak: newStreak };
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(newData));
  } catch {
    // ignore storage quota errors
  }
  return newData;
}
