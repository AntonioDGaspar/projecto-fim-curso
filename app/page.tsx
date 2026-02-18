import HeroSection from "@/feactures/landing/components/hero-section";
import { Ciclos } from "./_components/ciclos";
import { Hero } from "./_components/hero";
import { Sobre } from "./_components/sobre";

export default function Home() {
  return (
    <main>
      <div>
        <HeroSection />
      </div>
      <Hero />
      <Sobre />
      <Ciclos />
    </main>
  );
}