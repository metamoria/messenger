import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: '', redirectTo: 'starter', pathMatch: 'full' },
{
path: 'starter',
loadChildren: () => import('./pages/auth/starter/starter.module').then(m => m.StarterPageModule)
},
{
path: 'message',
loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule)
},
{
path: 'auth',
loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
},
{
path: 'message-detail',
loadChildren: () => import('./pages/message-detail/message-detail.module').then(m => m.MessageDetailPageModule)
},
{
path: 'settings',
loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
},
{
path: 'findpeople',
loadChildren: () => import('./pages/findpeople/findpeople.module').then(m => m.FindPeoplePageModule)
},
{
path: 'pwasessioncheck',
loadChildren: () => import('./pages/pwasessioncheck/pwasessioncheck.module').then(m => m.PwaSessionCheckPageModule)
},
{
path: 'fullphoto',
loadChildren: () => import('./pages/fullphoto/fullphoto.module').then(m => m.FullPhotoPageModule)
},
{
path: 'profile',
loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
},
{
path: 'call',
loadChildren: () => import('./pages/call/call.module').then(m => m.CallPageModule)
},
{
path: 'backgrounmodes',
loadChildren: () => import('./pages/backgrounmodes/backgrounmodes.module').then(m => m.BackgrounmodesPageModule)
},
{
path: 'creategroup',
loadChildren: () => import('./pages/creategroup/creategroup.module').then(m => m.CreategroupPageModule)
}
];
@NgModule({
imports: [
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
],
exports: [RouterModule]
})
export class AppRoutingModule { }
