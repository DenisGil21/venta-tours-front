import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotpagefoundComponent } from './notpagefound/notpagefound/notpagefound.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'',
    loadChildren: ()=> import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path:'account',
    loadChildren: ()=> import('./account/account.module').then(m => m.AccountModule),
    canLoad:[AuthGuard],
    canActivate:[AuthGuard]
  },
  {
    path:'', 
    redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**',
    component: NotpagefoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
