import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { AdminPaquetesComponent } from './pages/admin-paquetes/admin-paquetes.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { AdminPaqueteComponent } from './pages/admin-paquete/admin-paquete.component';
import { GaleriasComponent } from './pages/galerias/galerias.component';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [
    AccountComponent,
    EmpresasComponent,
    AdminPaquetesComponent,
    VentasComponent,
    AdminPaqueteComponent,
    GaleriasComponent,
    VentasComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
