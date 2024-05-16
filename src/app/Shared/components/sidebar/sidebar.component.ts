import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor( private authService:AuthService){

  }

  logout(){
this.authService.logOut()
  }

}
