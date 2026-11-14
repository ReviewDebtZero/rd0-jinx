import { Benchmark } from "@/components/Benchmark";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Install, Limits, Problem, Research } from "@/components/Install";
import { MarketMatrix } from "@/components/MarketMatrix";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/motion/Reveal";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <Problem />
        </Reveal>
        <Reveal>
          <Demo />
        </Reveal>
        <Reveal>
          <MarketMatrix />
        </Reveal>
        <Reveal>
          <Benchmark />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <Install />
        </Reveal>
        <Reveal>
          <Limits />
        </Reveal>
        <Reveal>
          <Research />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
