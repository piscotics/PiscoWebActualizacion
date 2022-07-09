import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { ParentescoInterfaces } from "./../interfaces/parentesco";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParentescoService {
  apiEndPoint:string="";
  _rutaBd : any;

  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
  }
//asi traigo Parentescos 
  //http://localhost:2548/api/Titulares/GetUbicacion?Dato=Parentesco&Parentesco
  getAllParentescos() {
    const path = `${this.apiEndPoint}/Titulares/GetUbicacion?Dato=Parentesco&Departamento&rutaBd=${this._rutaBd}`;
    return this.http.get<ParentescoInterfaces[]>(path);
 
  }

  

}
