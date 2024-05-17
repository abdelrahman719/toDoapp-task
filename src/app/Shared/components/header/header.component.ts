import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../Core/services/tasks.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  editTrigger: boolean = false;
  siteLang: string = 'en';
  constructor(private tasksService: TasksService,
    private translateService: TranslateService,
  ) {

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

    let lang = localStorage.getItem('siteLang');
    if (lang) {
      this.siteLang = lang
    }


  }
  addTask() {
    this.tasksService.newTaskTrigger$.next(true)
  }

  changeLanguage(language: string) {

    localStorage.setItem('siteLang', language);
    this.translateService.use(language);
    this.siteLang = language;

  }


}
