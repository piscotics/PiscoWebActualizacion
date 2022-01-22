import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TitularesService } from '../services/titulares.service';
import { InicioComponent } from '../inicio/inicio.component';
import { ActivatedRoute } from '@angular/router';
import { TitularInterface } from '../interfaces/titular';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ErrorStateMatcher } from '@angular/material/core';
import { CiudadService } from '../services/ciudad.service';
import { DepartamentoService } from '../services/departamento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDatosPersonalesComponent } from './../dialog-datos-personales/dialog-datos-personales.component';
import { DialogNoAfiliadoComponent } from '../dialog-no-afiliado/dialog-no-afiliado.component';
import { UsuarioService } from '../services/usuario.service';
import { DialogMensajesComponent } from '../dialog-mensajes/dialog-mensajes.component';
import { DialogsService } from '../services/dialogs.service';
import { AppComponent } from '../app.component';
import { GeolocalizacionService } from '../services/geolocalizacion.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-prospecto-titular',
  templateUrl: './prospecto-titular.component.html',
  styleUrls: ['./prospecto-titular.component.css'],
})
export class ProspectoTitularComponent implements OnInit {
  public isSlideCheckedTieneMascota: boolean = false;
  public isSlideCheckedTieneSeguroM: boolean = false;
  public isSlideCheckedTienePlanExequial: boolean = false;
  public isSlideCheckedDatosPersonales: boolean = false;
  public titularBd: any = [];
  public resultTitularBd: any = [];
  public departamentosBd: any = [];
  public resultTitular: string = '';
  public encontroTitular: string = '';
  public ciudadesBd: any = [];
  public documentoTitular: string = '';
  maxDate = new Date();
  emailFormControl = new FormControl('',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),Validators.maxLength(100),
  Validators.minLength(2)]);
  matcher = new MyErrorStateMatcher();
  Contrato: string = '';
  Cedula: string = '';
  Nombre1: string = '';
  Nombre2: string = '';
  Apellido1: string = '';
  Apellido2: string = '';
  Direccion: string = '';
  Departamento: string = '';
  Ciudad: string = '';
  Barrio: string = '';
  Telefono: string = '';
  Telefamiliar: string = '';
  TelefamiliarComfirmar: string = '';
  Email: string = '';
  FechaNacimiento: string = '';
  FechaNacimientoDate: Date = new Date();
  Estado: string = 'PROSPECTO';
  TieneMascota: string = '0';
  TieneSeguro: string = '0';
  TienePlanExequial: string = '0';
  AutorizoDatosPersonales:  string = '0';
  Detalle: string = '';
  Usuario: string = '';
  latitude : string = '0';
  longitude : string = '0';
  Procesado: string = '1';
  public usuarioBd: any = [];
  nombreUsuario: string = '';
  mascota : boolean =false;
  seguro : boolean =false;
  planexequial : boolean =false;
  public logoImage : string="";
  public linkDatosPersonales : string="";
  public _nitCliente : any;
  public registrarprospecto :boolean =false;
  EntidadPlanExequial : string ="";
   
  constructor(
    private titularesService: TitularesService,
    private ciudadService: CiudadService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private modalService: DialogsService,
    private geolocalisacionServices: GeolocalizacionService
  ) {
    //estable el color de fondo
    document.body.style.background = 'rgba(214, 214, 214, 0.459)';
    this._nitCliente = localStorage.getItem("nitcliente");
      this.logoImage = 'https://piscotics.com/LogoClientes/L' + this._nitCliente + '.jpg';
      this.linkDatosPersonales = 'https://www.piscotics.com/PDFClientes/AUTDATOS' + this._nitCliente + '.pdf'
  }

  ngOnInit(): void {
     //trae las cordenadas 
     this.getLocation();
     //lista los departamentos
     this.getAllDepartamentos();
    //trae el nombre del usuario
    this.usuarioBd = this.usuarioService.getArray();
    var userResult = this.usuarioBd.slice(0);
    console.log(
      'usuario logueado  ' +
        JSON.stringify(userResult[0].Username).replace(/['"]+/g, '')
    );
    this.Usuario = JSON.stringify(userResult[0].Username).replace(/['"]+/g, '');
  }

  limpiarDatos() {
    this.Contrato='';
    this.Nombre1 = '';
    this.Nombre2 = '';
    this.Apellido1 = '';
    this.Apellido2 = '';
    this.Direccion = '';
    this.Departamento = '';
    this.Ciudad = '';
    this.Barrio = '';
    this.Telefono = '';
    this.Telefamiliar = '';
    this.Email = '';
    this.FechaNacimiento = '';
    this.FechaNacimientoDate = new Date();
    this.Estado = '';
    this.TieneMascota = '0';
    this.TieneSeguro = '0';
    this.TienePlanExequial ='0';
    this.Detalle = '';
    this.Procesado = '1';
    this.mascota = false;
    this.seguro = false;
    this.planexequial = false;
  }


  //se utiliza para traer la ubicacion
  getLocation() {
    this.geolocalisacionServices.getPosition().then((pos) => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
      console.log('cordenada x = ' + this.latitude);
      console.log('cordenada y = ' +  this.longitude);
    });
  }
  //permitir solo numeros
  onlyNumberKey(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  openDialogDatosAlmacendos() {
    this.dialog.open(DialogMensajesComponent);
  }

  getAllDepartamentos() {
    this.departamentoService
      .getAllDepartamentos()
      .subscribe((departamentos) => {
        this.departamentosBd = departamentos;

        console.log('los departa');
        console.log(departamentos);
      });
  }

  getAllCiudades(dapartamento: string) {
    this.ciudadService.getAllCiudad(dapartamento).subscribe((ciudades) => {
      this.ciudadesBd = ciudades;
      console.log('las ciudaded');
      console.log(ciudades);
    });
  }


  openDialogMensajes() {
    this.dialog.open(DialogMensajesComponent);
  }

  //envia el mensaje a la modal
  sendModalMensage(mensaje: string, titulo: string) {
    this.modalService.setMensaje(mensaje, titulo);
  }

  //trae los datos del titular para mostrarlos en los campos utilizando ngmodel
  getTitular(document: string) {
    this.registrarprospecto = true;
    console.log('buscar' + document);
    this.titularesService.getTitular(document).subscribe((titulares) => {
      this.titularBd = titulares;

      console.log('aqui muestra los titulares ');
      console.log(titulares);

      var titular = this.titularBd.slice(0);
      //verifico si existe la cedula si no existe redirecciona a nuevo
      this.encontroTitular = JSON.stringify(titular[0].Estado).replace(
        /['"]+/g,
        ''
      );

      if (this.encontroTitular == 'ACTIVO') {
        this.sendModalMensage("No Se Puede Registrar La Informacion, Ya Existe","Ya Existe")
      } else if (this.encontroTitular == 'RETIRADO')  {
        this.sendModalMensage("La Informacion Ya Existe Con Estado Retirado","Ya Existe")
        this.guardarProspecto();
      }else{
        this.guardarProspecto();
      }
    });
  }


  SetTitular() {
    //consulta la cedula al momento de almacenar 
    this.getTitular(this.Cedula);
    
  }

  guardarProspecto(){
    //valida los datoa para almacenar 
    if (
      this.Cedula !== '' &&
      this.Nombre1 !== '' &&
      this.Apellido1 !== '' &&
      this.Departamento !== '' &&
      this.Ciudad !== '' &&
      (this.Telefamiliar.length == 10) &&
      (this.Telefamiliar == this.TelefamiliarComfirmar)&&
      (this.Email == '' || this.emailFormControl.status == "VALID" ) &&
      this.FechaNacimientoDate !== null &&
      this.isSlideCheckedDatosPersonales == true
    ) {
      const titulares = {
        Contrato : this.Contrato,
        Cedula: this.Cedula,
        Nombre1: this.Nombre1,
        Nombre2: this.Nombre2,
        Apellido1: this.Apellido1,
        Apellido2: this.Apellido2,
        Direccion: this.Direccion,
        Departamento: this.Departamento,
        Ciudad: this.Ciudad,
        Barrio: this.Barrio,
        Telefono: this.Telefono,
        Telefamiliar: this.Telefamiliar,
        Email: this.Email,
        FechaNacimiento: this.FechaNacimientoDate,
        Estado: this.Estado,
        TieneMascota: this.TieneMascota,
        TieneSeguro: this.TieneSeguro,
        Detalle: this.Detalle,
        Usuario: this.Usuario,
        Procesado: this.Procesado,
        POSX : this.latitude,
        POSY : this.longitude,
        TienePlanExequial : this.TienePlanExequial,
        EntidadPlanExequial :  this.EntidadPlanExequial
      };
      console.log('enviara' + JSON.stringify(titulares));
      this.titularesService.setTitular(titulares).subscribe((newTitular) => {
        this.resultTitularBd = newTitular;
        var result = this.resultTitularBd.slice(0);
        this.resultTitular = JSON.stringify(result[0].Estado).replace(
          /['"]+/g,
          ''
        );

        //muestra modal que se almaceno correctamente
        if (this.resultTitular == 'Informacion Almacenada Correctamente') {
          this.sendModalMensage("Informacion Almacenada Correctamente","Información")
           //mostramos la modal
          this.openDialogMensajes();
        }

        console.log(this.resultTitular);
      });
    } else {
        
        if(this.Telefamiliar.length < 10){
            //enviamos los datos a la modal
            this.sendModalMensage(
              'Valida Los Datos Del Celular',
              'Datos Errados'
            );
        }else{
          //verifica si el nuemero de celular es correcto
            if(this.Telefamiliar == this.TelefamiliarComfirmar){
                //enviamos los datos a la modal
              this.sendModalMensage(
                'Ingresa Los Datos Obligatorios(*) Para Enviar la Información',
                'Datos Obligatorios'
              );
            }else{
              //enviamos los datos a la modal
              this.sendModalMensage(
                'Valida Los Datos Del Celular',
                'Datos Errados'
              );
            }
          
        }
     
      //mostramos la modal
      this.openDialogMensajes();
    }

  }

  toggleChangesTieneMascota($event: MatSlideToggleChange) {
    this.isSlideCheckedTieneMascota = $event.checked;
    if (this.isSlideCheckedTieneMascota == true) {
      console.log('mascota ' + this.isSlideCheckedTieneMascota);
      this.TieneMascota = '1';
    } else {
      console.log('mascota ' + this.isSlideCheckedTieneMascota);
      this.TieneMascota = '0';
    }
  }

  toggleChangesTieneSeguroMascota($event: MatSlideToggleChange) {
    this.isSlideCheckedTieneSeguroM = $event.checked;
    if (this.isSlideCheckedTieneSeguroM == true) {
      console.log('seguro mascota ' + this.isSlideCheckedTieneSeguroM);
      this.TieneSeguro = '1';
    } else {
      console.log('seguro mascota ' + this.isSlideCheckedTieneSeguroM);
      this.TieneSeguro = '0';
    }
  }

  toggleChangesTienePlanExequial($event: MatSlideToggleChange) {
    this.isSlideCheckedTienePlanExequial = $event.checked;
    if (this.isSlideCheckedTienePlanExequial == true) {
      console.log('seguro plan exequial ' + this.isSlideCheckedTienePlanExequial);
      this.TienePlanExequial = '1';
    } else {
      console.log('seguro plan exequial ' + this.isSlideCheckedTienePlanExequial);
      this.TienePlanExequial = '0';
    }
  }

  
  toggleChangesDatosPersonales($event: MatSlideToggleChange) {
    this.isSlideCheckedDatosPersonales = $event.checked;
    if (this.isSlideCheckedDatosPersonales == true) {
      console.log('datos personales ' + this.isSlideCheckedDatosPersonales);
      this.AutorizoDatosPersonales = '1';
    } else {
      console.log('datos personales ' + this.isSlideCheckedDatosPersonales);
      this.AutorizoDatosPersonales = '0';
    }
  }
   
}
