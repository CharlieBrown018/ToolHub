import { PageTransition } from './animations/PageTransition';
import { HeroSection, NarrativeSection, CommunitySection } from './sections';

export default function Landing() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Apple-Style Sticky Scroll Narrative */}
        <NarrativeSection />

        {/* Section 3: Community & Support */}
        <CommunitySection />
      </div>
    </PageTransition>
  );
}
