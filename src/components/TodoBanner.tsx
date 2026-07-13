const todos = [
  { icon: "🏷️", text: "Ask tech team to start labelling issues with hacktoberfest" },
  { icon: "📣", text: "Ask comms for a small campaign for Hacktoberfest" },
];

export default function TodoBanner() {
  return (
    <div className="px-6 py-6 max-w-5xl mx-auto">
      <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3">Action items needed</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {todos.map((t) => (
            <div
              key={t.text}
              className="flex items-start gap-3 bg-yellow-500/10 rounded-lg px-4 py-3 flex-1 border border-yellow-500/20"
            >
              <span className="text-xl">{t.icon}</span>
              <span className="text-sm text-yellow-100/80">{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
