"use client";

import { useState, useMemo } from "react";

interface Label {
  name: string;
  color: string;
}

interface Issue {
  id: number;
  number: number;
  title: string;
  url: string;
  repo: string;
  repoUrl: string;
  labels: Label[];
  createdAt: string;
  updatedAt: string;
  comments: number;
  assignees: number;
}

interface Props {
  issues: Issue[];
  fetchedAt: string | null;
  repoCount: number;
}

const PRIORITY_LABELS = ["good first issue", "good-first-issue", "hacktoberfest"];

function labelColor(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return {
    bg: `#${hex}26`,
    border: `#${hex}66`,
    text: luminance > 0.5 ? `#${hex}` : `#${hex}`,
    dot: `#${hex}`,
  };
}

export default function IssuesClient({ issues, fetchedAt, repoCount }: Props) {
  const [search, setSearch] = useState("");
  const [activeRepo, setActiveRepo] = useState<string>("all");
  const [activeLabel, setActiveLabel] = useState<string>("all");

  const repos = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of issues) counts.set(i.repo, (counts.get(i.repo) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [issues]);

  const labelCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of issues) {
      for (const l of i.labels) {
        counts.set(l.name, (counts.get(l.name) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, [issues]);

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      if (activeRepo !== "all" && i.repo !== activeRepo) return false;
      if (activeLabel !== "all" && !i.labels.some((l) => l.name === activeLabel)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!i.title.toLowerCase().includes(q) && !i.repo.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [issues, activeRepo, activeLabel, search]);

  const isGoodFirst = (i: Issue) =>
    i.labels.some((l) => PRIORITY_LABELS.includes(l.name.toLowerCase()));

  const fetchedDate = fetchedAt
    ? new Date(fetchedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  if (issues.length === 0) {
    return (
      <div className="text-center py-16 text-white/30">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-sm">No issues loaded yet.</p>
        <p className="text-xs mt-1 font-mono">Run <span className="text-orange-400">npm run fetch-issues</span> to populate this section.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Meta bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
        <span>
          <span className="text-white/70 font-semibold">{issues.length}</span> open issues across{" "}
          <span className="text-white/70 font-semibold">{repoCount}</span> repos
        </span>
        {fetchedDate && <span>Last updated {fetchedDate}</span>}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search issues or repos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50"
        />

        {/* Label filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveLabel("all")}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              activeLabel === "all"
                ? "bg-white/15 border-white/30 text-white"
                : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
            }`}
          >
            All labels
          </button>
          {labelCounts.map(([name, count]) => (
            <button
              key={name}
              onClick={() => setActiveLabel(activeLabel === name ? "all" : name)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                activeLabel === name
                  ? "bg-orange-500/20 border-orange-500/50 text-orange-300"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {name} <span className="opacity-50">({count})</span>
            </button>
          ))}
        </div>

        {/* Repo filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveRepo("all")}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              activeRepo === "all"
                ? "bg-white/15 border-white/30 text-white"
                : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
            }`}
          >
            All repos
          </button>
          {repos.map(([name, count]) => (
            <button
              key={name}
              onClick={() => setActiveRepo(activeRepo === name ? "all" : name)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                activeRepo === name
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {name} <span className="opacity-50">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-white/30">
        Showing {filtered.length} of {issues.length} issues
      </p>

      {/* Issue list */}
      <ul className="flex flex-col gap-2">
        {filtered.map((issue) => (
          <li key={issue.id}>
            <a
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 px-4 py-3.5 transition-colors"
            >
              {/* Good-first-issue indicator */}
              <span
                className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  isGoodFirst(issue) ? "bg-orange-400" : "bg-white/15"
                }`}
                title={isGoodFirst(issue) ? "Good first issue" : ""}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-white/80 group-hover:text-white leading-snug transition-colors">
                    {issue.title}
                  </p>
                  <span className="text-white/20 group-hover:text-white/40 text-xs shrink-0 mt-0.5 transition-colors">
                    ↗
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs text-purple-400/70 font-mono">
                    {issue.repo}#{issue.number}
                  </span>

                  {issue.labels.map((label) => {
                    const c = labelColor(label.color);
                    return (
                      <span
                        key={label.name}
                        className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                        style={{
                          background: c.bg,
                          borderColor: c.border,
                          color: c.dot,
                        }}
                      >
                        {label.name}
                      </span>
                    );
                  })}

                  {issue.comments > 0 && (
                    <span className="text-[10px] text-white/25">
                      💬 {issue.comments}
                    </span>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-white/30 py-8">No issues match your filters.</p>
      )}
    </div>
  );
}
