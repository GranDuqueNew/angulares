import { Component, OnInit } from '@angular/core';
import { Imc } from './imc';
import { TipoImc } from './tipo-imc';


@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.css']
})
export class ImcComponent implements OnInit {

  //TODO: 
  /**
   * Haced una APP que calcule el Índice de Masa Corporal de una persona
   * la fórmula es la siguiente:
   * 
   *  IMC = peso (kg) / altura * altura
   * 
   * si el imc < 16 - DESNUTRIDO
   * si el imc >=16 y < 18 - DELGADO
   * si el imc >=18 Y < 25 - IDEAL
   * si el imc >=25 y < 31 - SOBREPESO
   * si el imc >=31 - OBESO
   * 
   * hay que informar al usuario de su valor numérico
   * y de su valor nominal (categoría)
   * 
   * además, hay que escoger una imagen descriptiva
   * de cada categoría, que acompañe al resultado
   * 
   * 
   * PROPIEPADES
   *  peso, altura
   *  imágenes
   *  resultado numérico y el nominal
   *  categorías / niveles -ENUM 
   */
   titulo:string = "CALCULO DEL IMC";
  // peso:number;
  // altura:number;
  // imc:number;
  oimc:Imc;
  lista_imcs:Array<Imc>;

  constructor() { 
    // this.altura = 0;
    // this.peso = 0;
    // this.imc = 0;
    this.oimc=new Imc();
    this.lista_imcs = new Array<Imc>();
  }

  ngOnInit(): void {
  }

  nuevoItemImc (oimc:Imc) : Imc
  {
    //declaro IMC
    let imc_aux : Imc;

      imc_aux = new Imc();
      imc_aux.altura = oimc.altura;
      imc_aux.peso = oimc.peso;
      imc_aux.numerico = oimc.numerico;
      imc_aux.categoria = oimc.categoria;
      imc_aux.lectura = oimc.lectura;
      

    return imc_aux;
    //return imc

  }

  calcularIMC()
  {
    console.log("calcular imc boton tocado");
    this.oimc.numerico = this.oimc.peso / (this.oimc.altura*this.oimc.altura);
    if (this.oimc.numerico<16)
    {
      //desnutrido
      this.oimc.categoria=TipoImc.DESNUTRIDO;
      this.oimc.lectura = TipoImc[TipoImc.DESNUTRIDO];
    } else if (this.oimc.numerico>=16 && this.oimc.numerico<18)
     {
       //delgado
       this.oimc.categoria=TipoImc.DELGADO;
       this.oimc.lectura = TipoImc[TipoImc.DELGADO];
     }else if (this.oimc.numerico>=18 && this.oimc.numerico<25)
     {
       //ideal
       this.oimc.categoria=TipoImc.IDEAL;
       this.oimc.lectura = TipoImc[TipoImc.IDEAL];
     }else if (this.oimc.numerico>=25 && this.oimc.numerico<31)
     {
       //soberpeso
       this.oimc.categoria=TipoImc.SOBREPESO;
       this.oimc.lectura = TipoImc[TipoImc.SOBREPESO];
     }else if (this.oimc.numerico>=31)
     {
       //obeso
       this.oimc.categoria=TipoImc.OBESO;//orden
       this.oimc.lectura = TipoImc[TipoImc.OBESO];//accedo al Enumerado como String

     }
    
    
    
    //PUEDO USAR EL API DE JS
    let nuevo_imc : Imc = this.nuevoItemImc (this.oimc);
    this.lista_imcs.push(nuevo_imc);
    //this.lista_imcs.push(this.oimc);

    this.lista_imcs.forEach (/*function mostrar (itemimc)*/ (itemimc,i) => {
      /*console.log("POS " + i);
      console.log(itemimc.altura);
      console.log(itemimc.peso);
      console.log(itemimc.numerico);
      console.log(itemimc.categoria);*/
      console.log(`Posición ${i} ${itemimc.altura} ${itemimc.peso} ${itemimc.numerico} ${itemimc.categoria} ${itemimc.lectura}`);
    });

  }

  //forEach
  //map
  //filter
  //PARA PRACTICAR LOS OPERADORES FUNCIONALES DEL ARRAY
  //USANDO ESTOS , HAGAMOS
  //1) OBTENER LA MEDIA DE PESO DE TODOS LOS IMCS
  //2) OBTENER LA MEDIA DE ALTURA DE TODOS LOS IMCS
  //3) OBTENER UN ARRAY SÓLO CON LOS OBESOS
  //4) TRANSFORMAR EL ARRAY ORIGINAL Y SUBIR 1KG A TODOS LOS IMCS

}
