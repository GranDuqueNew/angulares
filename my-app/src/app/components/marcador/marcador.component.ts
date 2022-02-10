import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/models/marcador';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.css']
})
export class MarcadorComponent implements OnInit {

//TODO: anañadid dos botones al pie del marcador
//con las opciones de Guardar y Borrar
//GUARDAR
//la primera, persiste el marcador en el localStorage
//de tal manera, que cuanado entre ese marcador guardado se muestre
//BORRAR
//y la opción de borrar, que limpie el marcador almacenado

  marcador_actual:Marcador;
  resultado:string;
  
  constructor() { 
    this.marcador_actual = new Marcador();
    this.resultado='';
    console.log("constructor MarcadorComponent");
  }

  ngOnInit(): void {
    console.log("ngOnInit MarcadorComponent");
    this.marcador_actual = this.obtenerMarcadorGuardado ();
  }

  obtenerMarcadorGuardado ():Marcador
  {
    let marcador_aux:Marcador=new Marcador();
    let string_marcador_guardado:string|null;

      string_marcador_guardado = localStorage.getItem('puntuaciones');
      if (string_marcador_guardado)
      {
        //hay un marcador guardado
        //marcador_aux = <Marcador>JSON.parse(string_marcador_guardado);//Casting
        marcador_aux = JSON.parse(string_marcador_guardado) as Marcador;
      }


    return marcador_aux;
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

  guardarMarcador()
  {
    console.log("gurdar marcador");
    let marcador_actual_json:string = JSON.stringify(this.marcador_actual);
    localStorage.setItem('puntuaciones', marcador_actual_json);
  }
  borrarMarcador()
  {
    console.log("borrar marcador");
    //this.marcador_actual=new Marcador();
    this.marcador_actual.puntuacion_jugador=0;
    this.marcador_actual.puntuacion_maquina=0;
    localStorage.removeItem('puntuaciones');
  }

}
