import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registroForm = this.fb.group({
    username: ['', Validators.required],
    email: ['',[ Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  public cargando = false;
  public formSubmitted = false;

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  registro(){
    this.formSubmitted = true;
    if (!this.registroForm.valid) {
      return
    }
    this.cargando = true;
    const data = {
      ...this.registroForm.value
    }
    delete data.password2;
    
    this.usuarioService.registroUsuario(data)
    .subscribe(resp => {
      this.cargando = false;
      this.router.navigateByUrl('/account');
    },(err)=>{
      console.log(err);
      this.cargando = false;
      let error:any;
      if (err.error.email) {
        [error] = err.error.email
      }else if(err.error.username){
        [error] = err.error.username
      } 
      Swal.fire('Error', error, 'error');
    });
    
    
  }

  campoNoValido(campo:string):boolean {

    if (this.registroForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registroForm.get('password').value;
    const pass2 = this.registroForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control =  formGroup.get(pass1Name);
      const pass2Control =  formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual:true});
      }

    }

  }
  

}
