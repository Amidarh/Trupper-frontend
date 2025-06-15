import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface CustomSelectProps {
  options: { id: string; name: string }[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  fallBackValue?: string;
}

const CustomSelect = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  id,
  label,
  fallBackValue,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected option's name for display
  const selectedOption = options.find((option) => option.id === value);
  const displayText = selectedOption
    ? selectedOption.name
    : (fallBackValue ?? placeholder);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen((prev) => !prev);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className='relative w-full'>
      {label && (
        <Label htmlFor={id} className='mb-2 block'>
          {label}
        </Label>
      )}
      <div ref={dropdownRef}>
        <div
          id={id}
          role='combobox'
          aria-expanded={isOpen}
          aria-disabled={disabled}
          tabIndex={0}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className={`flex items-center justify-between h-12 w-full border rounded-md px-3 py-2 text-sm ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${isOpen ? 'border' : 'border'}`}
        >
          <span className={value ? '' : ''}>{displayText}</span>
          {isOpen ? (
            <ChevronUp className='h-4 w-4 ' />
          ) : (
            <ChevronDown className='h-4 w-4 ' />
          )}
        </div>
        {isOpen && (
          <div
            className='absolute z-10 mt-1 w-full border rounded-md shadow-lg max-h-60 overflow-auto'
            role='listbox'
          >
            {options.length === 0 ? (
              <div className='px-3 py-2 text-sm '>No options available</div>
            ) : (
              options.map((option) => (
                <div
                  key={option.id}
                  role='option'
                  aria-selected={value === option.id}
                  onClick={() => {
                    onValueChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    value === option.id ? ' font-medium' : ''
                  }`}
                >
                  {option.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
