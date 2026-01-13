import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Menu } from './features/menu/menu';
import { Countries } from './features/countries/countries';
import { authGuard } from './core/guards/auth.guard';
import { CountryCe } from './features/countries/country-ce/country-ce';
import { States } from './features/states/states';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: Login},
    {path: 'menu', component: Menu, canActivate: [authGuard]},
    {path: 'countries', component: Countries, canActivate: [authGuard]},
    {path: 'country-form', component: CountryCe, canActivate: [authGuard]},
    {path: 'edit-country/:id_country', component: CountryCe, canActivate: [authGuard]},
    {path: 'states', component: States, canActivate: [authGuard]}
];
