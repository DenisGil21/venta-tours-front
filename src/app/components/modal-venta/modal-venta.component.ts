import { Component, Input, OnInit } from '@angular/core';
import { Venta } from '../../interfaces/venta.interface';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.component.html',
  styleUrls: ['./modal-venta.component.css']
})
export class ModalVentaComponent implements OnInit {

  @Input() venta:Venta;

  constructor() { }

  ngOnInit(): void {
  }

}
