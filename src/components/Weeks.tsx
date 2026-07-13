const weeks = [
  {
    week: 1,
    dates: "Oct 1–7",
    title: "Warm-Up & Orientation",
    emoji: "🔥",
    intensity: "medium" as const,
    techActivities: [
      "Good-first-issue board goes live via the repo-aggregator tool",
      "Harder and open issues surfaced for experienced contributors",
      "Self-serve: dive straight into labeled issues, no scavenger hunt needed",
    ],
    nonTechActivities: [
      "Repo spotlight countdown: one repo highlighted each day",
      "Star & share: star repos, share the aggregator tool link",
      "Async kickoff quiz on Open Payments & Interledger basics",
    ],
  },
  {
    week: 2,
    dates: "Oct 8–14",
    title: "Bug Squashing",
    emoji: "🐛",
    intensity: "high" as const,
    techActivities: [
      "Bug bounty board pulled from labeled issues across repos",
      "Submit via DM to Bibi on Slack with your PR link",
      "Flat Bug Squasher badge for anyone with 1+ merged fixes",
    ],
    nonTechActivities: [
      "Docs bugs: broken links, unclear wording, outdated setup steps",
      "Fix directly or open as an issue — both count",
      "Same flat Bug Squasher badge shared with the tech track",
    ],
  },
  {
    week: 3,
    dates: "Oct 15–21",
    title: "Learn & Reflect",
    emoji: "📚",
    intensity: "light" as const,
    techActivities: [
      "Async 'How to Start Contributing to Open Source' guide",
      "Optional light challenge for those following the Ecosystem Hackathon from afar",
      "Community watch party thread for the Oct 16–17 in-person hackathon",
    ],
    nonTechActivities: [
      "Async 'What is Open Source' guide for students and newcomers",
      "Idea Submission opens: ecosystem ideas, no code required",
      "Online pumpkin carving via play.pumpkinstudio.co — free, no sign-up",
    ],
  },
  {
    week: 4,
    dates: "Oct 22–31",
    title: "Halloween Wrap & Celebration",
    emoji: "👻",
    intensity: "medium" as const,
    techActivities: [
      "Costume-your-PR: silly PR titles and commit messages encouraged",
      "Spookiest Bug award for the strangest bug squashed all month",
      "Async show-and-tell: drop a screenshot or one-liner about what you made",
    ],
    nonTechActivities: [
      "Gen-AI spookiest costume contest (no gore or blood)",
      "Best Treasure or Contribution Found award",
      "General shoutouts and community celebration",
    ],
  },
];

const intensityBadge = {
  light: "bg-green-500/20 text-green-300 border-green-500/30",
  medium: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  high: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const intensityLabel = {
  light: "Light week",
  medium: "Medium lift",
  high: "Full sprint",
};

const nodeRing = {
  light: "ring-green-500/50 bg-green-950",
  medium: "ring-orange-500/50 bg-orange-950",
  high: "ring-purple-500/50 bg-purple-950",
};

export default function Weeks() {
  return (
    <section id="weeks" className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Week-by-Week Sprints</h2>
      <p className="text-center text-orange-200/60 mb-12">
        Each sprint stands alone — join in week 3 having missed weeks 1 and 2 with no loss of context.
      </p>

      {/* Track column headers */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">💻</span>
          <span className="text-sm font-bold uppercase tracking-widest text-orange-400">Tech Track</span>
        </div>
        <div className="w-32" />
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm font-bold uppercase tracking-widest text-purple-400">Non-Tech Track</span>
          <span className="text-xl">✨</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {weeks.map((w, i) => {
          const isLast = i === weeks.length - 1;
          return (
            <div key={w.week} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-6 items-start">

              {/* Tech Track — left */}
              <div className="hidden md:block py-6 pr-4">
                <TrackCard color="orange" items={w.techActivities} />
              </div>

              {/* Center: line + node */}
              <div className="flex flex-col items-center w-32">
                {/* Top connector line (hidden for first) */}
                <div className={`w-px flex-none ${i === 0 ? "h-6 bg-transparent" : "h-6 bg-white/10"}`} />

                {/* Node */}
                <div
                  className={`relative z-10 flex flex-col items-center text-center rounded-2xl ring-2 px-4 py-3 w-full ${nodeRing[w.intensity]}`}
                >
                  <div className="text-2xl mb-1">{w.emoji}</div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Week {w.week}</div>
                  <div className="text-sm font-bold text-white leading-tight mt-0.5">{w.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{w.dates}</div>
                  <span
                    className={`mt-2 text-[10px] px-2 py-0.5 rounded-full border font-semibold ${intensityBadge[w.intensity]}`}
                  >
                    {intensityLabel[w.intensity]}
                  </span>
                </div>

                {/* Bottom connector line (hidden for last) */}
                <div className={`w-px grow min-h-6 ${isLast ? "bg-transparent" : "bg-white/10"}`} />
              </div>

              {/* Non-Tech Track — right */}
              <div className="hidden md:block py-6 pl-4">
                <TrackCard color="purple" items={w.nonTechActivities} />
              </div>

              {/* Mobile: both tracks stacked below the node */}
              <div className="md:hidden px-4 pb-6 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mt-2">💻 Tech Track</div>
                <TrackCard color="orange" items={w.techActivities} />
                <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mt-1">✨ Non-Tech Track</div>
                <TrackCard color="purple" items={w.nonTechActivities} />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

function TrackCard({ color, items }: { color: "orange" | "purple"; items: string[] }) {
  const dot = color === "orange" ? "text-orange-400" : "text-purple-400";
  const card =
    color === "orange"
      ? "bg-orange-500/5 border-orange-500/20"
      : "bg-purple-500/5 border-purple-500/20";

  return (
    <div className={`rounded-xl border p-4 ${card}`}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/70">
            <span className={`${dot} mt-0.5 shrink-0`}>›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
