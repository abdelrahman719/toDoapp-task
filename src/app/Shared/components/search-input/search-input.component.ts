import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext'
import { AppState } from '../../../Store/app.state';
import { Store } from '@ngrx/store';
import { Task } from '../../../Core/interfaces/tasks.interface';
import { setTasks } from '../../../Store/actions/tasks.actions';
import { TasksService } from '../../../Core/services/tasks.service';


@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [IconFieldModule ,InputIconModule ,InputTextModule ,FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent implements OnInit {
  searchInput:string='';
  constructor(  private tasksService:TasksService){

  }
  ngOnInit(): void {

  }

  search(){
    this.tasksService.inputSearch$.next(this.searchInput)
  }
}
