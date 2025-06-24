import { QuestionBodyContent } from '../components/cards/questionContent';
import { ExamHeader } from '../components/header';
import { ExamSidebar } from '../components/sidebar';

export const ExamContent = () => {
  return (
    <main>
      <ExamHeader />
      <div className='flex flex-col items-center justify-between w-screen p-4'>
        <QuestionBodyContent />
      </div>
      <ExamSidebar />
    </main>
  );
};
