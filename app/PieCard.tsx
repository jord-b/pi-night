"use client";

import { useState, useTransition } from "react";
import { deletePie } from "./actions";
import type { PieCommitment } from "@/lib/supabase";

type Config = { label: string; badge: string; bar: string };

export default function PieCard({
  pie,
  config,
}: {
  pie: PieCommitment;
  config: Config;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deletePie(pie.id);
    });
  };

  return (
    <div className="relative pie-card bg-white rounded-2xl shadow-sm border border-violet-100/80 overflow-hidden">
      <div className={`h-1.5 ${config.bar}`} />
      <div className="p-5">
        <div className="text-4xl mb-3 leading-none">🥧</div>
        <h3 className="font-serif text-xl text-violet-900 leading-tight pr-7">
          {pie.pie_name}
        </h3>
        <p className="text-slate-500 font-bold text-sm mt-1">by {pie.name}</p>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${config.badge}`}
          >
            {config.label}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            &middot; Serves {pie.serves}
          </span>
        </div>
        {pie.notes && (
          <p className="text-xs text-slate-400 mt-3 leading-relaxed italic border-t border-violet-50 pt-3">
            {pie.notes}
          </p>
        )}
      </div>

      {/* Trash button */}
      <button
        onClick={() => setConfirming(true)}
        className="absolute top-3.5 right-3.5 text-slate-300 hover:text-rose-400 transition-colors"
        aria-label="Remove pie"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>

      {/* Confirm overlay */}
      {confirming && (
        <div className="absolute inset-0 bg-white/96 rounded-2xl flex flex-col items-center justify-center gap-3 p-4">
          <p className="font-bold text-slate-700 text-sm text-center">
            Remove this pie?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors disabled:opacity-60"
            >
              {isPending ? "Removing…" : "Yes, remove"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
