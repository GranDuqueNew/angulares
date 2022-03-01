import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {

  
  termino_busqueda:string;
  lista_alumnos:Array<Alumno>;
  subscription: Subscription;
  @Input() tirodegithub:boolean;


  constructor(public servicio_com:ComunicadorService, public servicio_alumnos:AlumnoService)

  { 
    this.termino_busqueda='';
    this.lista_alumnos = new Array<Alumno>();
    this.subscription = this.servicio_com.palabraNuevaAnunciada.subscribe(
      termino_busqueda_rx => {
       console.log("termino de búsqueda rx " + termino_busqueda_rx);
       if (termino_busqueda_rx=='')
       {
         //limpiar lista;
        this.lista_alumnos.length=0;
       } else {

        this.termino_busqueda = termino_busqueda_rx;
       this.busquedaDeAlumnos(termino_busqueda_rx);
       }
       
    });


  }
  ngOnDestroy(): void {
    //dejo de escuchar, prevengo "perdidas de memoria"
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  busquedaDeAlumnos (termino:string)
  {
    if (!this.tirodegithub)
    {
      this.buscarEnServidorLocal (termino);
    } else {
      this.buscarEnGitHub (termino);
    }
    
    

  }

  buscarEnServidorLocal (termino:string)
  {
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
        
       } else {
         alert("su búsqueda no produjo resultados :(");
         //limpiar lista también en caso de no producir resultados;
        this.lista_alumnos.length=0;
       }
       
         }
       }
     //"version antigua" (ok)=>{console.log('ok');}, (error)=>{console.log(error);}
    );
  }

  buscarEnGitHub (termino:string)
  {
    //NO puedo usar el servicio de filtar por nombre o apellido
    //bajarme todos y filtrar localmente
    this.servicio_alumnos.buscarAlumnosEnGitHub().subscribe
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
          //TODO: filtrar los alumnos por el termino de búsqueda
          this.lista_alumnos = listado_alumnos_rx.filter(a => ((a.apellido.indexOf(termino) != -1) || (a.nombre.indexOf(termino) != -1)));

          //this.lista_alumnos = listado_alumnos_rx;
          
         } else {
           alert("su búsqueda no produjo resultados :(");
           //limpiar lista también en caso de no producir resultados;
          this.lista_alumnos.length=0;
         }
         
           }
         }
    );
  }

}
