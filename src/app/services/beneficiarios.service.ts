
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BeneficiariosInterface } from '../interfaces/beneficiarios';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";


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

  getBeneficiario(documentoTitular: string) {
    this._rutaBd= localStorage.getItem("rutaBd");
    console.log("la ruta de la bd es: " + this._rutaBd)
      const path = `${this.apiEndPoint}/Titulares/GetBeneficiario?Cedula=${documentoTitular}&rutaBd=${this._rutaBd}`;
      console.log(path);
      return this.http.get<BeneficiariosInterface>(path); 
  }

  setBeneficiario(beneficiariosInterface: BeneficiariosInterface) {
    this._rutaBd= localStorage.getItem("rutaBd");
      console.log("la ruta de la bd es: " + this._rutaBd)

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log('llego' + beneficiariosInterface)
    const path = `${this.apiEndPoint}/Titulares/SetBeneficiarios?rutaBd=${this._rutaBd}`;
    return this.http.post(path, beneficiariosInterface);
  }

}
