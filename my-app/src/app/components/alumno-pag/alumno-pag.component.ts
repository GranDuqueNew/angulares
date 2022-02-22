import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RUTA_SERVIDOR_JAVA } from 'src/app/config/app';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumno-pag',
  templateUrl: './alumno-pag.component.html',
  styleUrls: ['./alumno-pag.component.css']
})
export class AlumnoPagComponent implements OnInit, AfterViewInit {


  ruta_servidor:string = RUTA_SERVIDOR_JAVA;
  lista_alumnos:Array<Alumno>;//esta es la lista visible

  totalRegistros:number = 0;
  totalPorPagina:number = 2;
  pageSizeOptions: number[] = [2, 4, 6, 8];
  paginaActual: number = 0;

  @ViewChild(MatPaginator) paginador:MatPaginator;

  constructor(public servicio_alumnos:AlumnoService) { }


  ngAfterViewInit(): void {
    console.log("después de cargarse los hijos");
    this.paginador._intl.itemsPerPageLabel="Registros por página";
    this.paginador._intl.nextPageLabel="Siguiente";
    this.paginador._intl.previousPageLabel="Anterior";
    this.paginador._intl.firstPageLabel="Primera página";
    this.paginador._intl.lastPageLabel="última página";


  }

  ngOnInit(): void {
    
    
    this.getAlumnosFromService();
    
  }


  paginar (evento:PageEvent)
  {
    this.paginaActual = evento.pageIndex;
    this.totalPorPagina = evento.pageSize;

    //TODO ?¿
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
