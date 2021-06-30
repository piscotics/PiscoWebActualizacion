import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CambioclaveInterface } from '../interfaces/cambioclave';

@Injectable({
  providedIn: 'root'
})
export class CambioclaveService {

  apiEndPoint:string="";
  _rutaBd : any;
  
  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
  }

  

  setClave(cambioclaveInterface: CambioclaveInterface) {
    console.log(JSON.stringify(cambioclaveInterface));
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log('llego' + cambioclaveInterface)
    const path = `${this.apiEndPoint}/Titulares/SetCambioClave?rutaBd=${this._rutaBd}`;
    return this.http.post(path, cambioclaveInterface);
  }
}
