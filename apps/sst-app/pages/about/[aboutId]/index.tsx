import Button from '@/services/about/Button';
import dynamic from 'next/dynamic';

const AboutDetail = dynamic(() => import('about/AboutDetail'), { ssr: false });

export default function AboutDynamic() {
  return (
    <div>
      AboutId is:
      <AboutDetail />
    </div>
  );
}