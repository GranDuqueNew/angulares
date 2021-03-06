import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Marcador } from 'src/app/models/marcador';
import { MarcadorComponent } from '../marcador/marcador.component';

@Component({
  selector: 'app-juego-ppt',
  templateUrl: './juego-ppt.component.html',
  styleUrls: ['./juego-ppt.component.css']
})
export class JuegoPptComponent implements OnInit, AfterViewInit {

  nombrejugadorjuego: string;
  seleccionado: boolean = false;
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

  //para 1 marcador
  @ViewChild(MarcadorComponent) marcador_componente1: MarcadorComponent;
  //@ViewChild(MarcadorComponent) marcador_componente1;

  //para varios componentes hijos del mismo tipo
  // @ViewChildren(MarcadorComponent) marcadores?:QueryList<MarcadorComponent>;
  //para acceder a varios compoenente por su #nombre
  //@ViewChild('marcador1') marcador1?:MarcadorComponent;
  //@ViewChild('marcador2') marcador2?:MarcadorComponent;



  constructor() {
    //this.resultado='';
    //this.marcador_componente1 = new MarcadorComponent()
    console.log("constructor JuegoPptComponent");
  }

  ngOnInit(): void {
    console.log("ngOnInit JuegoPptComponent");

  }

  //este método se invoca automáticamente
  //cuando se ha renderizado toda la plantilla
  //incluidos los hijos
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit JuegoPptComponent");
    //ya puedes utilizar el hijo this.marcador_componente
    // if (this.marcadores)
    // {
    //   console.log("marcadores iniciados");
    //   this.marcadores.forEach((marcatore, i) => console.log(`marcador ${i} = ${marcatore.marcador_actual.puntuacion_jugador}`));
    // }

    // if ((this.marcador1)&&(this.marcador2))
    // {
    //    console.log("marcadores hijos iniciados ");
    //    console.log("marcadores 1 " + this.marcador1.marcador_actual.puntuacion_jugador);
    //    console.log("marcadores 2 " + this.marcador2.marcador_actual.puntuacion_jugador);
    //    //this.marcadores.forEach((marcatore, i) => console.log(`marcador ${i} = ${marcatore.marcador_actual.puntuacion_jugador}`));
    // }
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

  mostrarResultado(resultado: number): void {

    this.marcador_componente1.actualizarMarcador(resultado);

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
      this.mostrarResultado(result);

      localStorage.removeItem("selected");
    }
  }

  informarMarcador(marcador_hijo: Marcador) {
    if (marcador_hijo.puntuacion_jugador > marcador_hijo.puntuacion_maquina) 
    {
        alert(`${this.nombrejugadorjuego} VAS GANANDO!`);
    }   else if (marcador_hijo.puntuacion_jugador < marcador_hijo.puntuacion_maquina) 
      {
        alert(`${this.nombrejugadorjuego} VAS PALMANDO, ÁNIMO!`);
      } else 
        {
          alert(`EMATE ... INtríngulis`);
        }
  }

}
