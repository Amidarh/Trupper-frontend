import { Card } from '@/components/ui/card';
import { BackButton } from '@/core/commons/navigation/backButton';

export function SingleExamCardLayout() {
  return (
    <Card className='px-3'>
      <BackButton title='My Exam' />
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum corrupti
        nam fugit a provident laboriosam, officia tempore cupiditate eos numquam
        sed ex maxime tenetur corporis voluptas facilis ea! Illum,
        reprehenderit.
      </h1>
    </Card>
  );
}
