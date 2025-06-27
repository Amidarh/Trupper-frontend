'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Info, Puzzle, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { DurationData } from '@/constants/data';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ExamCardType } from '@/types/examCards.types';
// import { useMockExamsService } from '@/modules/mock-exams/services';

export default function ExamDetailsButton({
  id,
  title,
  data
}: {
  id: string | undefined;
  title: string,
  data: ExamCardType
}) {

    const [ selectedMode, setSelectMode ] = useState<"practice" | "real-time" | "">("")
    const [ selectedDuration, setSelectedDuration ] = useState<string | null>(null)
    const [ showInstructions, setShowInstructions ] = useState<boolean>(false)
    const route = useRouter()
    const [ error, setError ] = useState("")

    const handleNextStep = () => {
        if(selectedMode === "practice" && selectedDuration === null ){
            setError("Select Exam duration")
        } else if(selectedMode === "practice" && selectedDuration !== null){
            setSelectedDuration("")
            setShowInstructions(true)
        } else if(selectedMode === "real-time"){
            setSelectedDuration("")
            setShowInstructions(true)
        }
    }

  console.log(id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='text-left w-full text-sm flex flex-row items-center cursor-pointer p-1 rounded-md'>
          <p className='text-sm'>{title}</p>
        </Button>
      </AlertDialogTrigger>
        {showInstructions ? <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-3xl font-bold'>Info</AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
                Exam Information
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div
            className='flex flex-col gap-2 w-full'
          >
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold'>Exam:</p>
                <p className='font-light text-sm'>{data.exam.name}</p>
            </div>
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold'>Category:</p>
                <p className='font-light text-sm'>{data.category.name}</p>
            </div>
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold'>Duration:</p>
                <p className='font-light text-sm'>{selectedDuration ? selectedDuration : data.exam.duration} minutes</p>
            </div>
            <div className='flex flex-row justify-between w-full'>
                <p className='font-bold'>Subject(s): </p>
                <div className='flex gap-1 flex-wrap justify-end items-end'>
                    {data.subjects.map((subject) => (
                        <p key={subject.id} className='text-sm'>
                        {subject.name},
                        </p>
                    ))}
                </div>
            </div>
          </div>

          <div className='flex flex-col gap-3 text-sm'>
            <p>a. The minimum Time allowed for this is <b>60 minutes</b>.</p>
            <p>b. If you do not have an instant idea of a question you can skip by clicking the next button, you can re-attempt the skipped question when you have attempted others</p>
            <p>c. The attempted questions will have their button colored orange if you‘ve attempted them.</p>
            <p>d. Upon answering questions, you can click on each question button to revisit the question. clicking on teh submit button will give you the opportunity to submit your test.</p>
            <p>e. In the event of exhausting your maximum allowed time the system will end the test and automatically submit it for grading.</p>
          </div>

          <div
            className='flex flex-row justify-between w-full'>
            <Button
                variant="outline"
                onClick={() => setShowInstructions(false)}
            >Back</Button>
            <AlertDialogAction
                onClick={() => route.push("/exam")}
            >
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogContent> : 
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='size-10 rounded-full flex justify-center items-center bg-orange-100/30'>
                    <Info className='text-[#e8a23d]'/>
                </div>
                <h1>Exam Mode</h1>
            </div>
            <AlertDialogDescription className='text-center'>
              Note: The difference Between practice mode and real-time mode is the ability to change an exam duration(time)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div
            className='flex flex-row items-center justify-center gap-4'
          >
                <div className={cn(
                    'px-4 py-5 rounded-lg flex flex-col items-center justify-center cursor-pointer w-full max-w-[150px] text-[#e8a23d] dark:text-white',
                    selectedMode === "practice" ? "border-1 border-[#e8a23d]" : "border"
                    )}
                    onClick={() => setSelectMode("practice")}
                >
                    <Puzzle/>
                    <h1>Practice Mode</h1>
                </div>
                <div className={cn(
                    'px-4 py-5 rounded-lg border flex flex-col items-center justify-center cursor-pointer w-full max-w-[150px] dark:text-white',
                    selectedMode === "real-time" ? "border-1 border-gray-900" : "border"
                )}
                    onClick={() => setSelectMode("real-time")}
                >
                    <Newspaper/>
                    <h1>Real time Mode</h1>
                </div>
          </div>

            {selectedMode === "practice" && <div>
                <Label htmlFor='duration' className='mb-2'>
                    Exam Duration
                </Label>
                <Select
                    onValueChange={(value) => {
                        setSelectedDuration(value)
                    }}
                >
                    <SelectTrigger className='w-full h-12'>
                    <SelectValue placeholder='Select Exam Duration' />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        {DurationData.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                 {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
            </div>}

          <div
            className='flex flex-row justify-between w-full'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
                onClick={handleNextStep}
            >
              Continue
            </Button>
          </div>
        </AlertDialogContent>
        }
    </AlertDialog>
  );
}
