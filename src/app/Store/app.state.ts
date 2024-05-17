import { ActionReducerMap } from '@ngrx/store';
import * as tasksReducer from './reducers/tasks.reducers';



export interface AppState {
  tasks: tasksReducer.State;



}

export const appState: ActionReducerMap<AppState, any> = {
  tasks: tasksReducer.tasksReducer,


};
