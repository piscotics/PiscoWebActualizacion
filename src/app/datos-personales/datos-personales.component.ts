import {
  Component,
  HostBinding,
  Inject,
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
import { DialogMensajesComponent } from '../dialog-mensajes/dialog-mensajes.component';
import { DialogsService } from '../services/dialogs.service';
import { AppComponent } from '../app.component';
import { GeolocalizacionService } from '../services/geolocalizacion.service';
import { DOCUMENT } from '@angular/common';
import { UtilidadesService } from '../services/utilidades.service';

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
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent implements OnInit {
  public isSlideCheckedTieneMascota: boolean = false;
  public isSlideCheckedTieneSeguroM: boolean = false;
  public titularBd: any = [];
  public resultTitularBd: any = [];
  public departamentosBd: any = [];
  public resultTitular: string = '';
  public encontroTitular: string = '';
  public ciudadesBd: any = [];
  public documentoTitular: string = '';
  public titleModalPersona: string = '';
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
  Email: string = '';
  FechaNacimiento: string = '';
  FechaNacimientoDate: Date = new Date();
  Estado: string = '';
  TieneMascota: string = '0';
  TieneSeguro: string = '0';
  Detalle: string = '';
  Usuario: string = '';
  Procesado: string = '0';
  latitude: string = '0';
  longitude:string = '0';
  mascota : boolean =false;
  seguro : boolean =false;
  public logoImage : string="";
  public _nitCliente : any;
  public _bdCliente : any;
  public _ipCliente : any;
  public _dominioCliente : string="";
  public encontroNit: string ="";
  public dominioBd : any = [];
  public dominioRuta : any = [];

  constructor(
    private titularesService: TitularesService,
    private ciudadService: CiudadService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private modalService: DialogsService,
    private geolocalisacionServices: GeolocalizacionService,
    private utilidadesService : UtilidadesService,
    @Inject(DOCUMENT) document: any
  ) {
    //estable el color de fondo
    document.body.style.background = 'rgba(214, 214, 214, 0.459)';

      
      
      this._nitCliente = localStorage.getItem("nitcliente");
      this.logoImage = 'https://piscotics.com/LogoClientes/L' + this._nitCliente + '.jpg';
     
     
  }

  ngOnInit(): void {
    //trae las cordenadas
    this.getLocation();
   
    //trae la cedula desde la url de la pagina enviada al momento de consultar
    let id = this.route.snapshot.paramMap.get('id');
    this.documentoTitular = `${id}`;
    if (this.documentoTitular == '') {
    }
    //lista los departamentos
    this.getAllDepartamentos();
    //trae los datos del titular
    this.getTitular(this.documentoTitular);
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
    this.titleModalPersona = 'Datos Almacenados.';
    this.dialog.open(DialogDatosPersonalesComponent);
  }

  openDialogNoExisteAfiliacion() {
    this.titleModalPersona = 'No Hay Resultados.';
    this.dialog.open(DialogNoAfiliadoComponent);
  }

  getAllDepartamentos() {
    this.departamentoService.getAllDepartamentos().subscribe((departamentos) => {
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

  //trae los datos del titular para mostrarlos en los campos utilizando ngmodel
  getTitular(document: string) {
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

      if (this.encontroTitular == 'Sin Datos') {
        this.openDialogNoExisteAfiliacion();
      } else {
        this.Cedula = JSON.stringify(titular[0].Cedula).replace(/['"]+/g, '');
        this.Estado = JSON.stringify(titular[0].Estado).replace(/['"]+/g, '');
        this.Nombre1 = JSON.stringify(titular[0].Nombre1).replace(/['"]+/g, '');
        this.Nombre2 = JSON.stringify(titular[0].Nombre2).replace(/['"]+/g, '');
        this.Apellido1 = JSON.stringify(titular[0].Apellido1).replace(
          /['"]+/g,
          ''
        );
        this.Apellido2 = JSON.stringify(titular[0].Apellido2).replace(
          /['"]+/g,
          ''
        );
        // this.Direccion = JSON.stringify(titular[0].Direccion).replace(/['"]+/g,'');
        // this.Departamento  = JSON.stringify(titular[0].Departamento).replace(/['"]+/g,'');
        // this.Ciudad = JSON.stringify(titular[0].Ciudad).replace(/['"]+/g,'');
        // this.Barrio = JSON.stringify(titular[0].Barrio).replace(/['"]+/g,'');
        // this.Telefono = JSON.stringify(titular[0].Telefono).replace(/['"]+/g,'');
        // this.Telefamiliar= JSON.stringify(titular[0].Telefamiliar).replace(/['"]+/g,'');
        // this.Email= JSON.stringify(titular[0].Email).replace(/['"]+/g,'');
        // this.FechaNacimiento = JSON.stringify(titular[0].FechaNacimiento).replace(/['"]+/g,'');
      }
    });
  }

  openDialogMensajes() {
    this.dialog.open(DialogMensajesComponent);
  }

  //envia el mensaje a la modal
  sendModalMensage(mensaje: string, titulo: string) {
    this.modalService.setMensaje(mensaje, titulo);
  }

  SetTitular() {
    if (
      this.Cedula !== '' &&
      this.Nombre1 !== '' &&
      this.Apellido1 !== '' &&
      this.Direccion !== '' &&
      this.Departamento !== '' &&
      this.Ciudad !== '' &&
      this.Telefamiliar !== '' &&
     (this.Email == 'NA' || this.emailFormControl.status == "VALID" ) &&
      this.FechaNacimientoDate !== null
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
        POSX: this.latitude,
        POSY: this.longitude,
        TienePlanExequial : '0',
        EntidadPlanExequial: ''
      };
      console.log('enviara' + JSON.stringify(titulares));
      
      this.titularesService.setTitular(titulares).subscribe((newTitular) => {
        this.resultTitularBd = newTitular;

        var result = this.resultTitularBd.slice(0);

        this.resultTitular = JSON.stringify(result[0].Estado).replace(/['"]+/g,'');

        //muestra modal que se almaceno correctamente
        if (this.resultTitular == 'Informacion Almacenada Correctamente') {
          this.openDialogDatosAlmacendos();
        }

        console.log(this.resultTitular);
      });
    } else {
      //enviamos los datos a la modal
      this.sendModalMensage(
        'Ingresa Los Datos Obligatorios(*) Para Enviar la Información',
        'Datos Obligatorios'
      );
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
}
