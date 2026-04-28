import Hero from '@/components/home/Hero';
import Solutions from '@/components/home/Solutions';
import FeatureSplit from '@/components/home/FeatureSplit';
import PlansPreview from '@/components/home/PlansPreview';
import CoverageBanner from '@/components/home/CoverageBanner';
import WhyUs from '@/components/home/WhyUs';
import AgentSection from '@/components/home/AgentSection';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <FeatureSplit />
      <PlansPreview />
      <CoverageBanner />
      <WhyUs />
      <AgentSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
