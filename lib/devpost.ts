export type HackathonFormat = "online" | "in-person" | "hybrid";

export type Hackathon = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  format: HackathonFormat;
  location: string;
  submissionPeriodDates: string;
  timeLeftToSubmission: string;
  themes: string[];
  prizeAmount: string | null;
  registrationsCount: number;
  organizationName: string | null;
  openState: string;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function iconToFormat(icon: string): HackathonFormat {
  if (icon === "globe") return "online";
  if (icon === "map-marker-alt") return "in-person";
  return "hybrid";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapHackathon(raw: any): Hackathon {
  return {
    id: String(raw.id),
    title: raw.title ?? "",
    url: raw.url ?? "",
    thumbnailUrl: raw.thumbnail_url ?? "",
    format: iconToFormat(raw.displayed_location?.icon ?? ""),
    location: raw.displayed_location?.location ?? "",
    submissionPeriodDates: raw.submission_period_dates ?? "",
    timeLeftToSubmission: raw.time_left_to_submission ?? "",
    themes: (raw.themes ?? []).map((t: { name: string }) => t.name),
    prizeAmount: raw.prize_amount ? stripHtml(raw.prize_amount) : null,
    registrationsCount: raw.registrations_count ?? 0,
    organizationName: raw.organization_name ?? null,
    openState: raw.open_state ?? "",
  };
}

export async function fetchDevpostHackathons(pages = 3): Promise<Hackathon[]> {
  const allHackathons: Hackathon[] = [];

  for (let page = 1; page <= pages; page++) {
    const url = `https://devpost.com/api/hackathons?status=upcoming&challenge_type=all&order_by=deadline&page=${page}`;
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) break;

    const data = await res.json();
    const hackathons: Hackathon[] = (data.hackathons ?? []).map(mapHackathon);
    allHackathons.push(...hackathons);

    if (hackathons.length === 0) break;
  }

  return allHackathons;
}
