import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RUTA_SERVIDOR_JAVA, RUTA_SERVIDOR_JSON } from '../config/app';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
//ESTA CLASE, SE COMUNICARÁ
//POR HTTP CON EL SERVIDOR 
//PARA OBTENER INFORMACIÓN DE ÉL



  ruta_servidor:string = RUTA_SERVIDOR_JAVA;
  //ruta_servidor:string = RUTA_SERVIDOR_JSON;

  constructor(private http:HttpClient) { }

//leer alumnos (del servidor)
  leerAlumnos () :Observable<Array<Alumno>>
  { //GET http://localhost:3000 //tipo-mime: application/json
    return this.http.get<Array<Alumno>>(this.ruta_servidor);

  }
//TODO:obter la info de las cabeceras con ANGULAR

//borrar 1 alumno
//retornamos un Observable<tipoRecibidoEnElCuerpo>
  borrarAlumno (id:number):Observable<void>
  {
    return this.http.delete<void>(this.ruta_servidor+id);
  }

  leerAlumnosFetch ():Promise<Response>
  { 
    return fetch(this.ruta_servidor);
   

  }
  
  //leer 1 alumno
  
  //crear 1 alumno
  //modificar 1 alumno
}
