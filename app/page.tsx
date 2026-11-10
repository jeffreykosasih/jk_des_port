import { Hero } from '@/components/Hero';
import { WorkGrid } from '@/components/WorkGrid';
import { About } from '@/components/About';
import { ReelsShowcase } from '@/components/ReelsShowcase';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Hero />
      <WorkGrid />
      <About />
      <ReelsShowcase />
      <Contact />
    </div>
  );
}
