import Button from '../../../services/about/Button';

interface TProps {
  params: {
    aboutId: string;
  }
}

export default function AboutDynamicPage({ params }: TProps) {
  return (
    <div>
      AboutId is: {params.aboutId}
      <Button />
    </div>
  );
}
