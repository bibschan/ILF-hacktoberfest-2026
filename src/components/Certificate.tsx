const criteria = [
  {
    icon: "💻",
    label: "Merged a PR",
    detail: "Any bug fix, feature, or improvement merged into an ILF repo",
    track: "Tech",
  },
  {
    icon: "📝",
    label: "Fixed a docs issue",
    detail: "Corrected a broken link, unclear wording, or outdated step",
    track: "Non-Tech",
  },
  {
    icon: "💡",
    label: "Submitted an idea",
    detail: "Shared an idea for how the Interledger or Open Payments ecosystem could be used",
    track: "Non-Tech",
  },
  {
    icon: "⭐",
    label: "Completed a community activity",
    detail: "Took part in a quiz, spotlight, pumpkin carving, costume contest, or show-and-tell",
    track: "Non-Tech",
  },
];

const steps = [
  {
    step: "01",
    title: "Participate",
    body: "Complete at least one activity in any week, on either track. Tech and non-tech contributions both qualify.",
  },
  {
    step: "02",
    title: "Submit",
    body: "DM Bibi on Slack with a link or screenshot of your contribution — a PR, an issue, an idea post, or a community activity.",
  },
  {
    step: "03",
    title: "Receive",
    body: "You'll get a digital certificate of participation by email — a shareable PDF you can add to your portfolio or LinkedIn.",
  },
];

export default function Certificate() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Certificate of Participation</h2>
      <p className="text-center text-orange-200/60 mb-12">
        Everyone who contributes — in any way, in any week — can earn one.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: certificate preview */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-orange-500/30 via-purple-500/20 to-orange-500/10 blur-lg" />
          <div className="relative rounded-2xl border border-orange-500/40 bg-[#120a1f] p-8 text-center flex flex-col items-center gap-3">
            {/* Corner ornaments */}
            <div className="absolute top-3 left-3 text-orange-500/30 text-lg select-none">✦</div>
            <div className="absolute top-3 right-3 text-orange-500/30 text-lg select-none">✦</div>
            <div className="absolute bottom-3 left-3 text-orange-500/30 text-lg select-none">✦</div>
            <div className="absolute bottom-3 right-3 text-orange-500/30 text-lg select-none">✦</div>

            <div className="text-4xl">🎃</div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-orange-400/70">
              Interledger Foundation
            </p>
            <h3 className="text-xl font-extrabold text-white leading-tight">
              Certificate of Participation
            </h3>
            <div className="w-16 h-px bg-orange-500/40 my-1" />
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              This certifies that{" "}
              <span className="italic text-white/60">[ Participant Name ]</span>{" "}
              contributed to the Interledger Foundation's Hacktoberfest 2025.
            </p>
            <div className="w-16 h-px bg-orange-500/40 my-1" />
            <p className="text-xs text-orange-300/60 font-mono">October 2025</p>
            <div className="mt-2 flex gap-2">
              <span className="text-xs px-3 py-1 rounded-full border border-orange-500/30 text-orange-400/70 bg-orange-500/5">
                Digital · PDF
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-purple-500/30 text-purple-400/70 bg-purple-500/5">
                Shareable
              </span>
            </div>
          </div>
        </div>

        {/* Right: eligibility + steps */}
        <div className="flex flex-col gap-8">
          {/* Eligibility */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Eligibility — complete at least one of these
            </p>
            <ul className="flex flex-col gap-3">
              {criteria.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{c.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{c.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          c.track === "Tech"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {c.track}
                      </span>
                    </div>
                    <p className="text-xs text-white/45 mt-0.5">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* How to claim */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              How to claim it
            </p>
            <ol className="flex flex-col gap-4">
              {steps.map((s) => (
                <li key={s.step} className="flex items-start gap-3">
                  <span className="text-xs font-mono text-orange-500/60 w-6 shrink-0 pt-0.5">{s.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.title}</p>
                    <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
