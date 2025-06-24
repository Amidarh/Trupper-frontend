import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const QuestionBodyContent = () => {
  return (
    <Card className='w-full max-w-2xl p-4 shadow-md'>
      <CardHeader className='px-0 flex flex-col items-start justify-start'>
        <p>Physics</p>
        <h1 className='font-bold'>Question 1</h1>
        <p className='text-sm text-gray-900 dark:text-gray-300'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          provident ut earum nesciunt beatae suscipit ad dolore voluptatem nihil
          quisquam, maxime corporis assumenda. Omnis modi porro autem sequi?
          Sint, ipsa.
        </p>
      </CardHeader>

      <CardContent className='px-0'>
        <RadioGroup defaultValue='option-one'>
          <div className='flex cursor-pointer items-center space-x-2 w-full px-2 py-3 border rounded '>
            <RadioGroupItem value='option-one' id='option-one' />
            <div className='flex items-center justify-center text-center text-sm rounded-full h-6 w-6 bg-gray-500'>
              A
            </div>
            <Label htmlFor='option-one'>Option One</Label>
          </div>
          <div className='flex cursor-pointer items-center space-x-2 w-full px-2 py-3 border rounded '>
            <RadioGroupItem value='option-two' id='option-two' />
            <div className='flex items-center justify-center text-center text-sm rounded-full h-6 w-6 bg-gray-500'>
              B
            </div>
            <Label htmlFor='option-one'>Option Two</Label>
          </div>
          <div className='flex cursor-pointer items-center space-x-2 w-full px-2 py-3 border rounded '>
            <RadioGroupItem value='option-three' id='option-three' />
            <div className='flex items-center justify-center text-center text-sm rounded-full h-6 w-6 bg-gray-500'>
              C
            </div>
            <Label htmlFor='option-one'>Option Three</Label>
          </div>
          <div className='flex cursor-pointer items-center space-x-2 w-full px-2 py-3 border rounded '>
            <RadioGroupItem value='option-four' id='option-four' />
            <div className='flex items-center justify-center text-center text-sm rounded-full h-6 w-6 bg-gray-500'>
              D
            </div>
            <Label htmlFor='option-one'>Option Four</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <Separator />
      <CardFooter className='flex flex-row items-center px-0 pt-0 justify-between'>
        <Button>
          <ChevronLeft />
          <p className='text-xs'>Previous</p>
        </Button>
        <Button>
          <p className='text-xs'>Next</p>
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
