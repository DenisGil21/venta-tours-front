import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { VentaService } from '../../../services/venta.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from '../../../../environments/environment';
import { DetalleVenta } from '../../../models/detalle-venta.model';
import { Paquete } from '../../../interfaces/paquete.interface';
import { PaqueteService } from '../../../services/paquete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  public paypal=false;
  public tarjeta=false;
  public estaComprando = true;
  public usuario:Usuario;
  public loadingCompra = false;

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
    fecha:['', [Validators.required, this.validaFecha]],
    cantidad_adultos:[0, Validators.min(1)],
    cantidad_ninos:[0, Validators.required],
  });

  public paquete:Paquete;
  public cargando:boolean = true;
  public payPalConfig?:IPayPalConfig;

  constructor(private paqueteService:PaqueteService, private stripeService: StripeService, private activatedRoute:ActivatedRoute,
    private ventaService:VentaService, private fb:FormBuilder, private usuarioService: UsuarioService, private router:Router) {
      this.usuario = usuarioService.usuario;
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
      this.cargando=false;
      console.log(this.paquete);
    })
  }


  pagar(){    
    this.loadingCompra = true;
      this.stripeService
        .createToken(this.card.element, { 'name':`${this.usuario.first_name} ${this.usuario.last_name}` })
        .subscribe((result) => {
          if (result.token) {

            const data = {
              ...this.formPago.value,
              total : this.detalleVenta.total,
              stripeToken:result.token.id,
              paquete:this.paquete.id,
              descripcion: this.paquete.nombre,
              user: this.usuario.pk,
              nombre: `${this.usuario.first_name} ${this.usuario.last_name}`,
              email: this.usuario.email,
              status:1,
              metodo_pago:1,
            }

            this.ventaService.crearVenta(data)
            .subscribe(result=>{
              this.loadingCompra = false;
              console.log(result);
              Swal.fire('Completado', 'Se ha reservado el paquete', 'success');  
              if (this.usuario.is_superuser) {
                this.router.navigateByUrl('/account/ventas');
              }else{
                this.router.navigateByUrl('/account/compras');
              }
              
            }, (err) => {
              Swal.fire('Error', 'Error al reservar el paquete', 'error');  
            });

          } else if (result.error) {
            // Error creating the token
            this.loadingCompra = false;
            console.log(result.error.message);
            Swal.fire('Error', 'Error al reservar el paquete', 'error');  

          }
        });

  }

  elegirPago(){    
    if(this.formPago.invalid) {      
      return Object.values(this.formPago.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } 
    this.estaComprando = false;
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
                    value: String(this.detalleVenta.total),
                    breakdown: {
                        item_total: {
                            currency_code: 'MXN',
                            value: String(this.detalleVenta.total)
                        }
                    }
                },
                items: [{
                    name: this.paquete.nombre,
                    quantity: '1',
                    // category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'MXN',
                        value: String(this.detalleVenta.total),
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
          let reembolso_id = data.purchase_units[0].payments.captures[0].id;
          
          const dataForm = {
            ...this.formPago.value,
            total : this.detalleVenta.total,
            paquete:this.paquete.id,
            user:this.usuario.pk,
            status:1,
            metodo_pago:2,
            reembolso_compra: reembolso_id
          }
          this.ventaService.crearVenta(dataForm)
          .subscribe((result)=>{
            console.log(result);
            Swal.fire('Completado', 'Se ha reservado el paquete', 'success');  
              if (this.usuario.is_superuser) {
                this.router.navigateByUrl('/account/ventas');
              }else{
                this.router.navigateByUrl('/account/compras');
              }
          }, (err) => {
            Swal.fire('Error', 'Error al reservar el paquete', 'error');  
          });
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
          console.log('OnError', err);
          Swal.fire('Error', 'Error al cargar método de pago', 'error');  
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
    };
}

metodoPago(metodo:string){
  if (metodo=='paypal') {
    this.paypal = true;
    this.tarjeta = false;
  }else{
    this.paypal = false;
    this.tarjeta = true;
  }
}

}
