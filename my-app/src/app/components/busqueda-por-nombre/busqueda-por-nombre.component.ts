import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda-por-nombre',
  templateUrl: './busqueda-por-nombre.component.html',
  styleUrls: ['./busqueda-por-nombre.component.css']
})
export class BusquedaPorNombreComponent implements OnInit {

  repogithub:boolean;

  constructor() { 
    this.repogithub = false;
  }

  ngOnInit(): void {
  }

  checkTocado()
  {
    //actualizo el estado lógico de la caja
    //haciéndolo coincidir con su aprariencia
    this.repogithub=!this.repogithub;
    console.log(this.repogithub);
  }
}
