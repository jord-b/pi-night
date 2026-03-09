"use client";

import { useState, useEffect } from "react";

// Update this to the actual time of your Pi Night!
const PI_NIGHT = new Date("2026-03-14T16:00:00");

function getTimeLeft() {
  const diff = PI_NIGHT.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

const UNIT_STYLES = [
  { label: "Days", bg: "bg-rose-500", label_color: "text-rose-500" },
  { label: "Hours", bg: "bg-violet-500", label_color: "text-violet-500" },
  { label: "Mins", bg: "bg-teal-500", label_color: "text-teal-500" },
  { label: "Secs", bg: "bg-orange-400", label_color: "text-orange-400" },
];

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <div className="h-24 sm:h-28" />;
  }

  if (time.done) {
    return (
      <div className="text-center">
        <p className="font-serif text-4xl text-rose-500">
          🥧 It&apos;s Pi Night! 🥧
        </p>
        <p className="text-slate-500 font-bold mt-2 text-lg">Time to eat!</p>
      </div>
    );
  }

  const values = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <div className="flex gap-3 sm:gap-4">
      {UNIT_STYLES.map((style, i) => (
        <div key={style.label} className="flex flex-col items-center">
          <div
            className={`${style.bg} rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 min-w-[60px] sm:min-w-[76px] text-center shadow-md`}
          >
            <span className="font-serif text-3xl sm:text-4xl text-white tabular-nums leading-none block">
              {String(values[i]).padStart(2, "0")}
            </span>
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold mt-2 uppercase tracking-[0.15em] ${style.label_color}`}
          >
            {style.label}
          </span>
        </div>
      ))}
    </div>
  );
}
