import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { ComponentsModule } from '../components/components.module';
import { PaqueteComponent } from './pages/paquete/paquete.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';



@NgModule({
  declarations: [HomeComponent, PaqueteComponent, PaquetesComponent, AboutComponent, ContactComponent],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class EcommerceModule { }
