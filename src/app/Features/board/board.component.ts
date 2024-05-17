import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { UsersService } from '../../Core/services/users.service';
import { TasksService } from '../../Core/services/tasks.service';
import { Task } from '../../Core/interfaces/tasks.interface';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { HeaderComponent } from '../../Shared/components/header/header.component';
import { AuthService } from '../../Core/services/auth.service';
import { user } from '../../Core/interfaces/user.interface';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, DragDropModule, HeaderComponent],
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
  constructor(private authService: AuthService,
    private tasksService: TasksService
  ) {

  }

  ngOnInit(): void {
    this.tasksService.newTaskTrigger$.subscribe({
      next: (res) => {
        if (res) {
          this.addTask()
        }
      }
    })
    this.getAllTasks()

  }

  // get tasks and handle the view
  getAllTasks() {
    this.toDoTasksList = []
    this.inProgressTasksList = []
    this.doneTasksList = []
    this.tasksService.getAllTasks().subscribe({
      next: (res) => {
        this.tasksList = res
        this.tasksList.forEach((task) => {
          if (task.status === 'toDo') {
            this.toDoTasksList.unshift(task)
          }
          else if (task.status == 'inProgress') {
            this.inProgressTasksList.unshift(task)
          }
          else if (task.status == 'done') {
            this.doneTasksList.unshift(task)

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

  addTask() {
    let loggedUser = this.authService.getLoggedUserData();
    if(loggedUser){
      this.toDoTasksList.unshift({
        desc:'',
        userId:loggedUser.id,
        userName:loggedUser.name,
        status:"toDo"
      })
    }
  }

  // handling drag steps to change task status
  editTaskStatus(taskData: Task, targetStatus: "toDo" | 'inProgress' | 'done') {
    let tempTask = taskData
    tempTask.status = targetStatus

    this.tasksService.editTask(tempTask).subscribe({
      next: (res) => {
        console.log('res: ', res);
        this.getAllTasks()

      }
    })
  }

  dragStart(task: Task) {
    this.draggedTask = task;
    console.log('this.draggedTask: ', this.draggedTask);
  }

  drop(targetStatus: "toDo" | 'inProgress' | 'done') {
    if (this.draggedTask) {
      console.log('task changed')
      this.editTaskStatus(this.draggedTask, targetStatus)

    }
  }

  dragEnd() {
    this.draggedTask = null;
  }







}
