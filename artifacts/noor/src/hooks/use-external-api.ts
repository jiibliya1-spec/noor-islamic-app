import { useQuery } from "@tanstack/react-query";

// 1. Quran APIs
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export function useSurahList() {
  return useQuery({
    queryKey: ["quran", "surahs"],
    queryFn: async () => {
      const res = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await res.json();
      return data.data as Surah[];
    },
  });
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export function useSurahDetail(surahNumber: number) {
  return useQuery({
    queryKey: ["quran", "surah", surahNumber],
    queryFn: async () => {
      const [arRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`)
      ]);
      const arData = await arRes.json();
      const enData = await enRes.json();
      const ayahs = arData.data.ayahs.map((ayah: Ayah, index: number) => ({
        ...ayah,
        translation: enData.data.ayahs[index].text
      }));
      return { ...arData.data, ayahs };
    },
    enabled: !!surahNumber,
  });
}

// Tafsir — alquran.cloud editions:
//   ar.muyassar  = التفسير الميسر  (Saudi Ministry)
//   en.maududi   = Tafhim al-Quran (Maududi)
export function useTafsir(
  surahNumber: number,
  ayahNumber: number,
  language: string,
  enabled: boolean
) {
  const edition = language === "ar" ? "ar.muyassar" : "en.maududi";
  return useQuery({
    queryKey: ["tafsir", surahNumber, ayahNumber, edition],
    queryFn: async () => {
      const ref = `${surahNumber}:${ayahNumber}`;
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${ref}/${edition}`);
      const data = await res.json();
      return (data.data?.text || "") as string;
    },
    enabled: enabled && surahNumber > 0 && ayahNumber > 0,
    staleTime: 1000 * 60 * 30,
  });
}

// Word-by-word meanings via Quran.com v4 (CORS-enabled public API)
export interface WordData {
  id: number;
  position: number;
  text_uthmani: string;
  char_type_name: string;
  transliteration?: { text: string };
  translation?: { text: string };
}

export function useWordMeanings(
  surahNumber: number,
  ayahNumber: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["words", surahNumber, ayahNumber],
    queryFn: async () => {
      const key = `${surahNumber}:${ayahNumber}`;
      const res = await fetch(
        `https://api.quran.com/api/v4/verses/by_key/${key}?words=true&word_translations=true&word_transliteration=true`
      );
      const data = await res.json();
      const words: WordData[] = data.verse?.words || [];
      return words.filter(w => w.char_type_name === "word");
    },
    enabled: enabled && surahNumber > 0 && ayahNumber > 0,
    staleTime: 1000 * 60 * 60,
  });
}

// 2. Prayer Times API — method + school=0 (Shafi'i) params in cache key + request
export function usePrayerTimes(city: string, country: string, method: string = "3") {
  return useQuery({
    queryKey: ["prayer-times", city, country, method],
    queryFn: async () => {
      if (!city || !country) return null;
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&school=0`
      );
      const data = await res.json();
      if (data.code !== 200) throw new Error(data.status || "API error");
      return data.data;
    },
    enabled: !!city && !!country,
    retry: 1,
  });
}

export function usePrayerTimesByCoords(lat: number, lng: number, method: string = "3") {
  return useQuery({
    queryKey: ["prayer-times-coords", lat, lng, method],
    queryFn: async () => {
      if (!lat || !lng) return null;
      const timestamp = Math.floor(Date.now() / 1000);
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=${method}&school=0`
      );
      const data = await res.json();
      if (data.code !== 200) throw new Error(data.status || "API error");
      return data.data;
    },
    enabled: !!lat && !!lng,
    retry: 1,
  });
}

// 3. Mosques (OpenStreetMap)
export function useMosquesNearBy(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ["mosques", lat, lng],
    queryFn: async () => {
      if (!lat || !lng) return [];
      const query = `
        [out:json];
        node["amenity"="place_of_worship"]["religion"="muslim"](around:5000,${lat},${lng});
        out body;
      `;
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query
      });
      const data = await res.json();
      return data.elements || [];
    },
    enabled: !!lat && !!lng,
  });
}

export function useGeocodeCity(city: string) {
  return useQuery({
    queryKey: ["geocode", city],
    queryFn: async () => {
      if (!city) return null;
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), name: data[0].display_name };
      }
      return null;
    },
    enabled: !!city,
  });
}
