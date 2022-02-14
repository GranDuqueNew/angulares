import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
//import { AlumnoService } from 'src/app/services/alumno.service';

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


lista_alumnos:Array<Alumno>;
  constructor(public servicio_alumnos:AlumnoService) {
    //this.servicio_alumnos = new AlumnoService();
   }

//aquí usamos OBservables
//es el último mecanismo para gestionar la asincronía de JS
//previo a él están las promesas (api Fetch)
//previo a él AJAX XmlHttpRequest
//TODO: MOSTRAR LOS DATOS EN LA PLANTILLA

  ngOnInit(): void {
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

  borrarAlumno (id:number)
  {
    console.log("ha tocado borrar " + id);
    //TODO: llamar al servicio de alumnos para borrar
    
  }

}//
