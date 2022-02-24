import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-caja-busqueda-alumnos',
  templateUrl: './caja-busqueda-alumnos.component.html',
  styleUrls: ['./caja-busqueda-alumnos.component.css']
})
export class CajaBusquedaAlumnosComponent implements OnInit {

  @ViewChild('cajabusqueda') caja_input:ElementRef;//Envolotorio de angular a los elementos/etiquetas nativas
  termino_busqueda:string;
  
  constructor(public servicio_com:ComunicadorService) { 
    this.termino_busqueda='';
  }


  ngOnInit(): void {
  }

  buscarAlumno (event:Event)
  {
    let entrada : HTMLInputElement =  <HTMLInputElement>event.target;
    console.log("entrada = " + entrada.value);
    this.termino_busqueda = entrada.value;
    //usamos el otro método
  }

  buscarAlumnoSinEvento ()
  {
    console.log("entrada sin evento = " + this.caja_input.nativeElement.value);
    this.termino_busqueda =this.caja_input.nativeElement.value;
    //comunico con el servicio
    this.servicio_com.comunicaBusquedaNueva(this.termino_busqueda);
  }

  busqueda2()
  {
    console.log("search tocado :=)");
    //la caja está limpia
    this.servicio_com.comunicaBusquedaNueva("");
  }

}
