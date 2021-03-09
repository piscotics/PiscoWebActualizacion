import { DOCUMENT } from '@angular/common';
import { Component, Directive, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMensajesComponent } from '../dialog-mensajes/dialog-mensajes.component';
import { DialogMensajesModule } from '../dialog-mensajes/dialog-mensajes.module';
import { DialogsService } from '../services/dialogs.service';


import { TitularesService } from "../services/titulares.service";
import { UtilidadesService } from '../services/utilidades.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  

  public documento : string = "";
  public currentItem : string ="televisor";
  
  constructor( private router: Router,
    private titularesService : TitularesService,
    public dialog: MatDialog,
    private modalService : DialogsService,
    private utilidadesService : UtilidadesService,
    @Inject(DOCUMENT) document: any) { 
      //traigo la url actual del usuario 
      console.log('la url actual es  ' + document.location.href);
     
      console.log('el navegador es  ' +   this.utilidadesService.getBrowserName());


    }

    

//permitir solo numeros
  onlyNumberKey(event: { charCode: number; }) {
      return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  ngOnInit(): void {
    console.log('llego')
  }

 

  getConsultaCedula(){
    
    if (this.documento !== ""){
      this.router.navigate(['/datos-personales', this.documento]);
    
    }else{
      //enviamos los datos a la modal
      this.sendModalMensage("Ingrese El Numero De Docuemnto A Consultar","Sin Información")
      //mostramos la modal
      this.openDialogMensajes();
    }
   // this.router.navigate();
    console.log('cedula ' + this.documento);
  }

  //envia el mensaje a la modal
  sendModalMensage(mensaje: string,titulo : string) {
    this.modalService.setMensaje(mensaje, titulo);
  }

  //mostramos la modal
  openDialogMensajes() {
   
    this.dialog.open(DialogMensajesComponent);
  }


}
