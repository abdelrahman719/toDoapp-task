import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TasksService } from '../../Core/services/tasks.service';
import { Task } from '../../Core/interfaces/tasks.interface';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { HeaderComponent } from '../../Shared/components/header/header.component';
import { AuthService } from '../../Core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/app.state';
import { TranslateModule } from '@ngx-translate/core';
import { UserFilterPipe } from '../../Shared/pipes/filter.pipe';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, DragDropModule, HeaderComponent ,TranslateModule ,UserFilterPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  targetUser: any;
  searchKey:string=''
  tasksList: Task[] = []
  toDoTasksList: Task[] = []
  inProgressTasksList: Task[] = []
  doneTasksList: Task[] = []
  draggedTask: any;
  constructor(private authService: AuthService,
    private tasksService: TasksService,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.tasksService.newTaskTrigger$.subscribe({
      next: (res) => {
        if (res) {
          this.addTask()
        }
      }
    });
    this.store.select('tasks').subscribe((tasks) => {
      this.toDoTasksList = []
      this.inProgressTasksList = []
      this.doneTasksList = []
      this.tasksList = tasks['tasks']
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
    })
    this.tasksService.inputSearch$.subscribe({
      next:(res)=>{
        if(res){   
   
          this.searchKey =res
    
        }
      }
    })
    this.getAllTasks()

  }

  // get tasks and handle the view
  getAllTasks() {
    this.tasksService.getAllTasks()
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
    if (loggedUser) {
      this.toDoTasksList.unshift({
        desc: '',
        userId: loggedUser.id,
        userName: loggedUser.name,
        status: "toDo"
      })
  
    }
  }

  // handling drag steps to change task status
  editTaskStatus(taskData: Task, targetStatus: "toDo" | 'inProgress' | 'done') {

  
    let  tempTask = {
      id:taskData.id,
      desc: taskData.desc,
      userId: taskData.userId,
      userName: taskData.userName,
      status: targetStatus,
    }
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
