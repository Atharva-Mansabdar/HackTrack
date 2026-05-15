"use client";

import { useState, useMemo } from "react";
import { Hackathon, HackathonFormat } from "@/lib/devpost";
import HackathonCard from "./HackathonCard";

type FormatFilter = HackathonFormat | "all";

export default function HackathonList({ hackathons }: { hackathons: Hackathon[] }) {
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      if (formatFilter !== "all" && h.format !== formatFilter) return false;
      if (query && !h.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [hackathons, formatFilter, query]);

  const formatOptions: { value: FormatFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "online", label: "Online" },
    { value: "in-person", label: "In-person" },
    { value: "hybrid", label: "Hybrid" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search hackathons…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-2">
          {formatOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFormatFilter(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                formatFilter === opt.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">No hackathons match your filters.</p>
          <button
            onClick={() => { setFormatFilter("all"); setQuery(""); }}
            className="text-indigo-600 hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} hackathon{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((h) => (
              <HackathonCard key={h.id} h={h} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
