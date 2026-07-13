#!/usr/bin/env node
/**
 * Fetches all open issues across every public Interledger GitHub repo.
 * Output: src/data/issues.json
 *
 * Usage:
 *   node scripts/fetch-issues.mjs
 *   GITHUB_TOKEN=ghp_xxx node scripts/fetch-issues.mjs
 *
 * A GITHUB_TOKEN is strongly recommended — unauthenticated requests are
 * rate-limited to 60/hour, which won't be enough to cover all repos.
 * Create a fine-grained token with read-only public repo access at:
 *   https://github.com/settings/tokens
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORG = "interledger";
const OUTPUT = join(__dirname, "../src/data/issues.json");

const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "ilf-hacktoberfest-scraper",
  ...(token && { Authorization: `Bearer ${token}` }),
};

if (!token) {
  console.warn(
    "⚠  No GITHUB_TOKEN set. Rate limit is 60 req/hour — you may hit it.\n" +
    "   Set GITHUB_TOKEN=ghp_... to raise the limit to 5000 req/hour.\n"
  );
}

async function ghFetch(url) {
  const res = await fetch(url, { headers });
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    const resetAt = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : "unknown";
    throw new Error(`Rate limited. Resets at ${resetAt}. Set GITHUB_TOKEN to avoid this.`);
  }
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} — ${url}\n${await res.text()}`);
  }
  return res.json();
}

async function paginate(baseUrl) {
  const results = [];
  let page = 1;
  while (true) {
    const sep = baseUrl.includes("?") ? "&" : "?";
    const data = await ghFetch(`${baseUrl}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return results;
}

// ── 1. Fetch all public repos ──────────────────────────────────────────────
console.log(`\nFetching repos for github.com/${ORG}…`);
const repos = await paginate(
  `https://api.github.com/orgs/${ORG}/repos?type=public&sort=updated`
);
console.log(`  Found ${repos.length} public repos`);

// ── 2. Fetch open issues per repo ─────────────────────────────────────────
const allIssues = [];
let skipped = 0;

for (const repo of repos) {
  if (repo.archived) { skipped++; continue; }
  if (repo.open_issues_count === 0) { skipped++; continue; }

  process.stdout.write(`  [${allIssues.length} issues] ${repo.name}…\r`);

  try {
    const raw = await paginate(
      `https://api.github.com/repos/${ORG}/${repo.name}/issues?state=open`
    );
    // The issues API also returns PRs — filter them out
    const issues = raw.filter((i) => !i.pull_request);

    for (const i of issues) {
      allIssues.push({
        id: i.id,
        number: i.number,
        title: i.title,
        url: i.html_url,
        repo: repo.name,
        repoUrl: repo.html_url,
        labels: i.labels.map((l) => ({ name: l.name, color: l.color })),
        createdAt: i.created_at,
        updatedAt: i.updated_at,
        comments: i.comments,
        assignees: i.assignees?.length ?? 0,
      });
    }
  } catch (err) {
    console.error(`\n  ✗ Skipping ${repo.name}: ${err.message}`);
  }
}

// ── 3. Sort: good-first-issue first, then by most recently updated ─────────
const priority = (issue) =>
  issue.labels.some((l) =>
    ["good first issue", "good-first-issue"].includes(l.name.toLowerCase())
  )
    ? 0
    : 1;

allIssues.sort((a, b) => {
  const pd = priority(a) - priority(b);
  if (pd !== 0) return pd;
  return new Date(b.updatedAt) - new Date(a.updatedAt);
});

// ── 4. Write output ────────────────────────────────────────────────────────
mkdirSync(dirname(OUTPUT), { recursive: true });
const output = {
  fetchedAt: new Date().toISOString(),
  repoCount: repos.length - skipped,
  issueCount: allIssues.length,
  issues: allIssues,
};
writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

console.log(`\n✓ Saved ${allIssues.length} issues from ${repos.length - skipped} repos`);
console.log(`  → ${OUTPUT}\n`);
