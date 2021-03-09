import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  mensaje: string ="";
  titulo : string ="";
  constructor() { }

  //trae el array de la sucursal seleccionada
  setMensaje(mensaje: string,titulo : string) {
    this.mensaje = mensaje;
    this.titulo = titulo;
  }

  //envia el mensaje a la modal
  getMensaje() {
    return this.mensaje ;
  }
   //envia el titulo a la modal
   getTitulo() {
    return  this.titulo ;
  }
}
