import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
{
path: '',
component: AuthPage,
children: [
{
path: '',
pathMatch: 'full',
redirectTo: 'login'
},
{
path: 'login',
loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
},
{
path: 'pin',
loadChildren: () => import('./auth-pin/auth-pin.module').then(m => m.AuthPinPageModule)
},
{
path: 'language',
loadChildren: () => import('./language/language.module').then(m => m.LanguagePageModule)
},
{
path: 'starter',
loadChildren: () => import('./starter/starter.module').then(m => m.StarterPageModule)
}
]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class AuthPageRoutingModule { }
