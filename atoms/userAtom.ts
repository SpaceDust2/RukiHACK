// atoms/userAtom.ts
import { atom } from 'jotai';

export const userAtom = atom<{ id: number; role: 'developer' | 'employee' } | null>(null);