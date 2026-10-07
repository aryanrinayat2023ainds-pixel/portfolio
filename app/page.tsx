import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { hasResume } from "@/lib/resume";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Hero } from "@/sections/Hero";
import { Achievements, Experience, Skills } from "@/sections/Optional";
import { Work } from "@/sections/Work";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero hasResume={hasResume} />
        <About />
        <Education />
        <Skills />
        <Work />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <CommandPalette hasResume={hasResume} />
    </>
  );
}
