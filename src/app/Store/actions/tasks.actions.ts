import { createAction, props } from '@ngrx/store';
import { Task } from '../../Core/interfaces/tasks.interface';

 
export const setTasks = createAction(
  '[Tasks] setTasks' ,
  props<{tasks:Task[]}>()
);
export const addTask = createAction(
  '[Tasks] addTask' ,
  props<{task:Task}>()
);
export const deleteTask = createAction(
  '[Tasks] deleteTask' ,
  props<{id:string}>()
);
