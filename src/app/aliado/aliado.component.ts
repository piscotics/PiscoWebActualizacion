import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
import { UtilidadesService } from '../services/utilidades.service';
import { AliadoService } from '../services/aliado.service';

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
  selector: 'app-aliado',
  templateUrl: './aliado.component.html',
  styleUrls: ['./aliado.component.css']
})
export class AliadoComponent implements OnInit {

  public isSlideCheckedTieneMascota: boolean = false;
  public isSlideCheckedTieneSeguroM: boolean = false;
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
  Categoria: string = 'Inactivo';
  Procesado: string = '0';
  latitude : string = '0';
  longitude : string = '0';
  public logoImage : string="";
  public _nitCliente : any;
  public _bdCliente : any;
  public _ipCliente : any;
  
  constructor(
    private aliadoService: AliadoService,
    private ciudadService: CiudadService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private modalService: DialogsService,
    private geolocalisacionServices: GeolocalizacionService,
    private utilidadesService : UtilidadesService
    
  ) {
    //estable el color de fondo
    document.body.style.background = 'rgba(214, 214, 214, 0.459)';
    console.log('el navegador es  ' +   this.utilidadesService.getBrowserName());
    //trae los datos del cliente por medio del dominio ya guardado localmente
    this._nitCliente = localStorage.getItem("nitcliente");
    this._bdCliente = localStorage.getItem("bdcliente");
    this._ipCliente= localStorage.getItem("ipcliente");
    this.logoImage = 'https://piscotics.com/LogoClientes/L' + this._nitCliente + '.jpg';
     
  }
  //permitir solo numeros
  onlyNumberKey(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  openDialogDatosAlmacendos() {
    this.dialog.open(DialogDatosPersonalesComponent);
  }

  ngOnInit(): void {
     //trae las cordenadas 
     this.getLocation();
   
    //lista los departamentos
    this.getAllDepartamentos();
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

  SetTitular() {
    if (
      this.Cedula !== '' &&
      this.Nombre1 !== '' &&
      this.Apellido1 !== '' &&
      this.Direccion !== '' &&
      this.Departamento !== '' &&
      this.Ciudad !== '' &&
      ( this.Telefamiliar.length == 10) &&
      (this.Email == '' || this.emailFormControl.status == "VALID" ) &&
      this.Categoria !== '' 
    ) {
      const aliados = {
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
        Procesado: this.Procesado,
        POSX : this.latitude,
        POSY : this.longitude,
        Categoria: this.Categoria
      };
      console.log('enviara' + JSON.stringify(aliados));

      this.aliadoService.setAliado(aliados).subscribe((newTitular) => {
        this.resultTitularBd = newTitular;
        var result = this.resultTitularBd.slice(0);
        this.resultTitular = JSON.stringify(result[0].Estado).replace(
          /['"]+/g,
          ''
        );

        //muestra modal que se almaceno correctamente
        if (this.resultTitular == 'Informacion Almacenada Correctamente') {
          this.openDialogDatosAlmacendos();
          this.limpiarDatos();
        }

        console.log(this.resultTitular);
      });
    } else {
      console.log("el email dice",this.emailFormControl.status == "INVALID")

      if(this.Telefamiliar.length < 10){
        //enviamos los datos a la modal
       this.sendModalMensage(
         'Valida Los Datos Del Celular',
         'Datos Errados'
       );
      }else{
        //enviamos los datos a la modal
        this.sendModalMensage(
          'Ingresa Los Datos Obligatorios(*) Para Enviar la Información',
          'Datos Obligatorios'
        );
      }
      //mostramos la modal
      this.openDialogMensajes();
    }
  }

  limpiarDatos() {
    this.Cedula = '';
    this.Nombre1= '';
    this.Nombre2 = '';
    this.Apellido1= '';
    this.Apellido2 = '';
    this.Direccion = '';
    this.Departamento = '';
    this.Ciudad = '';
    this.Barrio = '';
    this.Telefono= '';
    this.Telefamiliar = '';
    this.Email= '';
    this.Categoria = 'Participante';
    this.Procesado = '0';
    this.latitude  = '0';
    this.longitude  = '0';
  }

}


