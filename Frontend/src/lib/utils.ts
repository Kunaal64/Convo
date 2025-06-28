import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function isFileTypeValid(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => file.type === type)
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)
}

export function truncateFilename(filename: string, maxLength = 20): string {
  if (filename.length <= maxLength) return filename
  
  const extension = getFileExtension(filename)
  const nameWithoutExt = filename.slice(0, filename.lastIndexOf('.'))
  const maxNameLength = maxLength - extension.length - 3 // Account for ... and .
  
  return `${nameWithoutExt.slice(0, Math.max(0, maxNameLength))}...${extension}`
}
