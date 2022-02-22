import { Component, OnInit } from '@angular/core';
import { RUTA_SERVIDOR_JAVA } from 'src/app/config/app';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumno-pag',
  templateUrl: './alumno-pag.component.html',
  styleUrls: ['./alumno-pag.component.css']
})
export class AlumnoPagComponent implements OnInit {


  ruta_servidor:string = RUTA_SERVIDOR_JAVA;
  lista_alumnos:Array<Alumno>;//esta es la lista visible

  totalRegistros:number = 0;
  totalPorPagina:number = 2;
  pageSizeOptions: number[] = [2, 4, 6, 8];
  paginaActual: number = 0;

  constructor(public servicio_alumnos:AlumnoService) { }

  ngOnInit(): void {
    
    
    this.getAlumnosFromService();
    
  }

  getAlumnosFromService ()
  {
    this.servicio_alumnos.leerAlumnosPorPaginas(this.paginaActual, this.totalPorPagina).subscribe(
      {
        complete: () => {console.log("comunicaión completada");},
        error: (error_rx) => {console.error(error_rx);},
        next: (respuesta) => {
          //quiero mostrar los ids de los alumnos rx
          this.lista_alumnos = respuesta.content as Alumno[];//casting 
          this.totalRegistros=respuesta.totalElements;
        }
      }
    );
  }
}
