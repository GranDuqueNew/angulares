import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
//ESTA CLASE, SE COMUNICARÁ
//POR HTTP CON EL SERVIDOR 
//PARA OBTENER INFORMACIÓN DE ÉL




  constructor(private http:HttpClient) { }

//leer alumnos (del servidor)
  leerAlumnos () :Observable<Array<Alumno>>
  { //GET http://localhost:3000
    return this.http.get<Array<Alumno>>("http://localhost:8085/alumno");

  }
//borrar 1 alumno
//retornamos un Observable<tipoRecibidoEnElCuerpo>
  borrarAlumno (id:number):Observable<void>
  {
    return this.http.delete<void>("http://localhost:8085/alumno/"+id);
  }
  
  //leer 1 alumno
  
  //crear 1 alumno
  //modificar 1 alumno
}
