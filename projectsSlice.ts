import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
    id: number;
    name: string;
    description: string;
    developerId: number;
    createdAt: string;
    updatedAt: string;
  }

interface ProjectsState {
  projects: Project[];
  selectedProjectId: number | null;
}

const initialState: ProjectsState = {
  projects: [],
  selectedProjectId: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setSelectedProject: (state, action: PayloadAction<number>) => {
      state.selectedProjectId = action.payload;
    },
  },
});

export const { setProjects, setSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;