import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

export default function IslamicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Islamic formatter
  const hijriFmt = new Intl.DateTimeFormat('en-u-ca-islamic', { day: 'numeric', month: 'short' });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">Islamic Calendar</h1>
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-3 bg-background rounded-full hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button onClick={nextMonth} className="p-3 bg-background rounded-full hover:bg-white/10 transition-colors">
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center font-bold text-muted-foreground py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {/* Empty offset days */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="p-4" />
          ))}
          
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            return (
              <div 
                key={day.toISOString()} 
                className={`aspect-square rounded-2xl p-2 md:p-4 flex flex-col justify-between border transition-all cursor-pointer hover:scale-105
                  ${isToday ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-background/50 border-white/5 hover:border-primary/50'}
                `}
              >
                <span className={`text-xl font-bold ${isToday ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {format(day, 'd')}
                </span>
                <span className={`text-xs md:text-sm font-medium ${isToday ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {hijriFmt.format(day)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
