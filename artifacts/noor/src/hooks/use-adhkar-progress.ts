const DAY_KEY   = "noor_adhkar_day";   // today's completed dhikr IDs (resets each day)
const TOTAL_KEY = "noor_adhkar_total"; // lifetime count of individual dhikr completions

interface DayProgress {
  date: string;       // "YYYY-MM-DD"
  completedIds: string[];
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// ── Day progress (resets on new calendar day) ─────────────────────────────

export function loadAdhkarDayProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(DAY_KEY);
    if (!raw) return new Set();
    const data = JSON.parse(raw) as DayProgress;
    if (data.date === todayStr()) return new Set(data.completedIds);
  } catch {
    // ignore
  }
  return new Set(); // new day or invalid data
}

export function saveAdhkarDayProgress(completedIds: Set<string>): void {
  try {
    const data: DayProgress = {
      date: todayStr(),
      completedIds: Array.from(completedIds),
    };
    localStorage.setItem(DAY_KEY, JSON.stringify(data));
  } catch {
    // ignore storage quota errors
  }
}

// ── Lifetime total ────────────────────────────────────────────────────────

export function getAdhkarTotal(): number {
  try {
    return parseInt(localStorage.getItem(TOTAL_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

export function incrementAdhkarTotal(): void {
  try {
    localStorage.setItem(TOTAL_KEY, String(getAdhkarTotal() + 1));
  } catch {
    // ignore
  }
}
