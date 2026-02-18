import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Menu } from './features/menu/menu';
import { Countries } from './features/countries/countries';
import { authGuard } from './core/guards/auth.guard';
import { CountryCe } from './features/countries/country-ce/country-ce';
import { States } from './features/states/states';
import { StateCe } from './features/states/state-ce/state-ce';
import { Municipalities } from './features/municipalities/municipalities';
import { MunicipalityCe } from './features/municipalities/municipality-ce/municipality-ce';
import { MembersType } from './features/members-type/members-type';
import { MemberTypeCe } from './features/members-type/member-type-ce/member-type-ce';
import { Members } from './features/members/members';
import { MemberCe } from './features/members/member-ce/member-ce';
import { Categories } from './features/categories/categories';
import { CategoryCe } from './features/categories/category-ce/category-ce';
import { Positions } from './features/positions/positions';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: Login},
    {path: 'menu', component: Menu, canActivate: [authGuard]},
    {path: 'countries', component: Countries, canActivate: [authGuard]},
    {path: 'country-form', component: CountryCe, canActivate: [authGuard]},
    {path: 'edit-country/:id_country', component: CountryCe, canActivate: [authGuard]},
    {path: 'states', component: States, canActivate: [authGuard]},
    {path: 'state-form', component: StateCe, canActivate: [authGuard]},
    {path: 'edit-state/:id_state', component: StateCe, canActivate: [authGuard]},
    {path: 'municipalities', component: Municipalities, canActivate: [authGuard]},
    {path: 'municipality-form', component: MunicipalityCe, canActivate: [authGuard]},
    {path: 'edit-municipality/:id_municipality', component: MunicipalityCe, canActivate: [authGuard]},
    {path: 'members-type', component: MembersType, canActivate: [authGuard]},
    {path: 'member-type-form', component: MemberTypeCe, canActivate: [authGuard]},
    {path: 'edit-member-type/:idMemberType', component: MemberTypeCe, canActivate: [authGuard]},
    {path: 'members', component: Members, canActivate: [authGuard]},
    {path: 'member-form', component: MemberCe, canActivate: [authGuard]},
    {path: 'edit-member/:idMember', component: MemberCe, canActivate:[authGuard]},
    {path: 'categories', component: Categories, canActivate: [authGuard]},
    {path: 'category-form', component: CategoryCe, canActivate: [authGuard]},
    {path: 'edit-category/:idCategory', component: CategoryCe, canActivate: [authGuard]},
    {path: 'positions', component: Positions, canActivate: [authGuard]}
];
