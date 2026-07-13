import data from "@/data/issues.json";
import IssuesClient from "./IssuesClient";

export default function Issues() {
  return (
    <section id="issues" className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Open Issues</h2>
      <p className="text-center text-orange-200/60 mb-10">
        All open issues across every public Interledger repo — filter by label or repo to find your entry point.
      </p>

      <IssuesClient
        issues={data.issues}
        fetchedAt={data.fetchedAt}
        repoCount={data.repoCount}
      />
    </section>
  );
}
