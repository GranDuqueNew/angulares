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


  obtenerTiempoConObservables (latitud:number, longitud:number):Observable<any>
    {
        let url:string = ElTiempoService.API_WEB_OPENWEATHER+ElTiempoService.API_WEB_OPENWEATHER_KEY+"&lat="+latitud+"&lon="+longitud;

        console.log(`URL el tiempo = ${url}`);

        return this.http.get<any>(url);
    }


    

    /*
    obtenerTiempoConFetch ()
    {
      
    }


    obtenerTiempoConFetchJSONP ()
    {
      
    }*/
}
