import { PageTransition } from './animations/PageTransition';
import { HeroSection, NarrativeSection } from './sections';

export default function Landing() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Apple-Style Sticky Scroll Narrative */}
        <NarrativeSection />

        {/* Section 3: Community & Support — hidden (private project) */}
        {/* <CommunitySection /> */}
      </div>
    </PageTransition>
  );
}
