import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceRoutingModule } from './ecommerce/ecommerce-routing.module';
import { NotpagefoundComponent } from './notpagefound/notpagefound/notpagefound.component';


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
