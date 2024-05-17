import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ,InputTextModule,
     FloatLabelModule ,ButtonModule,RouterModule ,PasswordModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!:FormGroup;

  constructor( private formBuilder:FormBuilder , private authService:AuthService){
    this.registerForm=this.formBuilder.group({
      name:[''  , Validators.required],
      password:['',Validators.required]
    })
  }


  register(){
this.authService.register(this.registerForm.value)
  }
}
