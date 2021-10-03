import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmpresasComponent } from './account/pages/empresas/empresas.component';
import { AdminPaquetesComponent } from './account/pages/admin-paquetes/admin-paquetes.component';
import { VentasComponent } from './account/pages/ventas/ventas.component';
import { AdminPaqueteComponent } from './account/pages/admin-paquete/admin-paquete.component';

const childRoutes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'paquetes', component: AdminPaquetesComponent },
  { path: 'paquete/:id', component: AdminPaqueteComponent },
  { path: 'ventas', component: VentasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule {}
