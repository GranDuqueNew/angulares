import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css']
})
//IOC Inversión de Control
export class DniComponent implements OnInit {

  /*
  nuestra APP tiene que obtner el DNI 
  del usuario y decirle cual es su letra
  */

  //1 FASE ESTÁTICA
  //DEFINO LA PANTALLA
  //DEFINO LA PLANTILLA (html)

  //2 FASE DINÁMICA
  //DIAGRAMA DE ACTIVIDAD 
  //JS/TS COMPONENTE
  titulo: string;// = "CALCULAR LA LETRA DEL DNI"
  numero: number | null;//UNION TYPES
  letra: string;
  static readonly SECUENCIA_LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

  constructor() {
    console.log("Estoy en el construcutor");
    //inicializo variables
    //THIS ES LA INSTANCIA DEL C's
    //this "es la etiqueta"
    this.titulo = "CALCULAR LA LETRA DEL DNI";
    this.numero = null;
    this.letra = "";
  }

  ngOnInit(): void {
    //inicializo variables
    console.log("Estoy en el ngOnInit");
  }

  calculaLetraDni() {
    console.log("estoy en el init");
    console.log("DNi introducido" + this.numero);
    if (this.numero != null) {
      //TODO obeener la letra de DNi extrabnjero

      let radio_seleccionado = <HTMLInputElement>document.querySelector('[name="prefijo"]:checked');
      //casting
      console.log("valor sleccionado" + radio_seleccionado.value);
      //this.numero=this.numero+1;
      if (radio_seleccionado.value != "sin") {
        let numero = parseInt(radio_seleccionado.value + this.numero);
        console.log("numero" + radio_seleccionado.value);
        let resto : number = numero % 23;
        this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(resto);
      }
      else {
        let resto = this.numero % 23;
        this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(resto);
      }
    
    }
  }
  /**
   * 1 CARPETA RAIZ DEL PROYECTO EN EL NIVEL TOP DEL WORKSPACE
   * 2 ME VOY A LA CUCARACHA Y CREO UN JSON SELECCIONANDO
   * ESTE PROYECTO Y EL NAVEGADOR CON EL QUE QUIERO EJECUTAR
   * 3 ACTUALIZO EL PUERTO EN ESE FICHERO JSON /4200/
   * 4 ME VOY AL TERMINAL (CARPETA RAÍZ) Y LANZO EL SERVIDOR
   * IMPORTANTE SIN LA OPCIÓN -O --OPEN ng serve
   * 5 DESDE LA DEPURACIÓN LANZO CON EL PLAY
   * 6 UNA VEZ LANZADO, PUEDO DEFINIR PUNTOS DE RUPTURA
   * Y DEPURAR
   */

}
