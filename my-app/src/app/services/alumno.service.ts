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


  leerAlumnos () :Observable<Array<Alumno>>
  { //GET http://localhost:3000
    return this.http.get<Array<Alumno>>("http://localhost:3000/alumno");

  }

  //leer alumnos (del servidor)
  //leer 1 alumno
  //borrar 1 alumno
  //crear 1 alumno
  //modificar 1 alumno
}
