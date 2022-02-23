import { Component, OnInit } from '@angular/core';
import { ComunicadorService } from 'src/app/services/comunicador.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  constructor(public servicio_com:ComunicadorService)
  { }

  ngOnInit(): void {
  }

}
