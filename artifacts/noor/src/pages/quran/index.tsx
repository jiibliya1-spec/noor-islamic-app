import { useState } from "react";
import { Link } from "wouter";
import { useSurahList } from "@/hooks/use-external-api";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function QuranList() {
  const { data: surahs, isLoading } = useSurahList();
  const [search, setSearch] = useState("");

  const filteredSurahs = surahs?.filter(s => 
    s.englishName.toLowerCase().includes(search.toLowerCase()) || 
    s.name.includes(search) ||
    s.englishNameTranslation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">The Holy Quran</h1>
          <p className="text-muted-foreground">Read, listen and study the words of Allah.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <Input 
            className="pl-12 py-6 bg-card/50 border-white/10 rounded-2xl text-lg"
            placeholder="Search surah..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
          {filteredSurahs?.map((surah) => (
            <Link key={surah.number} href={`/quran/${surah.number}`} className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl group flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center font-mono font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {surah.number}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{surah.englishName}</h3>
                  <p className="text-sm text-muted-foreground">{surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-quran text-2xl text-primary">{surah.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
