"use client";

import { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deletePie(pie.id);
    });
  };

  return (
    <div className={`relative pie-card bg-white rounded-2xl shadow-sm border border-violet-100/80 overflow-hidden transition-opacity ${isPending ? "opacity-40" : ""}`}>
      <div className={`h-1.5 ${config.bar}`} />
      <div className="p-5">
        <div className="text-4xl mb-3 leading-none">🥧</div>
        <h3 className="font-serif text-xl text-violet-900 leading-tight pr-7">
          {pie.pie_name}
        </h3>
        <p className="text-slate-500 font-bold text-sm mt-1">by {pie.name}</p>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${config.badge}`}>
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

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="absolute top-3.5 right-3.5 text-slate-400 hover:text-rose-500 transition-colors disabled:opacity-40"
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
    </div>
  );
}
