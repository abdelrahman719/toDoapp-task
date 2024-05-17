import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment'
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/tasks.interface';
import { BehaviorSubject } from 'rxjs';
import { AppState } from '../../Store/app.state';
import { Store } from '@ngrx/store';
import { addTask, deleteTask, setTasks } from '../../Store/actions/tasks.actions';

const TASKS_DB = environment.SERVER + 'tasks'
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  newTaskTrigger$ = new BehaviorSubject<boolean>(false)
  inputSearch$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient , private store: Store<AppState>) { }

  getAllTasks() {
     this.http.get<Task[]>(TASKS_DB).subscribe({
      next:(res)=>{
        this.store.dispatch(setTasks({tasks:res}));
      }
     })
  }
  newTask(TaskData:Task) {
     this.http.post<Task>(`${TASKS_DB}`, TaskData).subscribe({
      next:(res)=>{
        if(res){

          this.store.dispatch(addTask({task:res}));
        }
      }
     })
  }
  editTask(TaskData: Task) {

    return this.http.put(`${TASKS_DB}/${TaskData.id}`, TaskData)
  }
  deleteTask(taskId: string) {
    debugger
     this.http.delete(`${TASKS_DB}/${taskId}`).subscribe({
     next:(res)=>{
      this.store.dispatch(deleteTask({id:taskId}));
     }
    })
  }

}
