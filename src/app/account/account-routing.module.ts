import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { AdminPaquetesComponent } from './pages/admin-paquetes/admin-paquetes.component';
import { AdminPaqueteComponent } from './pages/admin-paquete/admin-paquete.component';
import { GaleriasComponent } from './pages/galerias/galerias.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PanelComponent } from './pages/panel/panel.component';


const routes: Routes = [
  {
    path:'',
    component: AccountComponent,
    children:[
      { path: '', component: PanelComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: 'paquetes', component: AdminPaquetesComponent },
      { path: 'paquete/:id', component: AdminPaqueteComponent },
      { path: 'galeria/paquete/:id', component:GaleriasComponent},
      { path: 'ventas', component: VentasComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
