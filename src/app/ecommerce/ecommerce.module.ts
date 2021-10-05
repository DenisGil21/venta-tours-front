import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { ComponentsModule } from '../components/components.module';
import { PaqueteComponent } from './pages/paquete/paquete.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { AccountComponent } from './account/account.component';
import { EmpresasComponent } from './account/pages/empresas/empresas.component';
import { AdminPaquetesComponent } from './account/pages/admin-paquetes/admin-paquetes.component';
import { VentasComponent } from './account/pages/ventas/ventas.component';
import { AdminPaqueteComponent } from './account/pages/admin-paquete/admin-paquete.component';
import { GaleriasComponent } from './account/pages/galerias/galerias.component';



@NgModule({
  declarations: [
    HomeComponent, 
    PaqueteComponent, 
    PaquetesComponent, 
    AboutComponent, 
    ContactComponent, 
    BusquedaComponent,
    AccountComponent,
    EmpresasComponent,
    AdminPaquetesComponent,
    VentasComponent,
    AdminPaqueteComponent,
    GaleriasComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStripeModule.forChild('pk_test_51JSlffIoeFc45Xx5ItHOoCFIkgR772g65qxpbJpxkPggUKTsL1NZKNabv08xsUPHnvvtQ6mRWJuQPgCylmDnL7we00IeKzA51M'),
    EcommerceRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class EcommerceModule { }
