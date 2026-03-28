import { useState } from "react";
import { Link } from "wouter";
import { useSurahList } from "@/hooks/use-external-api";
import { Search, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function QuranList() {
  const { data: surahs, isLoading } = useSurahList();
  const [search, setSearch] = useState("");
  const { language } = useI18n();

  const filteredSurahs = surahs?.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
    String(s.number).includes(search)
  );

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-full" dir={dir}>
      {/* Sticky search header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <h1 className="text-xl font-bold text-foreground mb-2">
          {language === "ar" ? "القرآن الكريم" : "The Holy Quran"}
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary"
            placeholder="Search surah name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSurahs?.map(surah => (
              <Link
                key={surah.number}
                href={`/quran/${surah.number}`}
                className="glass-card rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center font-mono font-bold text-primary text-sm shrink-0">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{surah.englishName}</h3>
                    <p className="text-xs text-muted-foreground">{surah.englishNameTranslation} · {surah.numberOfAyahs} ayahs</p>
                  </div>
                </div>
                <span className="font-quran text-xl text-primary shrink-0 ml-2">{surah.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
