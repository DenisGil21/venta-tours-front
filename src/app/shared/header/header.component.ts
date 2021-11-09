import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
// declare var google:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario

  constructor(private router:Router, private usuarioService: UsuarioService) {
   }

  ngOnInit(): void {
    // this.googleTranslateElementInit();
    
  }
  // googleTranslateElementInit(){
  //   // new google.translate.TranslateElement({pageLanguage:'en'}, 'google_translate_element')
  //   new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'ca,eu,gl,en,fr,it,pt,de,es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true}, 'google_translate_element');
  // }

  existeUsuario():boolean{
    if(localStorage.getItem('username')){
      this.usuario = new Usuario(localStorage.getItem('username'),'','','');
      return true
    }else{
      return false
    }
  }

  buscar(termino:string){    
    if (termino.length !== 0){
      this.router.navigate(['/home'], {queryParams:{paquete:termino},queryParamsHandling: 'merge'});
    }else{
      this.router.navigate(['/home'], {queryParams:{paquete:null},queryParamsHandling: 'merge'});
    }
  }

  logout(){
    this.usuarioService.logout();
    this.usuario = null;
    this.router.navigateByUrl('/auth/login')
  }

}
