import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { DepartamentoInterfaces } from "./../interfaces/departamento";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  apiEndPoint:string="";
  _rutaBd : any;

  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
  }
//asi traigo departamentos 
  //http://localhost:2548/api/Titulares/GetUbicacion?Dato=Departamento&Departamento
  getAllDepartamentos() {
    const path = `${this.apiEndPoint}/Titulares/GetUbicacion?Dato=Departamento&Departamento&rutaBd=${this._rutaBd}`;
    return this.http.get<DepartamentoInterfaces[]>(path);
 
  }

  

}
