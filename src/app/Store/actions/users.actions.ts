import { createAction, props } from '@ngrx/store';
import { user } from '../../Core/interfaces/user.interface';

 
export const setUsers = createAction(
  '[Users] setUsers' ,
  props<{users:user[]}>()
);
