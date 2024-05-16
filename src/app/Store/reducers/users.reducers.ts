import {  createReducer, on } from '@ngrx/store';
import { user } from '../../Core/interfaces/user.interface';
import { setUsers } from '../actions/users.actions';



export interface State {
users:user[]
}

export const initialState: State = {
    users:[]
  };
   
   
   
  export const productsReducer = createReducer(
    initialState,
    on(setUsers, (state ,{users}) => ({ ...state,users: users })),
  

  );
   