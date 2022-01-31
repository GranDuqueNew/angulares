import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
//import { runInThisContext } from 'vm';

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
  titulo:string;// = "CALCULAR LA LETRA DEL DNI"
  numero:number|null;//UNION TYPES
  letra:string;
  static readonly SECUENCIA_LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

  constructor() { 
    console.log("Estoy en el construcutor");
    //inicializo variables
    //THIS ES LA INSTANCIA DEL C's
    //this "es la etiqueta"
    this.titulo = "CALCULAR LA LETRA DEL DNI";
    this.numero=null;
    this.letra="";
  }

  ngOnInit(): void {
     //inicializo variables
    console.log("Estoy en el ngOnInit");
  }

  calcularLetraDni()
  {
    console.log("ha tocado el boton de calcular");
    console.log("DNI introducido = " + this.numero);
    if (this.numero!=null)
    {
      //me aseguro que es un numero, que no es null
      //this.numero = this.numero+1;

       let resto = this.numero%23;//módulo/resto 
       this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(resto);
      
    }
   
    
  }

}
