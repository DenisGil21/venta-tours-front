import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public formContacto:FormGroup;

  constructor(private fb: FormBuilder) { 
    this.formularioContacto();
  }

  ngOnInit(): void {
  }

  formularioContacto(){
    this.formContacto = this.fb.group({
      correo:[''],
      titulo:[''],
      comentario:['']
    });
  }

  enviarComentario(){
    console.log(this.formContacto);
    
  }

}
