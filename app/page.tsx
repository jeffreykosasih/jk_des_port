import { Hero } from '@/components/Hero';
import { WorkGrid } from '@/components/WorkGrid';
import { About } from '@/components/About';
import { ReelsShowcase } from '@/components/ReelsShowcase';
import { Contact } from '@/components/Contact';
import { SectionDock } from '@/components/SectionDock';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Hero />
      <WorkGrid />
      <About />
      <ReelsShowcase />
      <Contact />
      <SectionDock />
    </div>
  );
}
