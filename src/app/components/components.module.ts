import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalVentaComponent } from './modal-venta/modal-venta.component';
import { FiltroVentasComponent } from './filtro-ventas/filtro-ventas.component';
import { BuscadorComponent } from './buscador/buscador.component';



@NgModule({
  declarations: [CarouselComponent, ModalVentaComponent, FiltroVentasComponent, BuscadorComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CarouselComponent,
    ModalVentaComponent,
    FiltroVentasComponent,
    BuscadorComponent
  ]
})
export class ComponentsModule { }
