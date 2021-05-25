import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioInterface } from "./../interfaces/usuario";
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {//implements CanActivate

  apiEndPoint:string="";
  _rutaBd : any;
  public usuarioBd :any = [];

  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.apiEndPoint;
    this._rutaBd= localStorage.getItem("rutaBd");
  }
  
 // canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    //console.log("guard!");
    
   // let usuario = route.paramMap.get('imbdid');
   // let imbdid = route.paramMap.get('imbdid');
   // const path = `${this.apiEndPoint}/Titulares/GetUsuario?usuario=${usuario}&passwordusuario=${password}`;
  //  return this.http.get('http://www.omdbapi.com/?i=' + imbdid + '&apikey=' + APIKEY).pipe(
     // map(res => {
       // if (res['Error']) {
         // alert("Movie not found at guard!");
         // return false;
        //} else {
        //  return true;
      //  }
     // }),
     // catchError((err) => {
     //   return of(false);
     // })
    //);

  //}

 

  getUsuario(usuario : string, password : string){
    console.log('llego')
    //http://localhost:4200/api/Titulares/GetUsuario?usuario=PISCO&passwordusuario=Pisco123*
    const path = `${this.apiEndPoint}/Titulares/GetUsuario?usuario=${usuario}&passwordusuario=${password}&rutaBd=${this._rutaBd}`;
    console.log(path);
    return this.http.get<UsuarioInterface>(path);    

  }
 
  getAllUsuario(){
    console.log('llego')
    const path = `${this.apiEndPoint}/Titulares/GetAllUsuario`;
    console.log(path);
    return this.http.get<UsuarioInterface>(path);    

  }

  

 
  setArray(array: any) {
    this.usuarioBd = array;
    console.log('desde el servicio mando el array' + JSON.stringify(this.usuarioBd));
  }
  
  getArray() {
    return this.usuarioBd;
  }
}
