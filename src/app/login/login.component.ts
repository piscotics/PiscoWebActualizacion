import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMensajesComponent } from '../dialog-mensajes/dialog-mensajes.component';
import { UsuarioService } from '../services/usuario.service';
import { Router} from "@angular/router"
import { DialogNoAfiliadoComponent } from '../dialog-no-afiliado/dialog-no-afiliado.component';
import { DialogDatosPersonalesComponent } from '../dialog-datos-personales/dialog-datos-personales.component';
import { DialogsService } from '../services/dialogs.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario : string ="";
  password : string ="";
  public usuarioBd :any = [];
  encontroTitular: string ="";
  EstadoUsuario: number = 1;
  public parentMessage : string;
  public mensajeModal ="";
  NombreUsuario: string ="";
  public logoImage : string="";
  public logoImagei : string="";
  public _nitCliente : any;

  constructor( private usuarioService : UsuarioService,
    public dialog: MatDialog,
    public router: Router,
    private modalService : DialogsService
    ) {
      
     
    this.parentMessage ="message from parent";
    this._nitCliente = localStorage.getItem("nitcliente");
    this.logoImage = 'https://piscotics.com/BannerConsulta/BS' + this._nitCliente + '.jpg';
    this.logoImagei = 'https://piscotics.com/BannerConsulta/BI' + this._nitCliente + '.jpg';
   
    }

  ngOnInit(): void {
    
  }

  sendArray(datos: any) {
    this.usuarioService.setArray(datos);
  }
  

  
//lista los usuarios si existe lo deja ingresar 
  getUsuario(){
  
    this.parentMessage ="message from parent";
    this.usuarioService.getUsuario(this.usuario,this.password).subscribe(usuarios => {
      
    this.usuarioBd = usuarios;

    this.sendArray(this.usuarioBd);

   //this.router.navigate(["/home"]);
    console.log('aqui muestra los titulares ' )
    console.log( usuarios)     
    
    var userResult = this.usuarioBd.slice(0);
    //verifico si existe la cedula si no existe redirecciona a nuevo
    this.encontroTitular =  JSON.stringify(userResult[0].Estado).replace(/['"]+/g,'');  
    //no encontro el usuario 
    console.log('este es el estado '+this.encontroTitular)
    if (this.encontroTitular =="Sin Datos"){
     
       //enviamos los datos a la modal
       this.sendModalMensage("Usuario O Contraseña Incorrecta","Datos Incorrectos")
       //mostramos la modal
      this.openDialogMensajes();

     
    }else{
      console.log('vamos aqui ')
        
       //verifica si el usuario esta activo
       this.EstadoUsuario = parseInt(JSON.stringify(userResult[0].Estado).replace(/['"]+/g,''));
       console.log( 'el estado es' +  this.EstadoUsuario)
       //si esta activo redirecciona 
       if (this.EstadoUsuario == 0){
         this.NombreUsuario = JSON.stringify(userResult[0].Nombres).replace(/['"]+/g,'');
         console.log('el nombre es' + this.NombreUsuario  + 'el estado es' +  this.EstadoUsuario)
         this.router.navigate(["/home"]);
       }else{
         //enviamos los datos a la modal
       this.sendModalMensage("Usuario No Activo","Sin Información")
       //mostramos la modal
      this.openDialogMensajes();

       }
    }

    });
     
  
  }
  openDialogMensajes() {
   
    this.dialog.open(DialogMensajesComponent);
  }


   //envia el mensaje a la modal
   sendModalMensage(mensaje: string,titulo : string) {
    this.modalService.setMensaje(mensaje, titulo);
  }

}
