import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
//ESTA CLASE, SE COMUNICARÁ
//POR HTTP CON EL SERVIDOR 
//PARA OBTENER INFORMACIÓN DE ÉL




  constructor(private http:HttpClient) { }


  leerAlumnos ()
  { //GET http://localhost:3000
    this.http.get("http://localhost:3000")

  }

  //leer alumnos (del servidor)
  //leer 1 alumno
  //borrar 1 alumno
  //crear 1 alumno
  //modificar 1 alumno
}
