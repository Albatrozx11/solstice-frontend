import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/auth.ts
export const isAuthenticated = () => {
  return document.cookie.includes('auth-token='); // Check for the token in cookies
};
