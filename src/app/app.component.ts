
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './Core/services/loader.service';
import { SidebarComponent } from './Shared/components/sidebar/sidebar.component';
import { SearchInputComponent } from './Shared/components/search-input/search-input.component';
import { ToastModule } from 'primeng/toast';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProgressBarComponent } from './Shared/components/progress-bar/progress-bar.component';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , SidebarComponent  ,SearchInputComponent ,ToastModule , TranslateModule ,ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ ],
})
export class AppComponent  implements OnInit{
  title = 'toDoApp';
  constructor(  public loaderService: LoaderService , private translateService: TranslateService){

  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    let lang = localStorage.getItem('siteLang');
    
    if (lang) {
      this.translateService.use(lang);
    }
  }


}
