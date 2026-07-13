"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12 text-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-6xl mb-4 float">🎃</div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          <span className="text-orange-400">ILF</span>{" "}
          <span className="text-white">Hacktoberfest</span>{" "}
          <span className="text-purple-400">2025</span>
        </h1>
        <p className="text-lg md:text-xl text-orange-200/80 max-w-2xl mx-auto mb-8">
          Four themed sprints. Two tracks. All of October. Whether you write code or ideas,
          there&apos;s a place for you here.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#weeks"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-full transition-colors"
          >
            See the Sprints ↓
          </a>
          <a
            href="#tracks"
            className="px-6 py-3 border border-purple-500 hover:bg-purple-500/20 text-purple-300 font-bold rounded-full transition-colors"
          >
            About the Tracks
          </a>
        </div>
      </div>
    </section>
  );
}
