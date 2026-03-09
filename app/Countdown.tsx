"use client";

import { useState, useEffect } from "react";

// Update this to the actual time of your Pi Night!
const PI_NIGHT = new Date("2026-03-14T18:00:00");

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

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Avoid SSR mismatch — render nothing until hydrated
  if (!time) {
    return <div className="h-24 sm:h-28" />;
  }

  if (time.done) {
    return (
      <div className="text-center">
        <p className="font-serif text-4xl font-black text-amber-800">
          🥧 It&apos;s Pi Night! 🥧
        </p>
        <p className="text-amber-600 mt-2 text-lg">Time to eat!</p>
      </div>
    );
  }

  const units = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Mins" },
    { value: time.seconds, label: "Secs" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="bg-white/70 backdrop-blur-sm border-2 border-amber-200 rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 min-w-[60px] sm:min-w-[76px] text-center shadow-sm">
            <span className="font-serif text-3xl sm:text-4xl font-black text-amber-800 tabular-nums leading-none block">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-amber-500 font-bold mt-2 uppercase tracking-[0.15em]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
