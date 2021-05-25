import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogNoAfiliadoComponent } from '../dialog-no-afiliado/dialog-no-afiliado.component';
import { BeneficiariosService } from '../services/beneficiarios.service';
import { CiudadService } from '../services/ciudad.service';
import { DepartamentoService } from '../services/departamento.service';
import { DialogsService } from '../services/dialogs.service';
import { GeolocalizacionService } from '../services/geolocalizacion.service';
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
  public _nitCliente : string="";
  public _dominioCliente : string="";
  public encontroNit: string ="";
  public dominioBd : any = [];
  public dominioRuta : any = [];

  constructor(private ciudadService: CiudadService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private modalService: DialogsService,
    private geolocalisacionServices: GeolocalizacionService,
    private utilidadesService : UtilidadesService,
    private beneficiariosService : BeneficiariosService,
    @Inject(DOCUMENT) document: any) { }

  ngOnInit(): void {
  }

   //trae los datos del beneficiarios para mostrarlos en los campos utilizando ngmodel
   getbeneficiario(document: string) {
   
  }

  openDialogNoExisteAfiliacion() {
    this.titleModalPersona = 'No Hay Resultados.';
    this.dialog.open(DialogNoAfiliadoComponent);
  }

}
