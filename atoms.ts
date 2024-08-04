import { atom } from "jotai";

export const projectsAtom = atom<Project[]>([]);
export const selectedProjectIdAtom = atom<number | null>(null);
export const selectedDeveloperIdAtom = atom<number | null>(null);
export const refreshOrdersAtom = atom(false);
export const dashboardDataAtom = atom({
    projects: [],
    developers: [],
    employees: [],
    orders: []
  });