"use client"

import xss from 'xss';
import { cn } from '@/lib/utils';
import { CardContent } from '@/components/ui/card';
import { Option } from '@/types/question.types';

export function ObjectiveQuestions ({ action, selected, options }: { action: (id: string) => void, selected: string, options: Option }) {

    return (
        <CardContent className='px-0 flex flex-col gap-2'>
          {Object.values(options ?? {}).map(
            (option, i) => {
              const optionLetter = String.fromCharCode(65 + i);
              return (
                <div
                  key={optionLetter}
                  className={cn('flex cursor-pointer items-center space-x-2 w-full px-2 py-3 border rounded', selected === (optionLetter).toLocaleLowerCase() ? 'bg-gray-500' : "")}
                  onClick={() => action((optionLetter).toLocaleLowerCase())}
                >
                  <div className='flex items-center justify-center text-center text-sm rounded-full h-6 w-6 bg-gray-500 text-white'>
                    {optionLetter}
                  </div>
                  <div
                    className='text-sm text-gray-900 dark:text-gray-300'
                    dangerouslySetInnerHTML={{ __html: xss(option) }}
                  />
                </div>
              );
            }
          )}
      </CardContent>
    )
}