import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/models/marcador';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.css']
})
export class MarcadorComponent implements OnInit {


  marcador_actual:Marcador;
  resultado:string;
  
  constructor() { 
    this.marcador_actual = new Marcador();
    this.resultado='';
    console.log("constructor MarcadorComponent");
  }

  ngOnInit(): void {
    console.log("ngOnInit MarcadorComponent");
  }

  actualizarMarcador (resultado:number):void
  {
    //imprimir en la plantilla
    switch ( resultado ) {
      case -1:
          // statement 1
          this.resultado = "Ha ganado la máquina";
          this.marcador_actual.puntuacion_maquina = this.marcador_actual.puntuacion_maquina+1;
          break;
      case 0:
          // statement 2
          this.resultado = "EMPATE";
          this.marcador_actual.puntuacion_maquina = this.marcador_actual.puntuacion_maquina+1;
          this.marcador_actual.puntuacion_jugador = this.marcador_actual.puntuacion_jugador+1;
          break;
      case 1:
          // statement N
          this.resultado = "Enhorabuena, has ganado :)";
          this.marcador_actual.puntuacion_jugador = this.marcador_actual.puntuacion_jugador+1;
          break;
   }
  }

}
