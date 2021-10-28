import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalVentaComponent } from './modal-venta/modal-venta.component';



@NgModule({
  declarations: [CarouselComponent, ModalVentaComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CarouselComponent,
    ModalVentaComponent
  ]
})
export class ComponentsModule { }
