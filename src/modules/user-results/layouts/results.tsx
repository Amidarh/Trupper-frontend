import { ExamResultTable } from '../components/tables/examResultTable';
import { Card } from '@/components/ui/card';

export const ResultContent = () => {
  return (
    <Card className='px-4'>
      <ExamResultTable />
    </Card>
  );
};
