import { useState, useCallback } from "react";

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayahNumber: number;
  text: string;
  translation: string;
  savedAt: number;
}

const KEY = "noor_quran_bookmarks";

function load(): Bookmark[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function persist(bookmarks: Bookmark[]) {
  localStorage.setItem(KEY, JSON.stringify(bookmarks));
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(load);

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) =>
      bookmarks.some(b => b.id === `${surahNumber}:${ayahNumber}`),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (bookmark: Omit<Bookmark, "id" | "savedAt">) => {
      const id = `${bookmark.surahNumber}:${bookmark.ayahNumber}`;
      const current = load();
      const exists = current.some(b => b.id === id);
      const next = exists
        ? current.filter(b => b.id !== id)
        : [...current, { ...bookmark, id, savedAt: Date.now() }];
      persist(next);
      setBookmarks(next);
    },
    []
  );

  const removeBookmark = useCallback((surahNumber: number, ayahNumber: number) => {
    const id = `${surahNumber}:${ayahNumber}`;
    const next = load().filter(b => b.id !== id);
    persist(next);
    setBookmarks(next);
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, removeBookmark };
}
