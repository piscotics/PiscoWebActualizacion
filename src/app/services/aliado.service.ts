import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AliadoInterface } from '../interfaces/aliado';
import { ImpulsadoresInterfaces } from '../interfaces/impulsadores';
import { TipoComercioInterfaces } from '../interfaces/tipocomercio';

@Injectable({
  providedIn: 'root'
})
export class AliadoService {
 

  apiEndPoint:string="";
  _rutaBd : any;

  constructor(private http : HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
   }

 // postUsuarioLogin(login : Login){
   // const path ='';
    //return this.http.post(path, login);
 // }

  

  setAliado(aliadoInterface: AliadoInterface) {
   
      console.log("la ruta de la bd es: " + this._rutaBd)

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log('llego' + aliadoInterface)
    const path = `${this.apiEndPoint}/Titulares/SetAliados?rutaBd=${this._rutaBd}`;
    return this.http.post(path, aliadoInterface);
  }

  getAllTipoComercio() {
    const path = `${this.apiEndPoint}/Titulares/GetTipoComercio?rutaBd=${this._rutaBd}`;
    return this.http.get<TipoComercioInterfaces[]>(path);
  }
  getAllImpulsadores() {
    const path = `${this.apiEndPoint}/Titulares/GetImpulsadores?rutaBd=${this._rutaBd}`;
    return this.http.get<ImpulsadoresInterfaces[]>(path);
  }
}
