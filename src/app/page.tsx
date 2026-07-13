import Hero from "@/components/Hero";
import TodoBanner from "@/components/TodoBanner";
import Tracks from "@/components/Tracks";
import Weeks from "@/components/Weeks";
import Certificate from "@/components/Certificate";
import Issues from "@/components/Issues";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TodoBanner />
      <Tracks />
      <Weeks />
      <Issues />
      <Certificate />
      <Footer />
    </main>
  );
}
