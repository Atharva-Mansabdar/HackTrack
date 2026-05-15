"use client";

import { useState } from "react";
import { Hackathon } from "@/lib/devpost";

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function formatMeta(h: Hackathon): string {
  const parts: string[] = [];
  if (h.submissionPeriodDates) parts.push(h.submissionPeriodDates.toLowerCase());
  if (h.format === "online") parts.push("online");
  else if (h.location) parts.push(h.location.toLowerCase());
  if (h.prizeAmount) parts.push(h.prizeAmount.toLowerCase() + " prize");
  return parts.join(" › ");
}

function HackathonRow({
  h,
  isSelected,
  onSelect,
}: {
  h: Hackathon;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  // Details show only while actively hovered, or when explicitly selected by click
  const active = isSelected || hovered;
  const meta = formatMeta(h);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className="cursor-pointer"
    >
      <a
        href={h.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontSize: 18,
          fontWeight: active ? 700 : 400,
          textDecoration: active ? "underline" : "none",
          textUnderlineOffset: 4,
          opacity: active ? 1 : 0.7,
          display: "inline-block",
          lineHeight: 1.3,
          transition: "opacity 0.15s ease",
        }}
      >
        {slugify(h.title)}
      </a>

      {/* Expandable detail — only shown while hovered or explicitly selected */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: active ? "1fr" : "0fr",
          transition: "grid-template-rows 0.25s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingTop: 6, paddingBottom: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            {h.themes.length > 0 && (
              <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 420, opacity: 0.9 }}>
                {h.themes.slice(0, 6).join(", ").toLowerCase()}
              </p>
            )}
            {meta && (
              <p style={{ fontSize: 11, color: "var(--muted)" }}>{meta}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HackathonViewer({ hackathons }: { hackathons: Hackathon[] }) {
  // null = nothing selected; clicking an item selects it persistently
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (hackathons.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-sm" style={{ color: "var(--muted)" }}>
        no hackathons found.
      </div>
    );
  }

  const selected = selectedIndex !== null ? hackathons[selectedIndex] : hackathons[0];

  return (
    <div className="h-full flex flex-col relative" style={{ color: "var(--fg)" }}>

      {/* Right stripe */}
      <div
        className="absolute top-0 right-0 h-full w-[52px] pointer-events-none z-0"
        style={{ backgroundColor: "rgb(250, 247, 241)" }}
      />

      {/* Branding — vertical text sitting at the top of the stripe */}
      <div
        className="absolute top-6 right-0 w-[52px] flex justify-center z-10"
        style={{ pointerEvents: "none" }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            userSelect: "none",
          }}
        >
          hacktrack / 2025
        </span>
      </div>

      {/* Nav */}
      <nav className="flex items-center px-8 pt-6 pb-2 shrink-0 z-10 relative" style={{ fontSize: 11 }}>
        <div className="flex gap-7">
          <button className="underline underline-offset-4 tracking-wide">upcoming</button>
          <button className="hover:underline underline-offset-4 tracking-wide transition-all" style={{ color: "var(--muted)" }}>past</button>
          <button className="hover:underline underline-offset-4 tracking-wide transition-all" style={{ color: "var(--muted)" }}>saved</button>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden relative z-10">

        {/* Left — logo anchored top-left */}
        <div className="w-[36%] shrink-0 flex flex-col justify-start px-8 pt-4 select-none pointer-events-none overflow-hidden">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(100px, 18vw, 280px)",
              lineHeight: 0.88,
              color: "rgb(79, 68, 56)",
              letterSpacing: "-0.02em",
            }}
          >
            ht
          </span>
        </div>

        {/* Right — scrollable flat list */}
        <div className="flex-1 overflow-y-auto pt-6 pr-4 pb-6 pl-0 flex flex-col gap-3 mr-[52px]">
          {hackathons.map((h, i) => (
            <HackathonRow
              key={h.id}
              h={h}
              isSelected={i === selectedIndex}
              onSelect={() => setSelectedIndex(i === selectedIndex ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between px-8 py-5 shrink-0 relative z-10">
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          scroll to explore
        </span>

        <a
          href={selected.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:opacity-60 transition-opacity mr-[52px]"
          style={{ fontSize: 12 }}
        >
          register <span style={{ color: "rgb(41, 30, 19)" }}>→</span>
        </a>
      </div>
    </div>
  );
}
