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
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    HomeComponent, 
    PaqueteComponent, 
    PaquetesComponent, 
    AboutComponent, 
    ContactComponent, 
    BusquedaComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPayPalModule,
    NgxStripeModule.forChild('pk_test_51JSlffIoeFc45Xx5ItHOoCFIkgR772g65qxpbJpxkPggUKTsL1NZKNabv08xsUPHnvvtQ6mRWJuQPgCylmDnL7we00IeKzA51M'),
    EcommerceRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class EcommerceModule { }
