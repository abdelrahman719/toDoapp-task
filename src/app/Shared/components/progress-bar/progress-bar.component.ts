import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [ProgressBarModule  , ToastModule ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {



}
