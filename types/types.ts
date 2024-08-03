// types.ts
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'В поиске' | 'В работе' | 'Ждут подтверждения' | 'Выполнены';
    projectId: string;
  }
  
  export interface Project {
    id: string;
    name: string;
  }
  
  export interface Applicant {
    id: string;
    name: string;
    email: string;
  }
  