
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment'
import { HttpClient } from '@angular/common/http';
import { user } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
const USER_DB = environment.SERVER + 'users'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { }

  findUserByNameAndPassword(usersList: user[], userName: string, userPassword: string) {
    const user = usersList.find(user => user.name === userName);
    if(user){

      if ( user.password === userPassword) {
     
        return user;
      } else {
       
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong password' });
        return false;
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
        return false;
    }
  }
  getUsers() {
    return this.http.get<user[]>(USER_DB)
  }

  logIn(loggedUser:user) {

    this.http.get<user[]>(USER_DB).subscribe({
      next: (res) => {
      let user =  this.findUserByNameAndPassword(res, loggedUser.name, loggedUser.password)
      if(user){

        localStorage['userData']=JSON.stringify(user);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'login process done' });
        this.router.navigate(['/', 'board'])
      }
      }
    })
  }
  register(user: user) {
    this.getUsers().subscribe({
      next: (res) => {
        const targetUser: any = res.find(userObj => userObj.name === user.name);
        if (targetUser) {
       
          return
        } else {

          this.http.post<user[]>(USER_DB, user).subscribe({
            next: (res) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account has been added' });
              this.router.navigate(['/', 'login'])
         
            }
          })


        }

      }
    })



  }
  logOut(){
    localStorage.removeItem("userData")
    this.router.navigate(['/','login'])
  }

  isLoggedUser():boolean {
    let user = localStorage.getItem('userData')
    if(user){
      return true
    }else{
      return false
    }
  }
  getLoggedUserData(){
    let user = localStorage.getItem('userData')
    if(user){
      return JSON.parse(user)
    }
  }


}
