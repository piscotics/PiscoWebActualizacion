import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogActualizarDatosComponent } from '../dialog-actualizar-datos/dialog-actualizar-datos.component';
import { DialogMensajesComponent } from '../dialog-mensajes/dialog-mensajes.component';
import { CambioclaveService } from '../services/cambioclave.service';
import { DialogsService } from '../services/dialogs.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  passwordactual : string = '';
  passwordnuevo : string = '';
  passwordconfirmacion : string = '';
  passwordactualcliente : string ='';
  public resultClaveBd: any = [];
  public resultClave: string = '';
  public usuarioBd :any = [];
  nombreUsuario : string ="";
  rolUsuario : string ="";
  usuarioactual : string ="";
  claveactual : string ="";
  public logoImage : string="";
  public _nitCliente : any;
  
  claveFormControl = new FormControl('', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*[.!#$%&’*/=?^_`{|}~-].*/),Validators.maxLength(20),
  Validators.minLength(5)]);
  clavenuevaFormControl = new FormControl('', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*[.!#$%&’*/=?^_`{|}~-].*/),Validators.maxLength(20),
  Validators.minLength(5)]);
  clavenuevaconfirmacionFormControl = new FormControl('', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*[.!#$%&’*/=?^_`{|}~-].*/),Validators.maxLength(20),
  Validators.minLength(5)]);

  constructor(private modalService: DialogsService,  public dialog: MatDialog,
    private cambioclaveService : CambioclaveService,
    private usuarioService : UsuarioService,
    private router: Router,) { 

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

    this.usuarioactual =JSON.stringify(userResult[0].Username).replace(/['"]+/g,'');
    console.log('usuario es  ' + this.usuarioactual)
    this.claveactual =JSON.stringify(userResult[0].Pwduser).replace(/['"]+/g,'');
    console.log('clave es  ' + this.claveactual)

  }
  SetClave() {
    
    if (
      this.passwordactual !== '' &&
      this.passwordnuevo !== '' &&
      this.passwordconfirmacion !== '' &&
      this.passwordactual == this.claveactual &&
      this.claveFormControl.status !== "VALID"  &&
      this.clavenuevaFormControl.status !== "VALID"  &&
      this.clavenuevaconfirmacionFormControl.status !== "VALID"  &&
      this.passwordnuevo == this.passwordconfirmacion
    ) {
      const clave = {
        Usuario: this.usuarioactual,
        Clavenueva: this.passwordnuevo
      };
      console.log('cambio clave' + JSON.stringify(clave));
      this.cambioclaveService.setClave(clave).subscribe((newclave) => {
        this.resultClaveBd = newclave;
        var result = this.resultClaveBd.slice(0);
        this.resultClave = JSON.stringify(result[0].Estado).replace(
          /['"]+/g,
          ''
        );

        //muestra modal que se almaceno correctamente
        if (this.resultClave == 'Clave Actualizada Correctamente') {
         // this.openDialogDatosAlmacendos();
          this.router.navigate(['/inicio']);
          
         
        }

        console.log(this.resultClave);
      });
    } else {
      //enviamos los datos a la modal
      this.sendModalMensage(
        'Verifique Los Datos Ingresados Contraseña Incorrecta O No Cumple Con Los Requisitos',
        'Datos Obligatorios'
      );
      //mostramos la modal
      this.openDialogMensajes();
    }
  }
  openDialogDatosAlmacendos() {
    this.dialog.open(DialogActualizarDatosComponent);
  }
//envia el mensaje a la modal
  sendModalMensage(mensaje: string, titulo: string) {
    this.modalService.setMensaje(mensaje, titulo);
  }

  openDialogMensajes () {
    this.dialog.open(DialogMensajesComponent);
  }

  
}
