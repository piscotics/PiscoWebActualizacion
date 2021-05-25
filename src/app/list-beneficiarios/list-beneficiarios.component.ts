import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiariosService } from '../services/beneficiarios.service';

@Component({
  selector: 'app-list-beneficiarios',
  templateUrl: './list-beneficiarios.component.html',
  styleUrls: ['./list-beneficiarios.component.css']
})
export class ListBeneficiariosComponent implements OnInit {

  public dataSource: any;
  public documentoTitular: string = '';
  public contratoTitular: string = '';
  public beneficiarioBd: any = [];

  displayedColumns: string[] = [
    'documento',
    '1er Nombre',
    '2do Nombre',
    '1er Apellido',
    '2do Apellido',
    'Estado',
    'Parentesco',
    'Editar',
  ];

  constructor( private route: ActivatedRoute, private beneficiariosService: BeneficiariosService
    , private router: Router,) { }

  ngOnInit(): void {

     //trae la cedula desde la url de la pagina enviada al momento de consultar
     let idTitular = this.route.snapshot.paramMap.get('idTitular');
     this.documentoTitular = `${idTitular}`;

     let idContrato = this.route.snapshot.paramMap.get('idContrato');
     this.contratoTitular = `${idContrato}`;

     //busca los beneficiarios del contrato
     this.buscarRegistros();

  }

 
  editarParentesco(Documento: any) {
    console.log('la identificacion a actualizar es' + Documento);
    this.router.navigate(['/actualizar-beneficiarios', Documento]);
  }

  
  buscarRegistros() {
    //trae todas los beneficiarios
    this.beneficiariosService.getBeneficiarios(this.documentoTitular, this.contratoTitular ).subscribe((beneficiario) => {
        this.beneficiarioBd = beneficiario;
        console.log("los beneficiarios son")
        console.log(beneficiario)
        this.dataSource = new MatTableDataSource(this.beneficiarioBd);
      });
  }

}
