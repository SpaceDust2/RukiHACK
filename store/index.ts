import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectSlice';
import userReducer from './userSlice'; // Предполагается, что у вас есть слайс для пользователя

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer, // Добавляем редуктор для пользователя
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
