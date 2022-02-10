import { Component, OnInit } from '@angular/core';
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



  constructor(public servicio_alumnos:AlumnoService) {
    //this.servicio_alumnos = new AlumnoService();
   }

  ngOnInit(): void {
    this.servicio_alumnos.leerAlumnos();
    
  }

}//
