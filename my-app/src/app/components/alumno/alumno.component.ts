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


lista_alumnos:Array<Alumno>;//esta es la lista visible
//las propiedas del C van sin let;
automatico:boolean;
id_alarma:any;
  constructor(public servicio_alumnos:AlumnoService) {
    //this.servicio_alumnos = new AlumnoService();
    this.automatico=false;
   } 

//aquí usamos OBservables
//es el último mecanismo para gestionar la asincronía de JS
//previo a él están las promesas (api Fetch)
//previo a él AJAX XmlHttpRequest


  ngOnInit(): void {
    //let automatico:boolean = false;
    //this.servicio_alumnos.leerAlumnosFetch();
    this.getAlumnosFromService();
    
  }

  borrarAlumno (id:number)
  {
    console.log("ha tocado borrar " + id);
    //TODO: llamar al servicio de alumnos para borrar
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
