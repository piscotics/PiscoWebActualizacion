import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfirmacionInterface } from '../interfaces/confirmacion';
import { ReportesInterface } from '../interfaces/reportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  apiEndPoint:string="";
  nuevaFechaDesde : Date = new Date();
  nuevaFechaHasta : Date = new Date();

  nuevaFechaDesdeString : string ="";
  nuevaFechaHastaString : string ="";

  day : number =0;
 daystring : string ="";
 month : number = 0;
 monthstring : string = "";

 dayhasta : number =0;
 daystringhasta : string ="";
 monthhasta : number = 0;
 monthstringhasta : string = "";

  constructor(private http : HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
   }

   getRegistros(fechadesde : any , fechahasta  : any, usuarioRegistro : any, estadoRegistro : any, procesadoRegistro : number, latitude :any, longitude : any ){
    this.nuevaFechaDesde = new Date( fechadesde)
    this.nuevaFechaHasta = new Date (fechahasta)
    console.log('fecha desde '+ fechadesde)
    console.log('fecha hasta '+ fechahasta)
    console.log('usuario '+ usuarioRegistro)
    console.log('estado '+ estadoRegistro)
    
        this.day = this.nuevaFechaDesde.getDate();
        this.month =( this.nuevaFechaDesde.getMonth() + 1);
        
        if (this.day <=9){
          console.log('entro  a dia  ' + this.day)
          this.daystring = '0'+ this.day;
        }else{
          this.daystring = ''+ this.day;
        }
        if (this.month <=9){
          console.log('entro  ames ' + this.month)
          this.monthstring = '0'+ this.month;
        }else{
          this.monthstring = ''+ this.month;
        }
        console.log('la fecha es ' + this.nuevaFechaDesde.getFullYear() + '/' + this.monthstring + '/' + this.daystring)
         
        this.nuevaFechaDesde = new Date( this.nuevaFechaDesde.getFullYear() + '/' + this.monthstring + '/' + this.daystring); 
     
        this.nuevaFechaDesdeString =( this.nuevaFechaDesde.getFullYear() + '/' + this.monthstring + '/' + this.daystring); 
     
        //************** fecha hasta

        this.dayhasta = this.nuevaFechaHasta.getDate();
        this.monthhasta =( this.nuevaFechaHasta.getMonth() + 1);
        
        if (this.dayhasta <=9){
          console.log('entro  a dia  ' + this.dayhasta)
          this.daystringhasta = '0'+ this.dayhasta;
        }else{
          this.daystringhasta = ''+ this.dayhasta;
        }
        if (this.monthhasta <=9){
          console.log('entro  ames ' + this.monthhasta)
          this.monthstringhasta = '0'+ this.monthhasta;
        }else{
          this.monthstringhasta = ''+ this.monthhasta;
        }
        console.log('la fecha es ' + this.nuevaFechaHasta.getFullYear() + '/' + this.monthstringhasta + '/' + this.daystringhasta)
         
        this.nuevaFechaHasta =new Date ( this.nuevaFechaHasta.getFullYear() + '/' + this.monthstringhasta + '/' + this.daystringhasta); 
       
       
        this.nuevaFechaHastaString =( this.nuevaFechaHasta.getFullYear() + '/' + this.monthstringhasta + '/' + this.daystringhasta); 
       
        console.log('la fecha desde opcion dos es ' + this.nuevaFechaDesdeString)
        console.log('la fecha hasta opcion dos es ' + this.nuevaFechaHastaString)

    let path ="";
    //http://sms.piscotics.com:9040/PiscoWebActualizacion/api/Titulares/GetAllActualizaciones?fechadesde&fechahasta&usuarioRegistro&estadoRegistro&procesadoRegistro=0
    //http://sms.piscotics.com:9040/PiscoWebActualizacion/api/Titulares/GetAllActualizaciones?fechadesde&fechadesde&usuarioRegistro=null&estadoRegistro=null&procesadoRegistro=0
    if(isNaN(this.nuevaFechaDesde.getTime()) && isNaN(this.nuevaFechaHasta.getTime())  && usuarioRegistro == '' && estadoRegistro == ''){
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde&fechahasta&usuarioRegistro&estadoRegistro&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 1')
    }
    
    else if(!isNaN(this.nuevaFechaDesde.getTime()) && !isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro == '' && estadoRegistro == ''){      
    
     
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde=${this.nuevaFechaDesdeString}&fechahasta=${this.nuevaFechaHastaString}&usuarioRegistro&estadoRegistro&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 2')
    }

    else if(!isNaN(this.nuevaFechaDesde.getTime()) && !isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro !== '' && estadoRegistro == ''){      
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde=${this.nuevaFechaDesdeString}&fechahasta=${this.nuevaFechaHastaString}&usuarioRegistro=${usuarioRegistro}&estadoRegistro&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 3')
    }

    else if(!isNaN(this.nuevaFechaDesde.getTime()) && !isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro !== '' && estadoRegistro !== ''){      
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde=${this.nuevaFechaDesdeString}&fechahasta=${this.nuevaFechaHastaString}&usuarioRegistro=${usuarioRegistro}&estadoRegistro=${estadoRegistro}&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 4')
    }

    else if(!isNaN(this.nuevaFechaDesde.getTime()) && !isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro == '' && estadoRegistro !== ''){      
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde=${this.nuevaFechaDesdeString}&fechahasta=${this.nuevaFechaHastaString}&usuarioRegistro&estadoRegistro=${estadoRegistro}&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 5')
    }

    else if(isNaN(this.nuevaFechaDesde.getTime()) && isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro !== '' && estadoRegistro !== ''){      
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde&fechahasta&usuarioRegistro=${usuarioRegistro}&estadoRegistro=${estadoRegistro}&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 6')
    }
    else if(isNaN(this.nuevaFechaDesde.getTime()) && isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro == '' && estadoRegistro !== ''){      
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde&fechahasta&usuarioRegistro&estadoRegistro=${estadoRegistro}&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 7')
    }
    else if(isNaN(this.nuevaFechaDesde.getTime()) && isNaN(this.nuevaFechaHasta.getTime()) && usuarioRegistro !== '' && estadoRegistro == ''){      
      path = `${this.apiEndPoint}/Titulares/GetAllActualizaciones?fechadesde&fechahasta&usuarioRegistro=${usuarioRegistro}&estadoRegistro&procesadoRegistro=${procesadoRegistro}&posx&posy`;
      console.log('opcion 8')
    }

 
    console.log(path);
    return this.http.get<ReportesInterface>(path); 
    

  }


  setConfirmacion(confirmacionInterface: ConfirmacionInterface ) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log('llego' + confirmacionInterface)
    const path = `${this.apiEndPoint}/Titulares/SetActualizarDatos`;
    return this.http.post(path, confirmacionInterface);
  }
}
