# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a full-stack Islamic web application called "Noor" (meaning "Light").

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/noor)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Auth**: JWT (jsonwebtoken) + crypto (scrypt for password hashing)
- **State**: Zustand (i18n), TanStack React Query (server state)

## Noor Application Features

- **Authentication**: JWT login/register/logout, token in localStorage
- **Home**: Real-time clock, Hijri + Gregorian date, verse of the day, next prayer countdown
- **Quran**: Full 114 surahs from alquran.cloud API, mushaf-style Arabic + translation, audio with 3 reciters
  - **Bookmarks**: bottom-sheet per-verse bookmark with gold icon indicator, saved to localStorage
  - **Reading progress**: IntersectionObserver auto-saves last viewed ayah; "Continue Reading" banner deep-links back
  - **Tafsir**: per-verse tafsir (ar.muyassar / en.maududi) fetched lazily from alquran.cloud
  - **Word meanings**: word-by-word meanings from api.quran.com v4 (Arabic + transliteration + English)
  - **Quranic Duas**: 12 authentic duas from the Quran (4 languages, transliteration, contextual notes)
  - **Completion Duas**: 6 authentic Khatm al-Quran duas (4 languages, source attribution)
- **Prayer Times**: Location-based using aladhan.com API, geolocation or Makkah fallback
- **Adhkar**: Morning, Evening, Sleep, After-Prayer, Daily categories with tasbeeh counter
- **Islamic Calendar**: Full calendar with Hijri dates, Islamic holidays highlighted, user events
- **Mosques**: OpenStreetMap search by city or GPS location
- **Dashboard**: User stats and activity
- **Settings**: Language switcher (en/ar/fr/de), theme
- **Multi-language**: Arabic RTL, English, French, German

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── noor/                  # React + Vite frontend (previewPath: /)
│   └── api-server/            # Express API server (previewPath: /api)
├── lib/
│   ├── api-spec/              # OpenAPI spec + Orval codegen config
│   ├── api-client-react/      # Generated React Query hooks
│   ├── api-zod/               # Generated Zod schemas from OpenAPI
│   └── db/                    # Drizzle ORM schema + DB connection
│       └── src/schema/
│           ├── users.ts
│           ├── userPreferences.ts
│           ├── adhkarProgress.ts
│           ├── favorites.ts
│           └── calendarEvents.ts
└── scripts/                   # Utility scripts
```

## External APIs Used

- **Quran**: https://api.alquran.cloud/v1/surah + per-verse edition endpoint
- **Tafsir**: https://api.alquran.cloud/v1/ayah/{ref}/{edition} (ar.muyassar / en.maududi)
- **Word meanings**: https://api.quran.com/api/v4/verses/by_key/{key}?words=true
- **Prayer Times**: https://api.aladhan.com/v1/timings
- **Mosque Search**: https://overpass-api.de/api/interpreter (OpenStreetMap)
- **Geocoding**: https://nominatim.openstreetmap.org/search
- **Audio**: https://cdn.islamic.network/quran/audio-surah/ (3 reciters)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
