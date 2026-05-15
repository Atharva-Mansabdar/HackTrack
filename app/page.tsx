import { fetchDevpostHackathons } from "@/lib/devpost";
import HackathonViewer from "@/app/components/HackathonViewer";

export const revalidate = 86400;

export default async function Home() {
  const hackathons = await fetchDevpostHackathons(3);

  return (
    <div className="h-full">
      <HackathonViewer hackathons={hackathons} />
    </div>
  );
}
