export default function Tracks() {
  return (
    <section id="tracks" className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Two Tracks, Every Week</h2>
      <p className="text-center text-orange-200/60 mb-10">Not mutually exclusive — jump into both whenever you like.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tech Track */}
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6">
          <div className="text-4xl mb-3">💻</div>
          <h3 className="text-xl font-bold text-orange-400 mb-2">Tech Track</h3>
          <p className="text-orange-100/70 text-sm mb-4">
            For people comfortable opening PRs, contributing code, or tackling labeled issues.
          </p>
          <ul className="space-y-2 text-sm">
            {[
              "good-first-issue label for newcomers",
              "Harder issues for experienced contributors",
              "Bug bounty board pulled from all repos",
              "Silly Halloween PR titles & commit messages",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">✓</span>
                <span className="text-orange-100/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Tech Track */}
        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-xl font-bold text-purple-400 mb-2">Non-Tech Track</h3>
          <p className="text-purple-100/70 text-sm mb-4">
            Docs, ideas, community, and fun contributions. No code required. Everyone welcome.
          </p>
          <ul className="space-y-2 text-sm">
            {[
              "Docs fixes: broken links, unclear wording",
              "Async quizzes and learning guides",
              "Idea submissions — no code needed",
              "Pumpkin carving & costume contests",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">✓</span>
                <span className="text-purple-100/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
