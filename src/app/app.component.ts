import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { LoaderService } from './Core/services/loader.service';
import { SidebarComponent } from './Shared/components/sidebar/sidebar.component';
import { SearchInputComponent } from './Shared/components/search-input/search-input.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , SidebarComponent  ,SearchInputComponent ,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    HttpClientModule,
    
  
    
  ],
})
export class AppComponent {
  title = 'frontendEcommerce';
  constructor(  public loaderService: LoaderService){

  }


}
