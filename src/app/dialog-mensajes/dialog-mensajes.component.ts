import { Component, Input, OnInit } from '@angular/core';
import { DialogsService } from '../services/dialogs.service';

@Component({
  selector: 'app-dialog-mensajes',
  templateUrl: './dialog-mensajes.component.html',
  styleUrls: ['./dialog-mensajes.component.css']
})
export class DialogMensajesComponent implements OnInit {

  mensaje: string ="";
  titulo : string ="";
 

  constructor( private modalService : DialogsService) {

  
   }

  
  ngOnInit(): void {
    //traemos el mensaje establecido 
    this.mensaje = this.modalService.getMensaje();
    this.titulo = this.modalService.getTitulo();
   
   
  }

}
