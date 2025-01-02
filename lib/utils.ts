import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isApiError = (error: unknown): error is Error => {
  return typeof error === 'object' && error !== null && 'message' in error;
};
