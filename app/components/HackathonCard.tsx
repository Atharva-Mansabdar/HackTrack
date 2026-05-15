import { Hackathon } from "@/lib/devpost";

const formatBadgeClass: Record<string, string> = {
  online: "bg-blue-100 text-blue-800",
  "in-person": "bg-green-100 text-green-800",
  hybrid: "bg-purple-100 text-purple-800",
};

export default function HackathonCard({ h }: { h: Hackathon }) {
  return (
    <a
      href={h.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {h.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={h.thumbnailUrl}
          alt={h.title}
          className="w-full h-36 object-cover"
        />
      )}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 leading-tight">
            {h.title}
          </h2>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
              formatBadgeClass[h.format] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {h.format}
          </span>
        </div>

        {h.organizationName && (
          <p className="text-xs text-gray-500">{h.organizationName}</p>
        )}

        <p className="text-xs text-gray-600">{h.submissionPeriodDates}</p>

        {h.location && h.format !== "online" && (
          <p className="text-xs text-gray-500">📍 {h.location}</p>
        )}

        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {h.themes.slice(0, 4).map((theme) => (
            <span
              key={theme}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {theme}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          {h.prizeAmount && (
            <span className="font-medium text-green-700">🏆 {h.prizeAmount}</span>
          )}
          <span>{h.registrationsCount.toLocaleString()} registered</span>
        </div>

        {h.timeLeftToSubmission && (
          <p className="text-xs text-orange-600 font-medium">
            ⏳ {h.timeLeftToSubmission}
          </p>
        )}
      </div>
    </a>
  );
}
