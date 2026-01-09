import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && sessionStorage) { //inital validation to know there is information in sessionStorage/localstorage
    const token = sessionStorage.getItem('jwt');
    return token ? true : router.createUrlTree(['/login']);
  }

  return router.createUrlTree(['/login']);

};