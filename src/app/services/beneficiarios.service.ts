import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BeneficiariosInterface } from '../interfaces/beneficiarios';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {
  
  apiEndPoint:string="";
  _rutaBd : any;
  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
  }

  getBeneficiarios(documentoTitular: string, contratoTitular: string) {
    let path ="";
    path = `${this.apiEndPoint}/Titulares/GetBeneficiarios?cedula=${documentoTitular}&contrato=${contratoTitular}&rutaBd=${this._rutaBd}`;
    console.log(path);
    return this.http.get<BeneficiariosInterface>(path); 
  }

  getBeneficiario(document: string) {
    throw new Error('Method not implemented.');
  }


}
