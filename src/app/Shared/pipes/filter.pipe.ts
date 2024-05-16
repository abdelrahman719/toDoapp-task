import { Pipe, PipeTransform } from '@angular/core';
import { user } from '../../Core/interfaces/user.interface';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {

  transform(users: user[], searchTerm: string): user[] {
    if (!users) return [];
    if (!searchTerm) return users;

    searchTerm = searchTerm.toLowerCase();
    return users.filter(user =>
      user.first_name.toLowerCase().includes(searchTerm) ||
      user.id.toString().includes(searchTerm)
    );
  }
}
