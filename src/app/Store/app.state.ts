import { ActionReducerMap } from '@ngrx/store';
import * as usersReducer from './reducers/users.reducers';



export interface AppState {
  users: usersReducer.State;



}

export const appState: ActionReducerMap<AppState, any> = {
  users: usersReducer.productsReducer,


};
