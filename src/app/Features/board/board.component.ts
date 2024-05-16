import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { UsersService } from '../../Core/services/users.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  test = 'xxxxxxxxxxxxxxx';
  constructor(private usersService: UsersService) {

  }
  editTask(e: any) {
    console.log("from parent", e)
  }
  ngOnInit(): void {
    this.getUsers();
    setTimeout(()=>{
      this.deleteUser()
    },2000)
  }
  getUsers(){
    this.usersService.getUsers().subscribe({
      next:(res)=>{
        console.log('res: ', res);

      }
    })
  }

  deleteUser(){
    this.usersService.deleteUser('d239').subscribe({
      next:(res)=>{
        console.log('res: ', res);

      }
    })
  }
}
