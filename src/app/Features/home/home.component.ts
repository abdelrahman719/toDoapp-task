import { Component } from '@angular/core';
import { SidebarComponent } from '../../Shared/components/sidebar/sidebar.component';
import { SearchInputComponent } from '../../Shared/components/search-input/search-input.component';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent,SearchInputComponent,BoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
