import { Component, OnInit } from '@angular/core';
import { Imc } from './imc';
import { TipoImc } from './tipo-imc';


@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.css']
})
export class ImcComponent implements OnInit {

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
  titulo: string = "CALCULO DEL IMC";
  // peso:number;
  // altura:number;
  // imc:number;
  oimc: Imc;
  lista_imcs: Array<Imc>;
  mediaaltura: number;
  mediapeso: number;
  ultima_vez: string;
  static readonly FOTO_DESNUTRIDO: string = "assets/desnutrido.jpg";
  static readonly FOTO_DELGADO: string = "assets/delgado.jpg";
  static readonly FOTO_IDEAL: string = "assets/ideal.jpg";
  static readonly FOTO_SOBREPESO: string = "assets/sobrepeso.jpg";
  static readonly FOTO_OBESO: string = "assets/obeso.jpg";


  //TODO: USANDO EL LOCALSTORAGE GUARDAR LA ÚLTIMA
  //VEZ QUE SE CONECTA EL USUARIO, PARA QUE LE 
  //APAREZCA EL DATO DE "ÚLTIMA CONEXIÓN" 
  //de forma veraz

  constructor() {
    // this.altura = 0;
    // this.peso = 0;
    // this.imc = 0;
    this.ultima_vez = new Date().toString();
    this.oimc = new Imc();
    this.lista_imcs = new Array<Imc>();
    this.mediaaltura = 0;
    this.mediapeso = 0;
  }

  actualizarNumVeces() {
    let nveces: number = 0;
    let sveces: string | null = localStorage.getItem('num_veces');
    if (sveces != null) {
      //existe registro - no es la primera vez que se conecta
      //casting de string a numero
      nveces = + sveces;
    }
    nveces = nveces + 1;

    localStorage.setItem('num_veces', nveces + '');
    console.log("se ha conectado " + nveces);

  }

  obtenerYActualizarUltimaVez(): string {
    let ultima_vez: string | null;
    let momento_actual: string = "";

      ultima_vez = localStorage.getItem("ultima_vez");
      momento_actual = new Date().toString();
      
      if (ultima_vez == null) //
      {
        ultima_vez = momento_actual;
      }

      //actualizo
      localStorage.setItem("ultima_vez", momento_actual);

    return ultima_vez;

  }

  ngOnInit(): void {
    //localStorage.setItem('miGato', 'Juan');
    //sessionStorage.setItem('miGato', 'Juan');
    //TODO: contar el número de veces que ha visitado nuestra página del imc
    this.actualizarNumVeces();
    this.ultima_vez = this.obtenerYActualizarUltimaVez();

  }

  nuevoItemImc(oimc: Imc): Imc {
    //declaro IMC
    let imc_aux: Imc;

    imc_aux = new Imc();
    imc_aux.altura = oimc.altura;
    imc_aux.peso = oimc.peso;
    imc_aux.numerico = oimc.numerico;
    imc_aux.categoria = oimc.categoria;
    imc_aux.lectura = oimc.lectura;
    imc_aux.foto = oimc.foto;


    return imc_aux;
    //return imc

  }

  obtenerMediaPeso(array_imcs: Array<Imc>): number {
    let media: number = 0;
    let total: number = 0;

    //sumo los valores - sumatorio / 
    //array_imcs.forEach(item_imc => total = total + item_imc.peso);
    array_imcs.forEach(item_imc => { total += item_imc.peso });
    //divido entre el nº de elementos
    media = total / array_imcs.length;

    return media;

  }

  filtrarObesos(array_imcs: Array<Imc>): Array<Imc> {
    let array_obesos: Array<Imc> = new Array<Imc>();

    array_obesos = array_imcs.filter(item_imc => item_imc.categoria == TipoImc.OBESO);


    return array_obesos;
  }

  transformarMas1kg(array_imcs: Array<Imc>) {
    array_imcs.map(item_imc => {
      item_imc.peso = item_imc.peso + 1;
      return item_imc;
    })
  }

  obtenerMediaAltura(array_imcs: Array<Imc>): number {
    let media: number = 0;
    let total: number = 0;

    //sumo los valores - sumatorio / 
    //array_imcs.forEach(item_imc => total = total + item_imc.peso);
    array_imcs.forEach(item_imc => { total += item_imc.altura });
    //divido entre el nº de elementos
    media = total / array_imcs.length;

    return media;

  }

  mostrarPorConsola(array: Array<Imc>) {
    array.forEach(/*function mostrar (itemimc)*/(itemimc, i) => {
      /*console.log("POS " + i);
      console.log(itemimc.altura);
      console.log(itemimc.peso);
      console.log(itemimc.numerico);
      console.log(itemimc.categoria);*/
      console.log(`Posición ${i} ${itemimc.altura} ${itemimc.peso} ${itemimc.numerico} ${itemimc.categoria} ${itemimc.lectura}`);
    });

  }



  calcularIMC() {
    console.log("calcular imc boton tocado");
    this.oimc.numerico = this.oimc.peso / (this.oimc.altura * this.oimc.altura);
    //casting de String a numero
    this.oimc.numerico = + this.oimc.numerico.toFixed(2);
    //this.oimc.numerico = parseFloat(this.oimc.numerico.toFixed(2));
    if (this.oimc.numerico < 16) {
      //desnutrido
      this.oimc.categoria = TipoImc.DESNUTRIDO;
      this.oimc.lectura = TipoImc[TipoImc.DESNUTRIDO];
      this.oimc.foto = ImcComponent.FOTO_DESNUTRIDO;
    } else if (this.oimc.numerico >= 16 && this.oimc.numerico < 18) {
      //delgado
      this.oimc.categoria = TipoImc.DELGADO;
      this.oimc.lectura = TipoImc[TipoImc.DELGADO];
      this.oimc.foto = ImcComponent.FOTO_DELGADO;
    } else if (this.oimc.numerico >= 18 && this.oimc.numerico < 25) {
      //ideal
      this.oimc.categoria = TipoImc.IDEAL;
      this.oimc.lectura = TipoImc[TipoImc.IDEAL];
      this.oimc.foto = ImcComponent.FOTO_IDEAL;
    } else if (this.oimc.numerico >= 25 && this.oimc.numerico < 31) {
      //soberpeso
      this.oimc.categoria = TipoImc.SOBREPESO;
      this.oimc.lectura = TipoImc[TipoImc.SOBREPESO];
      this.oimc.foto = ImcComponent.FOTO_SOBREPESO;
    } else if (this.oimc.numerico >= 31) {
      //obeso
      this.oimc.categoria = TipoImc.OBESO;//orden
      this.oimc.lectura = TipoImc[TipoImc.OBESO];//accedo al Enumerado como String
      this.oimc.foto = ImcComponent.FOTO_OBESO;

    }



    //PUEDO USAR EL API DE JS
    let nuevo_imc: Imc = this.nuevoItemImc(this.oimc);
    this.lista_imcs.push(nuevo_imc);
    //this.lista_imcs.push(this.oimc);


    this.mediaaltura = this.obtenerMediaAltura(this.lista_imcs);
    this.mediaaltura = + this.mediaaltura.toFixed(2);
    this.mediapeso = this.obtenerMediaPeso(this.lista_imcs);
    this.mediapeso = + this.mediapeso.toFixed(2);
    let array_obesos: Array<Imc> = this.filtrarObesos(this.lista_imcs);
    console.log("Mostrando obesos");
    this.mostrarPorConsola(array_obesos);
    this.transformarMas1kg(this.lista_imcs);
    console.log("Mostrando +1kg");
    this.mostrarPorConsola(this.lista_imcs);


  }


  ordenarPorImc() {
    console.log("Ordenando por IMC...");
    this.lista_imcs.sort(
      (a: Imc, b: Imc) => {
        let valor_devuelto: number = 0;
        /*if (a.numerico>b.numerico)
        {
          valor_devuelto = -1;
        } else if (b.numerico>a.numerico)
        {
          valor_devuelto=1;
        } else {
          valor_devuelto=0;
        }*/
        valor_devuelto = a.numerico - b.numerico;// de menor a mayor ASC
        //valor_devuelto=b.numerico-a.numerico ;// de mayor a menor DESC
        //TODO: práctica: poner eventos a las distintas columnas
        //y conseguir ordenar por distintos criterios
        //si a es mayor que b
        //1 o un nº positivo
        //si a es menor que b
        //-1 o nº negativo
        //si son iguales
        //0  

        return valor_devuelto;
      }
    );

  }

}
