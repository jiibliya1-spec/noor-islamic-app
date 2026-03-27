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
      // Fetch Arabic and English parallel
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
      
      return {
        ...arData.data,
        ayahs
      };
    },
    enabled: !!surahNumber,
  });
}

// 2. Prayer Times API
export function usePrayerTimes(city: string, country: string) {
  return useQuery({
    queryKey: ["prayer-times", city, country],
    queryFn: async () => {
      if (!city || !country) return null;
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!city && !!country,
  });
}

export function usePrayerTimesByCoords(lat: number, lng: number) {
  return useQuery({
    queryKey: ["prayer-times-coords", lat, lng],
    queryFn: async () => {
      if (!lat || !lng) return null;
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!lat && !!lng,
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
