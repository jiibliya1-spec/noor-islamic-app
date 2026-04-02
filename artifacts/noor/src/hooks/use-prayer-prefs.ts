const KEY = "noor_prayer_prefs";

export interface PrayerPrefs {
  type: "city" | "coords";
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
  method: string;
}

export function loadPrayerPrefs(): PrayerPrefs | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PrayerPrefs) : null;
  } catch {
    return null;
  }
}

export function savePrayerPrefs(prefs: PrayerPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage quota errors
  }
}
