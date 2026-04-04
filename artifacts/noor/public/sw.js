const CACHE_NAME = "noor-v2";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/images/noor-logo.png",
];

let prayerTimings = null;
let lastFiredDay  = "";
const firedPrayers = new Set();

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

/* ── Install: cache static shell ─────────────────────────── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: remove old caches ────────────────────────── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
  startPrayerCheck();
});

/* ── Message: receive prayer timings from main thread ────── */
self.addEventListener("message", (event) => {
  if (event.data?.type === "PRAYER_TIMINGS") {
    prayerTimings = event.data.timings;
  }
});

/* ── Background prayer time check ───────────────────────── */
function startPrayerCheck() {
  setInterval(checkPrayerTime, 30_000);
}

function checkPrayerTime() {
  if (!prayerTimings) return;

  const now  = new Date();
  const day  = now.toDateString();
  const hhmm = String(now.getHours()).padStart(2, "0") + ":" +
               String(now.getMinutes()).padStart(2, "0");

  if (day !== lastFiredDay) {
    firedPrayers.clear();
    lastFiredDay = day;
  }

  for (const prayer of PRAYERS) {
    const pTime = (prayerTimings[prayer] ?? "").slice(0, 5);
    if (pTime !== hhmm) continue;

    const key = `${day}-${prayer}-${hhmm}`;
    if (firedPrayers.has(key)) continue;
    firedPrayers.add(key);

    if (self.Notification && self.Notification.permission === "granted") {
      const label = {
        Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر",
        Maghrib: "المغرب", Isha: "العشاء",
      }[prayer] || prayer;

      self.registration.showNotification(`حان وقت صلاة ${label}`, {
        body: pTime,
        icon: "/noor/images/noor-logo.png",
        badge: "/noor/icon-192.png",
        tag: key,
        requireInteraction: false,
      }).catch(() => {});
    }

    self.clients.matchAll({ includeUncontrolled: true, type: "window" })
      .then((clients) => {
        for (const client of clients) {
          client.postMessage({ type: "ADHAN_TIME", prayer, time: pTime });
        }
      });
  }
}

/* ── Fetch: network-first for API, cache-first for assets ── */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    url.pathname.startsWith("/api") ||
    url.hostname !== self.location.hostname
  ) {
    event.respondWith(fetch(request).catch(() => new Response("", { status: 503 })));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/").then((r) => r || new Response("Offline", { status: 503 }))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (
          response.ok &&
          request.method === "GET" &&
          (url.pathname.match(/\.(png|jpg|jpeg|svg|webp|woff2?|css|js)$/) ||
            url.pathname === "/")
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
