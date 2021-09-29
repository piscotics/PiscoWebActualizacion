import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public isShownReporte: boolean = false;
  public isShownActualizarTitular: boolean = false;
  public usuarioBd :any = [];
  nombreUsuario : string ="";
  rolUsuario : string ="";
  cargoUsuario : string ="";
  configuracion : string ="";
  public logoImage : string="";
  public _nitCliente : any;
 
  constructor( private usuarioService : UsuarioService,
    private router: Router,) { 
    //estable el color de fondo
    document.body.style.background = 'rgba(214, 214, 214, 0.459)';
    this._nitCliente = localStorage.getItem("nitcliente");
    this.logoImage = 'https://piscotics.com/LogoClientes/L' + this._nitCliente + '.jpg';
   

  }
  
  ngOnInit(): void {

    this.usuarioBd =  this.usuarioService.getArray();
    var userResult = this.usuarioBd.slice(0);
    console.log("llego el array "+JSON.stringify(userResult[0].Nombres).replace(/['"]+/g,'')  );
    this.nombreUsuario =JSON.stringify(userResult[0].Nombres).replace(/['"]+/g,'');
    this.rolUsuario =JSON.stringify(userResult[0].Dbrol).replace(/['"]+/g,'');
    this.cargoUsuario =JSON.stringify(userResult[0].Cargo).replace(/['"]+/g,'');
    this.configuracion =JSON.stringify(userResult[0].Configuracion).replace(/['"]+/g,'');
    
    console.log('la configuracion del usuario es  ' + this.configuracion)
    if(this.rolUsuario =="ADMINISTRADOR" || (this.rolUsuario =="INSERTAR" &&  this.cargoUsuario =="Aliado")){
      this.isShownReporte = true;
    }else{
      this.isShownReporte = false;
    }

    if( this.cargoUsuario =="Aliado"){
      this.isShownActualizarTitular = false;
    }else{
      this.isShownActualizarTitular = true;
    }

    if(this.configuracion == "1"){
      this.router.navigate(['/cambiar-clave']);
    }
    //this.nombreUsuario =  JSON.stringify(usuarioBd[0].Cedula).replace(/['"]+/g,'');
  }



  

 
}
