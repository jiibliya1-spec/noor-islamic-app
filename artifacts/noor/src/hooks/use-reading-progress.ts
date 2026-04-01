export interface ReadingProgress {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayahNumber: number;
  savedAt: number;
}

const KEY = "noor_reading_progress";

export function saveProgress(p: Omit<ReadingProgress, "savedAt">) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...p, savedAt: Date.now() }));
  } catch {
    // ignore storage errors
  }
}

export function loadProgress(): ReadingProgress | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReadingProgress) : null;
  } catch {
    return null;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
