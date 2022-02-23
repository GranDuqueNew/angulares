import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  //TODO: escuchar la tubería / servicio

  termino_busqueda:string;
  lista_alumnos:Array<Alumno>;

  constructor(public servicio_com:ComunicadorService, public servicio_alumnos:AlumnoService)

  { 
    this.termino_busqueda='';
    this.lista_alumnos = new Array<Alumno>();
    this.servicio_com.palabraNuevaAnunciada.subscribe(
      termino_busqueda_rx => {
       console.log("termino de búsqueda rx " + termino_busqueda_rx);
       this.termino_busqueda = termino_busqueda_rx;
       this.busquedaDeAlumnos(termino_busqueda_rx);
    });


  }

  ngOnInit(): void {
  }

  busquedaDeAlumnos (termino:string)
  {
    //TODO: llamar al servidor para obtener la lista de nombres
    this.servicio_alumnos.buscarAlumnosPorNombreOApellido(termino).subscribe
    (
       {
      complete: () => {console.log("comunicaión completada");},
      error: (error_rx) => {console.error(error_rx);},
      next: (listado_alumnos_rx) => {
      //quiero mostrar los nombres  de los alumnos rx
       if (listado_alumnos_rx.length>0)
       {
         console.log("Datos RX " + listado_alumnos_rx.length);
        listado_alumnos_rx.forEach( alumno => {console.log(alumno.nombre + " " + alumno.apellido );})
        this.lista_alumnos = listado_alumnos_rx;
        //TODO: mostremos la lista recibida en el compoente lista-alumnos
        //tb jugar con el search para que cuando limpie, se actualice la lista
       } else {
         alert("su búsqueda no produjo resultados :(");
       }
       
         }
       }
     //"version antigua" (ok)=>{console.log('ok');}, (error)=>{console.log(error);}
    );
    

  }

}
