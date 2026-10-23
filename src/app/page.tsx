import { PageShell } from "@/components/page-shell";
import {
  About,
  Contact,
  Footer,
  Hero,
  OpenSource,
  Skills,
  Talks,
  Work,
  Writing,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <PageShell>
        <Hero />
        <About />
        <Work />
        <OpenSource />
        <Skills />
        <Writing />
        <Talks />
        <Contact />
      </PageShell>
      <Footer />
    </>
  );
}
