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
//TODO: personal haced que esta función devuelva una promesa
  leerAlumnosFetch () 
  { 
    fetch("http://localhost:8085/alumno/").
    then(cuerpo=>cuerpo.json()).
    then(lista=> {
      lista.forEach(al => console.log("CON PROMESAS " +al.id + al.nombre))
    }).catch(error=> console.error(error));

  }
  
  //leer 1 alumno
  
  //crear 1 alumno
  //modificar 1 alumno
}
