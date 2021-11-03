import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from '../../interfaces/paquete.interface';

@Component({
  selector: 'app-paquete-card',
  templateUrl: './paquete-card.component.html',
  styleUrls: ['./paquete-card.component.css']
})
export class PaqueteCardComponent implements OnInit {

  @Input() paquete:Paquete;

  constructor() { }

  ngOnInit(): void {
  }

}
