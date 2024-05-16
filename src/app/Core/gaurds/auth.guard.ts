import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  if(authService.getLoggedUser()){
    return true;   
  }else{
    messageService.add({ severity: 'error', summary: 'Error', detail: 'Unautherized user' });
    router.navigate(['/login']);
    return false;
    
  }
};
