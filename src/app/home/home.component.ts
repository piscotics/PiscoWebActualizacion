import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public isShownReporte: boolean = false;
  public usuarioBd :any = [];
  nombreUsuario : string ="";
  rolUsuario : string ="";
  public logoImage : string="";
  public _nitCliente : any;
 
  constructor( private usuarioService : UsuarioService,) { 
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
    console.log('el rol del usuario es  ' + this.rolUsuario)
    if(this.rolUsuario =="ADMINISTRADOR"){
      this.isShownReporte = true;
    }else{
      this.isShownReporte = false;
    }
    //this.nombreUsuario =  JSON.stringify(usuarioBd[0].Cedula).replace(/['"]+/g,'');
  }



  

 
}
