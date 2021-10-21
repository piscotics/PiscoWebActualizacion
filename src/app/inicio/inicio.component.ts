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
  public logoImage : string="";
  public _nitCliente : string="";
  public _bdCliente : string="";
  public _ipCliente : string="";
  public _dominioCliente : string="";
  public encontroNit: string ="";
  public dominioBd : any = [];
  public dominioRuta : any = [];
  public _rutaBdPrincipal : string="";

  // src="./assets/img/Logo.jpg" 
  
  constructor( private router: Router,
    private titularesService : TitularesService,
    public dialog: MatDialog,
    private modalService : DialogsService,
    private utilidadesService : UtilidadesService,
   

    @Inject(DOCUMENT) document: any) { 

      this._dominioCliente = document.location.href
       //trae el nit del cliente
       //extraigo la ruta en un array
       this.dominioRuta = this._dominioCliente.split("/");
       console.log("la ruta es ");
       console.log(this.dominioRuta[2] );
       //asigno solo la ruta recortando el http y la pagina actual
       this._dominioCliente = this.dominioRuta[2];
       //envio la ruta recortando el puerto
       this.consultarDatosCliente('funsanpedroweb.piscotics.com')//this._dominioCliente.replace(":9040","") obedweb.piscotics.com funsanpedroweb.piscotics.com obedweb.piscotics.com this._dominioCliente.replace(":9040","")

      //traigo la url actual del usuario 
      console.log('la url actual es  ' + document.location.href);
     
      console.log('el navegador es  ' +   this.utilidadesService.getBrowserName());
     

    }

    
    //trae los datos del cliente
   consultarDatosCliente(_dominioCliente :string){

      this.utilidadesService.getNitCliente(_dominioCliente).subscribe(dominio => {
      
        this.dominioBd = dominio;
         
        var userResult = this.dominioBd.slice(0);
        //verifico si existe la cedula si no existe redirecciona a nuevo
        this.encontroNit =  JSON.stringify(userResult[0].Estado).replace(/['"]+/g,'');  
        //no encontro el usuario 
        console.log('este es el estado '+this.encontroNit)
        if (this.encontroNit =="Sin Datos"){
         console.log("no se encontro dominio")
        }else{

           //verifica si el usuario esta activo
           this._nitCliente = JSON.stringify(userResult[0].Identificacion).replace(/['"]+/g,'');
           this._bdCliente = JSON.stringify(userResult[0].RutaBd).replace(/['"]+/g,'');
           this._ipCliente =  JSON.stringify(userResult[0].Ip).replace(/['"]+/g,'');
           this._rutaBdPrincipal  =  JSON.stringify(userResult[0].RutaBdPrincipal).replace(/['"]+/g,'');

           localStorage.removeItem("bdcliente")
           localStorage.setItem("bdcliente", this._bdCliente)
           
           localStorage.removeItem("nitcliente")
           localStorage.setItem("nitcliente", this._nitCliente)

           localStorage.removeItem("ipcliente")
           localStorage.setItem("ipcliente", this._ipCliente)

           localStorage.removeItem("rutaBd")
           localStorage.setItem("rutaBd", this._rutaBdPrincipal)
           
           console.log("el nit del cliente es "+ this._nitCliente + " y la ruta de la bede es "+ this._rutaBdPrincipal  )

           this.logoImage = 'https://piscotics.com/LogoClientes/L' + this._nitCliente + '.jpg';
        }
    
        });
      

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
