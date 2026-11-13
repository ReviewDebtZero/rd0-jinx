import { Benchmark } from "@/components/Benchmark";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Install, Limits, Problem, Research } from "@/components/Install";
import { MarketMatrix } from "@/components/MarketMatrix";
import { Nav } from "@/components/Nav";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Demo />
        <MarketMatrix />
        <Benchmark />
        <HowItWorks />
        <Install />
        <Limits />
        <Research />
      </main>
      <Footer />
    </>
  );
}
