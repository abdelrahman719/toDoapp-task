import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../Core/interfaces/tasks.interface';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {

  transform(tasks: Task[], searchTerm: string): Task[] {
    if (!tasks) return [];
    if (!searchTerm) return tasks;

    searchTerm = searchTerm.toLowerCase();
     return tasks.filter(task =>
       task.desc.toLowerCase().includes(searchTerm));
  }
}
