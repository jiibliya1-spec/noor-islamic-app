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
- **Quran**: Full 114 surahs from alquran.cloud API, Arabic text + translation, audio with 3 reciters
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

- **Quran**: https://api.alquran.cloud/v1/surah
- **Prayer Times**: https://api.aladhan.com/v1/timings
- **Mosque Search**: https://overpass-api.de/api/interpreter (OpenStreetMap)
- **Geocoding**: https://nominatim.openstreetmap.org/search
- **Audio**: https://cdn.islamic.network/quran/audio-surah/ (3 reciters)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
