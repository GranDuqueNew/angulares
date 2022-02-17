import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
//import { AlumnoService } from 'src/app/services/alumno.service';
//import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
 //ESTE COMPONENTE VA A MOSTRAR LA LISTA DE ALUMNOS
 //PERO PARA OBTENER LA LISTA, USARÁ UN SERVICIO

//IOC inversión de control - Angular crea los objetos por mí
//DI inyección de dependencias -
//servicio_alumnos:AlumnoService;


lista_alumnos:Array<Alumno>;//esta es la lista visible
//las propiedas del C van sin let;
automatico:boolean;
id_alarma:any;
//ic_papelera = faTrash;
ic_papelera = faTrashAlt;
ic_editar = faEdit;

  constructor(public servicio_alumnos:AlumnoService, private router:Router) {
    //this.servicio_alumnos = new AlumnoService();
    this.automatico=false;
   } 

//aquí usamos OBservables
//es el último mecanismo para gestionar la asincronía de JS
//previo a él están las promesas (api Fetch)
//previo a él AJAX XmlHttpRequest


  fueBien (respuesta:Response)
  {
    respuesta.json().
    then(lista=> {
      lista.forEach(al => console.log("CON PROMESAS " +al.id + al.nombre))
    }).catch(error=> console.error(error));

  }

  fueMal (error:any)
  {
    
    console.error("error " + error.toString());
    console.error("HA IDO FATAL");
  }

  ngOnInit(): void {
    
    
    this.getAlumnosFromService();
    
    
    //con Promesas CORS
    //this.servicio_alumnos.leerAlumnosFetch().then((respuesta)=>this.fueBien(respuesta), (error) => this.fueMal(error))
    //con Acceso a las cabeceras
    //this.getAlumnosFromServiceConCabeceras();
  }



  borrarAlumno (id:number)
  {
    console.log("ha tocado borrar " + id);
    if (confirm(`¿Deseas eliminar al alumno ${id}`))
    {

      this.servicio_alumnos.borrarAlumno(id).subscribe(
        //observador - observador
        {
          //complete se invoca siempre
          complete: () => {console.log("comunicaión completada");},
          error: (error_rx) => {console.error(error_rx);},
          next: () => {
            //quiero mostrar los ids de los alumnos rx
            //actualizar la lista visible
            //eliminar de la vista el alumno que se ha eliminado
            this.lista_alumnos = this.lista_alumnos.filter(al_aux=> al_aux.id!=id);
            
            //podrías hacer un do while y sería más eficiente :)
            //filter (condición que quiero cumplan)
          }
        }
      );
    } else {
      console.log("El usuario no ha confirmado la operación");
    }
    
    
  }

  editarAlumno(alumno:Alumno)
  {
    console.log("quiere editar al alumno " + alumno.id);

    //this.router.navigateByUrl("/alumno/form");
    //this.router.navigateByUrl("/alumno/form/edit");
    this.router.navigate(["/alumno/form/edit", alumno.id]);
  }

  //DRY 
  getAlumnosFromService ()
  {
    this.servicio_alumnos.leerAlumnos().subscribe(
      {
        complete: () => {console.log("comunicaión completada");},
        error: (error_rx) => {console.error(error_rx);},
        next: (listado_alumnos_rx) => {
          //quiero mostrar los ids de los alumnos rx
          listado_alumnos_rx.forEach( alumno => {console.log(alumno.id);})
          this.lista_alumnos = listado_alumnos_rx;
        }
      }
    );
  }


  mostrarCabeceras (http_response: HttpResponse<Array<Alumno>>)
  {
    //tipo mime
    console.log("TIPO MIME = "+ http_response.headers.get('content-type'));
    //status
    console.log("STATUS = "+ http_response.status);
    //status text
    console.log("TIPO MIME = "+ http_response.statusText);

  }

  mostrarError (error:any)
  {
    //STATUS ERROR
    console.log(error.status);
    //MENSAJE ERROR
    console.log(error.message);
  }

  getAlumnosFromServiceConCabeceras ()
  {
    this.servicio_alumnos.leerAlumnosConCabeceras().subscribe(
      {
        complete: () => {console.log("comunicaión completada");},
        error: (error_rx) => {this.mostrarError(error_rx)},
        next: (http_rx) => {
          //quiero mostrar los ids de los alumnos rx
          //listado_alumnos_rx.forEach( alumno => {console.log(alumno.id);})
          //this.lista_alumnos = <Array<Alumno>>http_rx.body;
          this.mostrarCabeceras(http_rx);
          this.lista_alumnos = http_rx.body as Array<Alumno>;//otra forma de convertir el tipo / casting
        }
      }
    );
  }

  saludar ()
  {
    console.log("Hola socio");
  }

  checkTocado() {
    this.id_alarma;
    this.automatico = !this.automatico;//actualizo el valor
    console.log("actulizar automaticamente = " + this.automatico);
    if (this.automatico)
    {
      //programar la llamada periódica
      //this.id_alarma = setInterval(this.getAlumnosFromService, 3000); //FUnción tradicional NO ser conserva el contexto
      this.id_alarma = setInterval( ()=>this.getAlumnosFromService(), 3000);
    } else {
      //desprogramar la llamada periódica
      //TODO haced que se desprograme la alarma
      clearInterval(this.id_alarma);
    }
  }

}//
