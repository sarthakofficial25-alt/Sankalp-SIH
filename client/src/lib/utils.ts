import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(date: string | Date): string {
  return `${formatDate(date)} ${formatTimestamp(date)}`;
}

export function getThreatColor(level: string): string {
  switch (level) {
    case 'LOW': return 'text-green-400';
    case 'MEDIUM': return 'text-amber-400';
    case 'HIGH': return 'text-red-400';
    case 'CRITICAL': return 'text-red-300';
    default: return 'text-muted-foreground';
  }
}

export function getThreatBg(level: string): string {
  switch (level) {
    case 'LOW': return 'bg-green-500/15 border-green-500/30';
    case 'MEDIUM': return 'bg-amber-500/15 border-amber-500/30';
    case 'HIGH': return 'bg-red-500/15 border-red-500/30';
    case 'CRITICAL': return 'bg-red-900/30 border-red-700/50';
    default: return 'bg-muted border-border';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ONLINE': case 'AUTHORIZED': case 'MATCHED': case 'RESOLVED': return 'text-green-400';
    case 'DEGRADED': case 'WEAK': case 'PENDING': case 'UNDER_REVIEW': return 'text-amber-400';
    case 'OFFLINE': case 'UNAUTHORIZED': case 'NOT_FOUND': case 'MISMATCHED': return 'text-red-400';
    default: return 'text-muted-foreground';
  }
}

export function getStatusDot(status: string): string {
  switch (status) {
    case 'ONLINE': case 'AUTHORIZED': case 'MATCHED': return 'status-dot-online';
    case 'DEGRADED': case 'WEAK': case 'PENDING': return 'status-dot-degraded';
    case 'OFFLINE': case 'UNAUTHORIZED': case 'NOT_FOUND': return 'status-dot-offline';
    default: return 'bg-gray-500';
  }
}

export function generateId(prefix: string = 'ID'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number, decimals: number = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}
