import { atom } from 'jotai';

export const chatsAtom = atom<{ id: number; name: string }[]>([]);
export const selectedChatAtom = atom<number | null>(null);
export const messagesAtom = atom<any[]>([]);
