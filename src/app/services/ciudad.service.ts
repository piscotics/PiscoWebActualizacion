import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { CiudadInterface } from "./../interfaces/ciudad";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  apiEndPoint:string="";
  constructor(private http : HttpClient) { 

    this.apiEndPoint = environment.apiEndPoint;
  }

  //traer ciudades
  //
  getAllCiudad(ciudad : string) {
    
    const path = `${this.apiEndPoint}/Titulares/GetUbicacion?Dato=Ciudad&Departamento=${ciudad}`;
    console.log(path)
    return this.http.get<CiudadInterface[]>(path);
  }
 

}
