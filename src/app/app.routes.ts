import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Menu } from './features/menu/menu';
import { Countries } from './features/countries/countries';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: Login},
    {path: 'menu', component: Menu, canActivate: [authGuard]},
    {path: 'countries', component: Countries, canActivate: [authGuard]}
];
