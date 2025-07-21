import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar24 } from '@/core/commons/components/calendar';
import { useExamModeService } from '../../services/examModeService';
import { toast } from 'sonner';
import { UpdateExamModeFormData } from '../../schema/categoriesSchema';
import { useSubjectService } from '@/modules/subjects/services';
import { MultiSelect } from '@/components/ui/multiSelect';
import { Label } from '@/components/ui/label';
import { SubjectType } from '@/types';

interface CustomModalProps {
  id: string;
  examId: string;
  status: boolean;
  validFrom: Date | null | undefined; // Allow null/undefined
  validTill: Date | null | undefined; // Allow null/undefined
}

export function EnableExamModeModal({
  id,
  validFrom,
  validTill,
  status,
  examId,
}: CustomModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getSubjectByExam, subjectList } = useSubjectService();
  const [selected, setSelected] = useState<string[]>([]);
  const {
    updateForm: {
      formState: { errors, isSubmitting },
      setValue,
      reset,
      handleSubmit,
    },
    enableExamMode,
  } = useExamModeService();

  useEffect(() => {
    if (id) {
      getSubjectByExam(examId);
      reset({
        status,
        validFrom:
          validFrom instanceof Date && !isNaN(validFrom.getTime())
            ? validFrom
            : undefined,
        validTill:
          validTill instanceof Date && !isNaN(validTill.getTime())
            ? validTill
            : undefined,
      });
    }
  }, [id, status, validFrom, validTill, reset, examId]);

  function mapSubjectsToOptions(subjects: SubjectType[]) {
    return subjects.map((subject) => ({
      value: subject.id,
      label: subject.name,
    }));
  }

  const handleEnableExamMode = async (data: UpdateExamModeFormData) => {
    try {
      await enableExamMode(id, {
        status: data.status,
        validFrom: data.validFrom,
        validTill: data.validTill,
        subjects: (subjectList ?? [])
          .filter((subject) => selected.includes(subject.id))
          .map((subject) => ({ value: subject.name, id: subject.id })),
      });
      setIsOpen(false);
      toast.success('Exam mode updated.');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update Exam Mode');
    }
  };

  // Helper function to check if a value is a valid Date
  const isValidDate = (date: Date | null | undefined): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id='modal-toggle'
        checked={status}
        onCheckedChange={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader className='flex justify-center items-center text-center'>
            <DialogTitle className='flex justify-center items-center text-center flex-col gap-3'>
              <Info size={50} />
              <h2 className='text-center'>Info</h2>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-center'>
            Note: by setting this exam mode active all users under this sub
            category will be mandated to take part in this exam and therefore
            will lose access to their dashboard until they partake in this exam
            or the validity of this exam elapses.
          </DialogDescription>
          <form
            className='flex flex-col gap-5'
            onSubmit={handleSubmit(handleEnableExamMode)}
          >
            <div className='mb-4'>
            <Label htmlFor='subjectToBeWritten' className='mb-2'>
              Subjects (select category subjects)
            </Label>
            <MultiSelect
              name='Select Subjects'
              options={mapSubjectsToOptions(subjectList ?? [])}
              onChange={(e) => {
                setSelected(e);
                const mappedSubjects = e.map((id) => ({ value: id, id }));
                setValue('subjects', mappedSubjects, { shouldValidate: true });
              }}
              value={selected}
            />
          </div>
            <div>
              <Calendar24
                label='Valid From'
                value={
                  isValidDate(validFrom) ? validFrom.toISOString() : undefined
                }
                onchange={(isoString?: string) => {
                  if (isoString) {
                    setValue('validFrom', new Date(isoString), {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {errors.validFrom && (
                <p className='text-red-500 text-sm'>
                  {errors.validFrom.message}
                </p>
              )}
            </div>
            <div>
              <Calendar24
                label='Valid Till'
                value={
                  isValidDate(validTill) ? validTill.toISOString() : undefined
                }
                onchange={(isoString?: string) => {
                  if (isoString) {
                    setValue('validTill', new Date(isoString), {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {errors.validTill && (
                <p className='text-red-500 text-sm'>
                  {errors.validTill.message}
                </p>
              )}
            </div>
            <div className='flex flex-row justify-between items-center'>
              <Button
                variant='destructive'
                type='button'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                type='submit'
                onClick={() =>
                  setValue('status', !status, { shouldValidate: true })
                }
              >
                {isSubmitting
                  ? 'Loading...'
                  : status
                    ? 'Set inactive'
                    : 'Set active'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
