import {  createReducer, on } from '@ngrx/store';
import { Task } from '../../Core/interfaces/tasks.interface';
import { addTask, deleteTask, setTasks } from '../actions/tasks.actions';



export interface State {
tasks:Task[]
}

export const initialState: State = {
    tasks:[]
  };
   
   
   
  export const tasksReducer = createReducer(
    initialState,
    on(setTasks, (state ,{tasks}) => ({ ...state,tasks: tasks })),
    on(addTask, (state ,{task}) => ({ ...state,tasks: [...state.tasks,task] })),
    on(deleteTask, (state, { id }) => {
      const filteredTasks = state.tasks.filter(task => task.id !== id);
      return {
        ...state,
        tasks: filteredTasks
      };
    })


  );
   