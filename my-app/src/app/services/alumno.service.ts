import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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

  alumno_en_edicion:Alumno;


  ruta_servidor:string = RUTA_SERVIDOR_JAVA;
  //ruta_servidor:string = RUTA_SERVIDOR_JSON;

  cabeceras: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http:HttpClient) { }

  guardarAlumnoEnEdicion (alumno:Alumno)
  {
    this.alumno_en_edicion = alumno;
  }

  leerAlumnoEnEdicion ():Alumno
  {
    return this.alumno_en_edicion;
  }


//leer alumnos (del servidor)
  leerAlumnos () :Observable<Array<Alumno>>
  { //GET http://localhost:3000 //tipo-mime: application/json
    return this.http.get<Array<Alumno>>(this.ruta_servidor);
  }

  leerAlumnoPorId (id_alumno:number) :Observable<Alumno>
  { //GET http://localhost:3000 //tipo-mime: application/json
    return this.http.get<Alumno>(this.ruta_servidor+"/"+id_alumno);
  }

  leerAlumnosConCabeceras () :Observable<HttpResponse<Array<Alumno>>>
  { //añadiendo el parámetro {observe : 'response'} me da acceso al mensaje HTTP de respuesta completo

    return this.http.get<Array<Alumno>>(this.ruta_servidor, {observe : 'response'});
  }


  leerAlumnosFetch ():Promise<Response>
  { 
    return fetch(this.ruta_servidor);
  }


  leerAlumnosPorPaginas (page:number, size:number):Observable<any>
  {
    let parametros = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(this.ruta_servidor+"/pagina", {params : parametros});
  }

//TODO:obter la info de las cabeceras con ANGULAR

//borrar 1 alumno
//retornamos un Observable<tipoRecibidoEnElCuerpo>
  borrarAlumno (id:number):Observable<void>
  {
    return this.http.delete<void>(this.ruta_servidor+"/"+id);
  }


  crearAlumno (alumno:Alumno): Observable<Alumno>
  {
    return this.http.post<Alumno>(this.ruta_servidor, alumno, {headers:this.cabeceras});
  }

  crearAlumnoConFoto (alumno:Alumno, archivo:File): Observable<Alumno>
  {
//declaramos una variable local que represente el FormData
    let formData = new FormData();

        formData.append('nombre', alumno.nombre);
        formData.append('apellido', alumno.apellido);
        formData.append('email', alumno.email);
        formData.append('edad', alumno.edad+'');
        formData.append('archivo', archivo);//BLOB Binary Large Object

    return this.http.post<Alumno>(this.ruta_servidor+"/crear-con-foto", formData);
  }

  //modificar 1 alumno

  //opcional: puedo rx el id por separado
  actualizarAlumno (alumno:Alumno):Observable<Alumno>
  {
    return this.http.put<Alumno>(this.ruta_servidor+"/"+alumno.id,alumno, {headers:this.cabeceras});
  }


  actualizarAlumnoConFoto (alumno:Alumno, archivo:File): Observable<Alumno>
  {
//declaramos una variable local que represente el FormData
    let formData = new FormData();

        formData.append('nombre', alumno.nombre);
        formData.append('apellido', alumno.apellido);
        formData.append('email', alumno.email);
        formData.append('edad', alumno.edad+'');
        formData.append('archivo', archivo);//BLOB Binary Large Object

    return this.http.put<Alumno>(this.ruta_servidor+"/editar-con-foto/"+alumno.id, formData);
  }

  buscarAlumnosPorNombreOApellido (termino:string) :Observable<Array<Alumno>>
  { //GET http://localhost:3000 
    return this.http.get<Array<Alumno>>(this.ruta_servidor+"/busqueda/nomoape/"+termino);
    //http://localhost:8085/alumno/busqueda/nomoape/c
  }


  //AÑADIMOS EL MÉTODO DE JSONP coN rx/jS
  //con esta configuración, el JSONP se consume igual que un GET
  //no hay que hacer ni eva ni nada

  public listarJsonP():Observable<Alumno> {
    return this.http.jsonp<Alumno>(this.ruta_servidor + "jsonp/alumno", 'callback=JSONP_CALLBACK');
  }
}
