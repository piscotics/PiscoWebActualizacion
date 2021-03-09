import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { DepartamentoInterfaces } from "./../interfaces/departamento";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  apiEndPoint:string="";

  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
  }
//asi traigo departamentos 
  //http://localhost:2548/api/Titulares/GetUbicacion?Dato=Departamento&Departamento
  getAllDepartamentos() {
    const path = `${this.apiEndPoint}/Titulares/GetUbicacion?Dato=Departamento&Departamento`;
    return this.http.get<DepartamentoInterfaces[]>(path);
 
  }

 

}
