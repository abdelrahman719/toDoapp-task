import { Injectable } from '@angular/core';
import {environment} from '../../../enviroment/enviroment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { user } from '../interfaces/user.interface';
const USER_DB = environment.SERVER+'users'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers(){
   return this.http.get<user[]>(USER_DB)
  }
 
  deleteUser(userId:string){
    return this.http.delete(`${USER_DB}/${userId}`)
  }
}
