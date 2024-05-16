import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { UsersService } from '../../Core/services/users.service';
import { TasksService } from '../../Core/services/tasks.service';
import { Task } from '../../Core/interfaces/tasks.interface';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  targetUser: any;
  tasksList: Task[] = []
  toDoTasksList: Task[] = []
  inProgressTasksList: Task[] = []
  doneTasksList: Task[] = []
  draggedTask: any;
  constructor(private usersService: UsersService,
    private tasksService: TasksService
  ) {

  }

  ngOnInit(): void {
    this.getAllTasks()

  }

  getAllTasks() {
    this.toDoTasksList=[]
    this.inProgressTasksList=[]
    this.doneTasksList=[]
    this.tasksService.getAllTasks().subscribe({
      next: (res) => {
        this.tasksList = res
        this.tasksList.forEach((task) => {
          if (task.status === 'toDo') {
            this.toDoTasksList.push(task)
          }
          else if (task.status == 'inProgress') {
            this.inProgressTasksList.push(task)
          }
          else if (task.status == 'done') {
            this.doneTasksList.push(task)

          }
        })


      }
    })
  }


  // getUserById(userId: string) {
  //   this.usersService.getUsers().subscribe({
  //     next: (res) => {
  //       this.targetUser = res.find(userObj => userObj.id == userId);
  //     }
  //   })

  // }

  dragStart(task: Task) {
    this.draggedTask = task;
    console.log('this.draggedTask: ', this.draggedTask);
  }

  drop(targetStatus:"toDo"|'inProgress'|'done') {
    if (this.draggedTask) {
      console.log('task changed')
      this.editTask( this.draggedTask,targetStatus)

    }
  }

  editTask(taskData:Task , targetStatus:"toDo"|'inProgress'|'done'){
    let tempTask = taskData
    tempTask.status = targetStatus

    this.tasksService.editTask(tempTask).subscribe({
      next:(res)=>{
        console.log('res: ', res);
        this.getAllTasks()

      }
    })
  }


  dragEnd() {
    this.draggedTask = null;
  }






}
