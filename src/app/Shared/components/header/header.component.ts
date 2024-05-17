import { Component } from '@angular/core';
import { TasksService } from '../../../Core/services/tasks.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(private tasksService:TasksService){

}


  addTask(){
this.tasksService.newTaskTrigger$.next(true)
  }
}
