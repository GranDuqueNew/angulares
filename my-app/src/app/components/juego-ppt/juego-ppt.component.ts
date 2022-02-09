import { Component, OnInit, ViewChild } from '@angular/core';
import { Marcador } from 'src/app/models/marcador';
import { MarcadorComponent } from '../marcador/marcador.component';

@Component({
  selector: 'app-juego-ppt',
  templateUrl: './juego-ppt.component.html',
  styleUrls: ['./juego-ppt.component.css']
})
export class JuegoPptComponent implements OnInit {

  seleccionado:boolean=false;
  ids_botones: Array<string> = ["piedra", "papel", "tijera"];
  img_botones: Array<string> = ["rock", "paper", "scissors"];

  tabla_decision: Array<Array<number>> = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0]
  ];
 
  //resultado?:string;//? TS me permite no inicializar un dato - opcional
  //resultado:string;//? TS me permite no inicializar un dato - opcional
  //marcador_actual:Marcador;

  //@ViewChild(MarcadorComponent) marcador_componente?:MarcadorComponent;
  //@ViewChild(MarcadorComponent) marcador_componente2?:MarcadorComponent;
  @ViewChild(MarcadorComponent) marcador_componente1?:MarcadorComponent;


  constructor() { 
    //this.resultado='';
    //this.marcador_actual = new Marcador();
    console.log("constructor JuegoPptComponent");
  }

  ngOnInit(): void {
    console.log("ngOnInit JuegoPptComponent");
  }

  //este método se invoca automáticamente
  //cuando se ha renderizado toda la plantilla
  //incluidos los hijos
  ngAfterViewInit ()
  {
    console.log("ngAfterViewInit JuegoPptComponent");
    //ya puedes utilizar el hijo this.marcador_componente
  }

  //el usuario hace su selección
  selectPlay(play: number) {

    this.seleccionado = true;
    localStorage.setItem("selected", play.toString());

    this.decorateSelectedPlay(play);
  }

  decorateSelectedPlay(play: number) {

    let piedra = document.getElementById("piedra");
    let papel = document.getElementById("papel");
    let tijera = document.getElementById("tijera");

    if (piedra) { piedra.classList.remove("marcada"); }
    if (papel) { papel.classList.remove("marcada"); }
    if (tijera) { tijera.classList.remove("marcada"); }
    //ids_botones:Array<string> = ["piedra", "papel", "tijera"];
    let div_seleccionado = document.getElementById(this.ids_botones[play]);

    if (div_seleccionado) {
      div_seleccionado.classList.add("marcada");
    }


  }

  getComputerPlay() {
    return Math.floor(Math.random() * 3);
  }

  mostrarResultado (resultado:number):void
  {

    this.marcador_componente1?.actualizarMarcador(resultado);
    //this.marcador_componente2?.actualizarMarcador(resultado);
    //esto es el componente hijo
    //this.marcador_componente?.actualizarMarcador(resultado);

    //imprimir en la plantilla
    /*switch ( resultado ) {
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
   }*/
  }

  playNow() {

    let computer = this.getComputerPlay();

    let player = localStorage.getItem("selected");

    if (player) {
      let result = this.tabla_decision[+player][computer];

      let img_computer = document.getElementById("computerPlay");

      if (img_computer) {
        img_computer.setAttribute("src", `assets/imagenes/${this.img_botones[computer]}.png`);
        img_computer.setAttribute("alt", this.img_botones[computer]);
      }

      //TODO: mostrar el resultado
      console.log(result);
      this.mostrarResultado (result);

      localStorage.removeItem("selected");
    }
  }

}
