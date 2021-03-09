import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ReportesInterface } from '../interfaces/reportes';
import { ReportesService } from '../services/reportes.service';
import { UsuarioService } from '../services/usuario.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


const ELEMENT_DATA: ReportesInterface[] = [];
const now = Date();

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  public usuarioBd: any = [];
  public usuariologueadoBd: any = [];

  public dataSource: any;

  //displayedColumns: string[] = ['documento'];
  displayedColumns: string[] = [
    'documento',
    '1er Nombre',
    '2do Nombre',
    '1er Apellido',
    '2do Apellido',
    'Departamento',
    'Ciudad',
    'Direccion',
    'Barrio',
    'Telefono',
    'Celular',
    'Email',
    'Tiene Mascota',
    'Tiene Seguro',
    'Estado',
    'Procesado',
    'Detalle',
    'Fecha',
    'Guardar',
  ];

  public estadosBd: any = [
   
    { Dato: 'ACTIVO' },
    { Dato: 'RETIRADO' },
    { Dato: 'INACTIVO' },
    { Dato: 'REACTIVADO' },
    { Dato: 'PROSPECTO' },
  ];

  public reportesBd: any = [];

  UsuarioLogueado: string = '';

  FechaDesde: string = '';
  FechaHasta: string = '';
  Usuario: string = '';
  Estado: string = '';
  resultConfirmacion: string = '';
  resultConfirmacionBd: any = [];
  Procesado: number = 0;
  latitude : string = '';
  longitude : string = '';
  public isSlideCheckedProcesado: boolean = false;
  maxDate = new Date();

  constructor(
    private usuarioService: UsuarioService,
    private usuariologueadoService: UsuarioService,
    private reportesService: ReportesService
  ) {
    //estable el color de fondo
    document.body.style.background = 'rgba(214, 214, 214, 0.459)';
  }

  ngOnInit(): void {
    //trae el nombre del usuario logueado
    this.usuariologueadoBd = this.usuariologueadoService.getArray();
    var userResult = this.usuariologueadoBd.slice(0);
    console.log(
      'llego el array ' +
        JSON.stringify(userResult[0].Nombres).replace(/['"]+/g, '')
    );
    this.UsuarioLogueado = JSON.stringify(userResult[0].Nombres).replace(
      /['"]+/g,
      ''
    );

    //trae los  usuarios para listarlos
    this.usuarioService.getAllUsuario().subscribe((usuarios) => {
      this.usuarioBd = usuarios;
      console.log('los user so ')
      console.log( this.usuarioBd)
    });

    //busca los registros del dia actual
    this.buscarRegistros();
  }

  buscarRegistros() {
    //trae todas las actualizaciones
    this.reportesService
      .getRegistros(
        this.FechaDesde,
        this.FechaHasta,
        this.Usuario,
        this.Estado,
        this.Procesado,
        this.latitude,
        this.longitude
      )
      .subscribe((reportes) => {
        this.reportesBd = reportes;
        this.dataSource = new MatTableDataSource(this.reportesBd);
      });
  }

  actualizaRegistros(Documento: any) {
    console.log('la identificacion a actualizar es' + Documento);
    const confirmacion = {
      Cedula: Documento,
      Usuario: this.UsuarioLogueado,
      Estado: '',
    };
    console.log('enviara' + JSON.stringify(confirmacion));
    this.reportesService
      .setConfirmacion(confirmacion)
      .subscribe((newTitular) => {
        this.resultConfirmacionBd = newTitular;
        var result = this.resultConfirmacionBd.slice(0);
        
        this.resultConfirmacion = JSON.stringify(result[0].Estado).replace(/['"]+/g,'');

        //muestra modal que se almaceno correctamente
        if (
          this.resultConfirmacion == 'Informacion Actualizada Correctamente'
        ) {
          // this.openDialogDatosAlmacendos();
          console.log('datos actualizados ');
          //busca los registros del dia actual
          this.buscarRegistros();
        }

        console.log(this.resultConfirmacion);
      });
  }

  exportarExcel(){
    this.exportAsExcelFile(this.reportesBd, 'RegistrosActualizacion');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { homologacion: worksheet },
      SheetNames: ['homologacion'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  toggleChangesProcesado($event: MatSlideToggleChange) {
    this.isSlideCheckedProcesado = $event.checked;
    if (this.isSlideCheckedProcesado == true) {
      console.log('procesado es ' + this.isSlideCheckedProcesado);
      this.Procesado = 1;
    } else {
      console.log(' procesado es  ' + this.isSlideCheckedProcesado);
      this.Procesado = 0;
    }
  }
}
