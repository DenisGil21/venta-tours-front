import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountComponent } from './account/account.component';
import { EmpresasComponent } from './account/pages/empresas/empresas.component';
import { AdminPaquetesComponent } from './account/pages/admin-paquetes/admin-paquetes.component';
import { VentasComponent } from './account/pages/ventas/ventas.component';

const childRoutes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'paquetes', component: AdminPaquetesComponent },
  { path: 'ventas', component: VentasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule {}
