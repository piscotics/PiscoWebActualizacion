import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ClienteInterface } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {



 
  apiEndPoint:string="";
  public logoImage : string="";
  public _nitCliente : string="";
  public _dominioCliente : string="";
  public encontroNit: string ="";
  public dominioBd : any = [];
  public dominioRuta : any = [];
  
  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
  }


  //traigo el nombre del navegado
  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
}



//trae el nit del cliente 

getNitCliente(dominio : string){

  const path = `${this.apiEndPoint}/Titulares/GetInformacionPrincipal?dominio=${dominio}`;
  console.log(path);
  return this.http.get<ClienteInterface>(path);    

}


 



}
