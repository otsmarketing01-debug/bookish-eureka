"use client";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Booking = {
  id: string;
  name: string;
  service: string;
  preferredDate: string;
  preferredSlot: string;
  status: string;
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const statusColors: Record<string, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  confirmed: "bg-info/15 text-info border-info/30",
  completed: "bg-success/15 text-success border-success/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30 line-through",
};

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function BookingsCalendar({ bookings }: { bookings: Booking[] }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // Group bookings by date
  const byDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const key = b.preferredDate; // already ISO date string
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    }
    return map;
  }, [bookings]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  // Build grid: Monday-first weeks
  const firstOfMonth = new Date(year, month, 1);
  const startDay = (firstOfMonth.getDay() + 6) % 7; // 0 = Monday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => setCursor(new Date(year, month - 1, 1));
  const nextMonth = () => setCursor(new Date(year, month + 1, 1));
  const goToday = () => setCursor(new Date(today.getFullYear(), today.getMonth(), 1));

  const monthBookings = bookings.filter((b) => {
    const d = new Date(b.preferredDate);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold tracking-tight">{monthNames[month]} {year}</h2>
          <Badge variant="outline">{monthBookings.length} booking{monthBookings.length !== 1 ? "s" : ""}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={goToday} className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
            Today
          </button>
          <button onClick={nextMonth} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="mt-4 grid grid-cols-7 gap-1">
        {dayNames.map((d) => (
          <div key={d} className="py-1 text-center text-xs font-semibold text-muted-foreground">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="min-h-[72px] rounded-md bg-muted/30 sm:min-h-[96px]" />;
          const key = toDateKey(date);
          const dayBookings = byDate.get(key) ?? [];
          const isToday = date.getTime() === today.getTime();
          const isPast = date < today;
          return (
            <div
              key={i}
              className={cn(
                "min-h-[72px] rounded-md border p-1 sm:min-h-[96px] sm:p-1.5",
                isToday ? "border-primary ring-1 ring-primary/30" : "border-border",
                isPast && !isToday && "bg-muted/20",
                dayBookings.length > 0 && !isPast && "bg-primary/5"
              )}
            >
              <div className={cn(
                "mb-1 text-right text-xs font-medium",
                isToday ? "text-primary" : isPast ? "text-muted-foreground/50" : "text-muted-foreground"
              )}>
                {date.getDate()}
              </div>
              <div className="space-y-0.5">
                {dayBookings.slice(0, 3).map((b) => (
                  <div
                    key={b.id}
                    className={cn(
                      "truncate rounded px-1 py-0.5 text-[10px] font-medium sm:text-[11px]",
                      statusColors[b.status] ?? "bg-muted text-muted-foreground"
                    )}
                    title={`${b.name} — ${b.service} (${b.preferredSlot})`}
                  >
                    <span className="hidden sm:inline">{b.name.split(" ")[0]} · </span>{b.service.split(" ")[0]}
                  </div>
                ))}
                {dayBookings.length > 3 && (
                  <div className="px-1 text-[10px] text-muted-foreground">+{dayBookings.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs">
        <span className="text-muted-foreground">Status:</span>
        {Object.entries(statusColors).map(([status, cls]) => (
          <span key={status} className={cn("rounded px-1.5 py-0.5 font-medium capitalize", cls)}>{status}</span>
        ))}
        <span className="ml-auto flex items-center gap-1 text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" /> Mon–Sat (closed Sun)
        </span>
      </div>
    </div>
  );
}
