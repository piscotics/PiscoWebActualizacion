import { Injectable } from '@angular/core';
import { TitularInterface } from "./../interfaces/titular";
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TitularesService {

  apiEndPoint:string="";

  constructor(private http : HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
   }

 // postUsuarioLogin(login : Login){
   // const path ='';
    //return this.http.post(path, login);
 // }

  getTitular(cedula : string){
    console.log('llego')
    
    const path = `${this.apiEndPoint}/Titulares/GetTitulares?Cedula=${cedula}`;
    console.log(path);
    return this.http.get<TitularInterface>(path); 
    

  }

  setTitular(titularInterface: TitularInterface) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log('llego' + titularInterface)
    const path = `${this.apiEndPoint}/Titulares/SetTitulares`;
    return this.http.post(path, titularInterface);
  }

 
  

}
