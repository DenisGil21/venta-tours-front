import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public cargando:boolean = false;

  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private fb:FormBuilder, private usuario:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    if (!this.loginForm.valid) {
      Swal.fire('Error', 'Los campos no deben estar vacíos', 'error');
      return
    }
    this.cargando = true;
    this.usuario.login(this.loginForm.value)
    .subscribe(resp =>{
      console.log(resp);
      this.router.navigateByUrl('/account');
      
    },(err)=>{      
      Swal.fire('Error', 'Usuario o contraseña inválidos', 'error');
      this.cargando = false;
    })
  }

}
