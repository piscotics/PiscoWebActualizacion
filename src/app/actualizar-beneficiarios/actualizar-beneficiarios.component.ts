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
import { BeneficiariosService } from 'app/services/beneficiarios.service';
import { ParentescoService } from 'app/services/parentesco.service';
import { UsuarioService } from 'app/services/usuario.service';

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
  selector: 'app-actualizar-beneficiarios',
  templateUrl: './actualizar-beneficiarios.component.html',
  styleUrls: ['./actualizar-beneficiarios.component.css']
})
export class ActualizarBeneficiariosComponent implements OnInit {

  public isSlideCheckedTieneMascota: boolean = false;
  public isSlideCheckedTieneSeguroM: boolean = false;
  public titularBd: any = [];
  public resultTitularBd: any = [];
  public departamentosBd: any = [];
  public parentescosBd: any = [];
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
  Parentesco : string='';
  Ciudad: string = '';
  Barrio: string = '';
  Telefono: string = '';
  Telefamiliar: string = '';
  TelefamiliarComfirmar: string = '';
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
  public usuarioBd: any = [];
  nombreUsuario: string = '';

  constructor(
   // private titularesService: TitularesService,
    private ciudadService: CiudadService,
    private departamentoService: DepartamentoService,
    private parentescoService : ParentescoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private modalService: DialogsService,
    private geolocalisacionServices: GeolocalizacionService,
    private utilidadesService : UtilidadesService,
    private beneficiariosService: BeneficiariosService,
    private usuarioService: UsuarioService,
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
  
    let id = this.route.snapshot.paramMap.get('idBeneficiario');
    this.documentoTitular = `${id}`;
    console.log('LA IDENTIFICACION DEL TIRULAR ES ' + this.documentoTitular);
    if (this.documentoTitular == '') {
    }
    //lista los departamentos
    this.getAllDepartamentos();
    

    //traer los parentescos
    this.getAllParentescos();

    //trae los datos del titular
    this.getTitular(this.documentoTitular);

     //trae el nombre del usuario
     this.usuarioBd = this.usuarioService.getArray();
     var userResult = this.usuarioBd.slice(0);
     console.log(
       'usuario logueado' +
         JSON.stringify(userResult[0].Username).replace(/['"]+/g, '')
     );
     this.Usuario = JSON.stringify(userResult[0].Username).replace(/['"]+/g, '');

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

  getAllParentescos() {
    this.parentescoService.getAllParentescos().subscribe((parentescos) => {
        this.parentescosBd = parentescos;
        console.log('los parentescos');
        console.log(parentescos);
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
    this.beneficiariosService.getBeneficiario(document).subscribe((titulares) => {
      this.titularBd = titulares;

      console.log('los beneficiarios ');
      console.log('aqui muestra los beneficiarios ',titulares);

      var titular = this.titularBd.slice(0);
      //verifico si existe la cedula si no existe redirecciona a nuevo
      this.encontroTitular = JSON.stringify(titular[0].Estado).replace(
        /['"]+/g,
        ''
      );

      if (this.encontroTitular == 'Sin Datos') {
        this.openDialogNoExisteAfiliacion();
      } else {
        //this.Contrato = JSON.stringify(titular[0].Contrato).replace(/['"]+/g, '');
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
        this.Direccion = JSON.stringify(titular[0].Direccion).replace(
          /['"]+/g,
          ''
        );
        this.Departamento = JSON.stringify(titular[0].Departamento).replace(
          /['"]+/g,
          ''
        );
        this.getAllCiudades(this.Departamento);
        this.Ciudad = JSON.stringify(titular[0].Ciudad).replace(/['"]+/g, '');
        this.Barrio = JSON.stringify(titular[0].Barrio).replace(/['"]+/g, '');
        this.Telefono = JSON.stringify(titular[0].Telefono).replace(
          /['"]+/g,
          ''
        );
        this.Telefamiliar = JSON.stringify(titular[0].Telefamiliar).replace(
          /['"]+/g,
          ''
        );
        this.Email = JSON.stringify(titular[0].Email).replace(/['"]+/g, '');

        this.FechaNacimiento = JSON.stringify(
          titular[0].FechaNacimiento
        ).replace(/['"]+/g, '');

        // let fecha = new Date(this.FechaNacimiento)
        // fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
        // console.log(fecha)

        //  this.FechaNacimientoDate = fecha;
        this.FechaNacimientoDate = new Date(this.FechaNacimiento + 'T00:00:00');

        this.Parentesco = JSON.stringify(titular[0].Parentesco).replace(
          /['"]+/g,
          ''
        );

        console.log(
          'la fecha anterior es  ' + this.FechaNacimiento + 'T03:00:00Z'
        );
        //this.FechaNacimientoDate = ;
        console.log('la fecha nueva es   ' + this.FechaNacimientoDate);
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
      (this.Telefamiliar.length == 10 ) &&
      (this.Telefamiliar == this.TelefamiliarComfirmar)&&
     (this.Email == '' || this.emailFormControl.status == "VALID" ) &&
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
        Procesado: "1",
        POSX: this.latitude,
        POSY: this.longitude,
        TienePlanExequial : '0',
        EntidadPlanExequial: '',
        Parentesco : this.Parentesco
      };
      console.log('enviara' + JSON.stringify(titulares));
      
      this.beneficiariosService.setBeneficiario(titulares).subscribe((newTitular) => {
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
      //verifica si el nuemero de celular es correcto
      if(this.Telefamiliar == this.TelefamiliarComfirmar){
         
      }else{
         //enviamos los datos a la modal
         this.sendModalMensage(
          'Valida Los Datos Del Celular',
          'Datos Errados'
        );
      }
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

}
