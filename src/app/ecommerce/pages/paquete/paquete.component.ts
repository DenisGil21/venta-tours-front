import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaqueteService } from '../../../services/paquete.service';
import { Paquete } from '../../../interfaces/paquete.interface';
import { Galeria } from '../../../interfaces/galeria.iterface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalleVenta } from 'src/app/models/detalle-venta.model';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { VentaService } from '../../../services/venta.service';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.css']
})
export class PaqueteComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  public detalleVenta = new DetalleVenta();

  public formPago = this.fb.group({
    nombre:['', Validators.required],
    apellidos:['', Validators.required],
    email:['', [Validators.required,Validators.email]],
    fecha:['', [Validators.required, this.validaFecha]],
    cantidad_adultos:[0, Validators.min(1)],
    cantidad_ninos:[0, Validators.required],
  });

  public paquete:Paquete;
  public galerias: Galeria[];
  public cargando:boolean = true;
  public payPalConfig?:IPayPalConfig;

  constructor(private paqueteService:PaqueteService,private activatedRoute:ActivatedRoute, 
    private fb:FormBuilder, private stripeService: StripeService, private ventaService:VentaService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.cargarPaquete(id));
    this.initConfig();
  }

  campoNoValido(campo:string):boolean {
    return this.formPago.get(campo).invalid  && this.formPago.get(campo).touched
  }


  validaFecha(control: FormControl){
    const valor:Date = control.value;
    const dateNow = new Date();
    const dateEntered = new Date(valor);
    if (dateEntered < dateNow) {      
      return {
        fechaInvalida:true
      };
    }    
    return null;
    
  }

  cargarPaquete(id:number){
    this.cargando = true;
    this.paqueteService.cargarPaquete(id)
    .subscribe(paquete => {
      this.paquete = paquete
      this.galerias = paquete.galerias
      this.cargando=false;
      console.log(this.paquete);
    })
  }

  pagar(){    
    if(this.formPago.invalid) {      
      return Object.values(this.formPago.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } 

    const name = this.formPago.get('nombre').value;
      this.stripeService
        .createToken(this.card.element, { name })
        .subscribe((result) => {
          if (result.token) {

            const data = {
              ...this.formPago.value,
              total : this.detalleVenta.total,
              stripeToken:result.token.id,
              paquete:this.paquete.id,
              descripcion: this.paquete.nombre
            }

            this.ventaService.crearVenta(data)
            .subscribe((result)=>{
              console.log(result);
              
            });

          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
          }
        });

  }

  calcularTotal(adulto:any, nino?:any){
    if (adulto) {
      this.detalleVenta.adulto = this.paquete.precio_adulto * parseInt(adulto);
    }
    if(nino){
      this.detalleVenta.nino = this.paquete.precio_nino * parseInt(nino);
    }
    this.detalleVenta.total = this.detalleVenta.adulto + this.detalleVenta.nino;
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'MXN',
        clientId: environment.paypal_client,
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'MXN',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'MXN',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'MXN',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
          //aqui hago lo del backend
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },
    };
}

}
