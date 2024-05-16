import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment'
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/tasks.interface';

const TASKS_DB = environment.SERVER + 'tasks'
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get<Task[]>(TASKS_DB)
  }
  newTask(TaskData:Task) {
    return this.http.post(`${TASKS_DB}`, TaskData)
  }
  editTask(TaskData: Task) {

    return this.http.put(`${TASKS_DB}/${TaskData.id}`, TaskData)
  }
  deleteTask(taskId: string) {
    return this.http.delete(`${TASKS_DB}/${taskId}`)
  }

}
