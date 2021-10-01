import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { PaqueteComponent } from './pages/paquete/paquete.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../guards/auth.guard';

const routes:Routes=[
  {
    path: '',
    component:HomeComponent,
    children: [
      {
        path:'home',
        component:PaquetesComponent
      },
      {
        path:'paquete/:id',
        component:PaqueteComponent
      },
      {
        path:'paquetes/:termino',
        component:BusquedaComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path: 'account',
        component:AccountComponent,
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule),
        canLoad:[AuthGuard],
        canActivate:[AuthGuard]
      },
      {
        path:'**',
        redirectTo:'home'
      }
    ]
  }
  
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EcommerceRoutingModule { }
