import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalVentaComponent } from './modal-venta/modal-venta.component';
import { FiltroVentasComponent } from './filtro-ventas/filtro-ventas.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { PaqueteCardComponent } from './paquete-card/paquete-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CarouselComponent, ModalVentaComponent, FiltroVentasComponent, BuscadorComponent, PaqueteCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    CarouselComponent,
    ModalVentaComponent,
    FiltroVentasComponent,
    BuscadorComponent,
    PaqueteCardComponent
  ]
})
export class ComponentsModule { }
