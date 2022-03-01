import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElTiempoService {


//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  //declaro como constante
  static readonly API_WEB_OPENWEATHER:string = "https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&appid=";

  static readonly API_WEB_OPENWEATHER_KEY:string = "11af6372e5b3a309ee6d413603c53656";

  constructor(private http:HttpClient) { 

    
    
  }


  //tipo mime - APPLICATION/JSON
  obtenerTiempoConObservables (latitud:number, longitud:number):Observable<any>
    {
        let url:string = ElTiempoService.API_WEB_OPENWEATHER+ElTiempoService.API_WEB_OPENWEATHER_KEY+"&lat="+latitud+"&lon="+longitud;

          console.log(`URL el tiempo = ${url}`);

        return this.http.get<any>(url);
    }

//AJAX - xmlHTTPREQUEST
//FETCH - aPI MÁS MODERNA - pROMESAS
//oBSERVABLES - RX/JS
    

    //tipo mime - APPLICATION/JSON
    obtenerTiempoConFetch (latitud:number, longitud:number):Promise<Response>
    {
      let url:string = ElTiempoService.API_WEB_OPENWEATHER+ElTiempoService.API_WEB_OPENWEATHER_KEY+"&lat="+latitud+"&lon="+longitud;

          console.log(`URL el tiempo = ${url}`);

      return fetch(url);

    }

    //jsonp ES UN MECANISMO PARA EVITAR EL CORS
    //tipo mime - application/javascript
    obtenerTiempoConFetchJSONP (latitud:number, longitud:number, nombre_funcion:string):Promise<Response>
    {
      let url:string = ElTiempoService.API_WEB_OPENWEATHER+ElTiempoService.API_WEB_OPENWEATHER_KEY+"&lat="+latitud+"&lon="+longitud+"&callback=this."+nombre_funcion;

        console.log(`URL el tiempo = ${url}`);

      return fetch(url);
    }
}
