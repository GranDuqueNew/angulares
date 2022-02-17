import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

/**
 * GET - LEER
 * POST - CREAR
 * PUT - ACTUALIZAR
 * DELETE - BORRAR
 */


  ruta_servidor:string = RUTA_SERVIDOR_JAVA;
  //ruta_servidor:string = RUTA_SERVIDOR_JSON;

  cabeceras: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http:HttpClient) { }

//leer alumnos (del servidor)
  leerAlumnos () :Observable<Array<Alumno>>
  { //GET http://localhost:3000 //tipo-mime: application/json
    return this.http.get<Array<Alumno>>(this.ruta_servidor);
  }

  leerAlumnosConCabeceras () :Observable<HttpResponse<Array<Alumno>>>
  { //añadiendo el parámetro {observe : 'response'} me da acceso al mensaje HTTP de respuesta completo

    return this.http.get<Array<Alumno>>(this.ruta_servidor, {observe : 'response'});
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

  crearAlumno (alumno:Alumno): Observable<Alumno>
  {
    return this.http.post<Alumno>(this.ruta_servidor, alumno, {headers:this.cabeceras});
  }

  //modificar 1 alumno
}
