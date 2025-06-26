import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bgBlur = "bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30"