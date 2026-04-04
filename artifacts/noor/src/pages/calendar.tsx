import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Trash2, Moon } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from "date-fns";
import { useI18n } from "@/lib/i18n";

// Compute Hijri info for a date
function getHijriInfo(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-u-ca-islamic", { day: "numeric", month: "numeric", year: "numeric" });
  const parts = fmt.formatToParts(date);
  const m = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return {
    day: parseInt(m.day || "1"),
    month: parseInt(m.month || "1"),
    year: parseInt(m.year || "1445"),
    display: new Intl.DateTimeFormat("en-u-ca-islamic", { day: "numeric", month: "short" }).format(date),
  };
}

function getIslamicEvent(day: number, month: number): string | null {
  const events: [number, number, string][] = [
    [1, 1, "Islamic New Year"],
    [10, 1, "Day of Ashura"],
    [12, 3, "Mawlid an-Nabi"],
    [27, 7, "Isra' wal Mi'raj"],
    [1, 9, "Start of Ramadan"],
    [27, 9, "Laylat al-Qadr"],
    [1, 10, "Eid al-Fitr"],
    [2, 10, "Eid al-Fitr"],
    [3, 10, "Eid al-Fitr"],
    [10, 12, "Eid al-Adha"],
    [11, 12, "Eid al-Adha"],
    [12, 12, "Eid al-Adha"],
  ];
  const found = events.find(([d, m]) => d === day && m === month);
  return found ? found[2] : null;
}

function isRamadan(month: number) { return month === 9; }
function isEidFitr(day: number, month: number) { return month === 10 && day <= 3; }
function isEidAdha(day: number, month: number) { return month === 12 && day >= 10 && day <= 13; }

interface EventForm {
  title: string;
  description: string;
  type: "personal" | "reminder";
}

export default function IslamicCalendar() {
  const { language } = useI18n();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<EventForm>({ title: "", description: "", type: "personal" });

  const [events, setEvents] = useState<Array<{ id: number; title: string; description: string; date: string; hijriDate: string; type: string }>>(() => {
    try { return JSON.parse(localStorage.getItem("noor_calendar_events") || "[]"); } catch { return []; }
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);

  const hijriFmt = new Intl.DateTimeFormat("en-u-ca-islamic", { day: "numeric", month: "short" });

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setShowForm(false);
  };

  const saveEvents = (updated: typeof events) => {
    setEvents(updated);
    localStorage.setItem("noor_calendar_events", JSON.stringify(updated));
  };

  const handleAddEvent = () => {
    if (!selectedDay || !form.title.trim()) return;
    const hi = getHijriInfo(selectedDay);
    const newEvent = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      date: format(selectedDay, "yyyy-MM-dd"),
      hijriDate: hi.display,
      type: form.type,
    };
    saveEvents([...events, newEvent]);
    setForm({ title: "", description: "", type: "personal" });
    setShowForm(false);
  };

  const handleDeleteEvent = (id: number) => {
    saveEvents(events.filter(e => e.id !== id));
  };

  const eventsOnDay = (day: Date) =>
    events.filter(e => e.date === format(day, "yyyy-MM-dd"));

  const selectedDayEvents = selectedDay ? eventsOnDay(selectedDay) : [];

  const dir = language === "ar" ? "rtl" : "ltr";
  const monthLabel = format(currentDate, "MMMM yyyy");

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-full pb-20" dir={dir}>
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {language === "ar" ? "التقويم الإسلامي" : "Islamic Calendar"}
      </h1>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Ramadan</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Eid</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> Islamic Event</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-400 inline-block" /> Your Event</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">{monthLabel}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2.5 rounded-full bg-background hover:bg-white/10 transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2.5 rounded-full bg-background hover:bg-white/10 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-center text-xs font-bold text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startPadding }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map(day => {
              const today = isSameDay(day, new Date());
              const selected = selectedDay && isSameDay(day, selectedDay);
              const hi = getHijriInfo(day);
              const islamicEvent = getIslamicEvent(hi.day, hi.month);
              const inRamadan = isRamadan(hi.month);
              const inEidFitr = isEidFitr(hi.day, hi.month);
              const inEidAdha = isEidAdha(hi.day, hi.month);
              const userEvents = eventsOnDay(day);
              const isFriday = getDay(day) === 5;

              let bgClass = "bg-background/30 hover:bg-white/10 border-white/5";
              if (today) bgClass = "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20";
              else if (selected) bgClass = "bg-primary/20 border-primary/60";
              else if (inEidFitr || inEidAdha) bgClass = "bg-amber-400/15 border-amber-400/40";
              else if (inRamadan) bgClass = "bg-green-500/10 border-green-500/30";
              else if (isFriday) bgClass = "bg-blue-500/5 border-blue-500/20";

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl p-1 flex flex-col justify-between border transition-all hover:scale-105 ${bgClass}`}
                >
                  <span className={`text-sm font-bold ${today ? "text-primary-foreground" : "text-foreground"}`}>
                    {format(day, "d")}
                  </span>
                  <span className={`text-[9px] font-medium leading-tight ${today ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {hijriFmt.format(day)}
                  </span>
                  {(islamicEvent || userEvents.length > 0) && (
                    <div className="flex gap-0.5 mt-0.5 flex-wrap">
                      {islamicEvent && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                      {userEvents.map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Panel */}
        <div className="glass-card rounded-3xl p-6 flex flex-col">
          {selectedDay ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{format(selectedDay, "MMMM d, yyyy")}</h3>
                  <p className="text-sm text-primary">{getHijriInfo(selectedDay).display} AH</p>
                </div>
                <button onClick={() => setSelectedDay(null)} className="p-1.5 rounded-full hover:bg-white/10 transition">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Islamic event banner */}
              {(() => {
                const hi = getHijriInfo(selectedDay);
                const ev = getIslamicEvent(hi.day, hi.month);
                const inRam = isRamadan(hi.month);
                return ev || inRam ? (
                  <div className={`rounded-xl p-3 mb-4 text-sm font-semibold ${
                    isEidFitr(hi.day, hi.month) || isEidAdha(hi.day, hi.month) ? "bg-amber-400/20 text-amber-300" : "bg-blue-400/20 text-blue-300"
                  }`}>
                    <span className="inline-flex items-center gap-1.5">
                      <Moon className="w-4 h-4 inline-block" />
                      {ev || "Ramadan"}
                    </span>
                  </div>
                ) : null;
              })()}

              {/* User events */}
              <div className="flex-1 space-y-3 mb-4">
                {selectedDayEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events on this day.</p>
                ) : (
                  selectedDayEvents.map(e => (
                    <div key={e.id} className="flex items-start justify-between p-3 bg-purple-400/10 rounded-xl border border-purple-400/20">
                      <div>
                        <p className="font-semibold text-foreground">{e.title}</p>
                        {e.description && <p className="text-xs text-muted-foreground mt-0.5">{e.description}</p>}
                        <span className="text-xs text-purple-300 capitalize">{e.type}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(e.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive rounded-full hover:bg-white/10 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add event */}
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {language === "ar" ? "إضافة حدث" : "Add Event"}
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    className="w-full px-3 py-2.5 rounded-xl bg-background/70 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary"
                    placeholder="Event title..."
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  />
                  <input
                    className="w-full px-3 py-2.5 rounded-xl bg-background/70 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary"
                    placeholder="Description (optional)"
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  />
                  <select
                    className="w-full px-3 py-2.5 rounded-xl bg-background/70 border border-white/10 text-foreground text-sm"
                    value={form.type}
                    onChange={e => setForm(p => ({ ...p, type: e.target.value as EventForm["type"] }))}
                  >
                    <option value="personal">Personal</option>
                    <option value="reminder">Reminder</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddEvent}
                      disabled={!form.title.trim()}
                      className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 rounded-xl bg-card text-muted-foreground text-sm hover:bg-white/10 transition"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Login required to save events across devices</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <CalendarIcon />
              <p className="mt-4 font-medium">Click any day to see events or add a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
