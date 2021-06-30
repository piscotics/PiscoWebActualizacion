import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { CiudadInterface } from "./../interfaces/ciudad";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  apiEndPoint:string="";
  _rutaBd : any;
  constructor(private http : HttpClient) { 

    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
  }

  //traer ciudades
  //
  getAllCiudad(ciudad : string) {
    
    const path = `${this.apiEndPoint}/Titulares/GetUbicacion?Dato=Ciudad&Departamento=${ciudad}&rutaBd=${this._rutaBd}`;
    console.log(path)
    return this.http.get<CiudadInterface[]>(path);
  }
 
 
}
