import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  value: string[]; // current value from useForm register
  onChange: (value: string[]) => void;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ options, value, onChange, name, onBlur }, ref) => {
    const [open, setOpen] = React.useState(false);

    const toggleOption = (val: string) => {
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val));
      } else {
        onChange([...value, val]);
      }
    };

    const selectedLabels = options
      .filter((opt) => value.includes(opt.value))
      .map((opt) => opt.label);

    return (
      <>
        <input
          type='hidden'
          name={name}
          value={JSON.stringify(value)}
          onBlur={onBlur}
          ref={ref}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              className='w-full justify-between'
            >
              {selectedLabels.length > 0
                ? selectedLabels.join(', ')
                : 'Select options'}
              <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full min-w-[300px] p-0'>
            <Command className='w-full'>
              <CommandList>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value.includes(option.value)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
