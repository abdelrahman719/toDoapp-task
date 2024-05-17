import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../Core/services/tasks.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  editTrigger: boolean = false;
  constructor(private tasksService: TasksService) {

  }

  ngOnInit(): void {
    this.tasksService.newTaskTrigger$.subscribe({
      next: (res) => {

        if (res) {
          this.editTrigger = true
        } else {
          this.editTrigger = false
        }
      }
    });

  }
  addTask() {
    this.tasksService.newTaskTrigger$.next(true)
  }
}
