import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  name: string;
}

interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  selectedProjectId: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setSelectedProject(state, action: PayloadAction<string>) {
      state.selectedProjectId = action.payload;
    },
  },
});

export const { setProjects, setSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;
