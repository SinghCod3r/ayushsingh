"use client";

import { useEffect, useState } from "react";

/** Live local time for a city. Renders nothing until mounted to avoid hydration drift. */
export function LocalTime({ city, timeZone }: { city: string; timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 30_000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(now)
    : "";

  return (
    <p className="text-sm text-muted">
      {city}
      <span className="ml-2 inline-block min-w-[3.2ch] tabular-nums">{time}</span>
    </p>
  );
}
