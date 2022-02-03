import { TipoImc } from "./tipo-imc";

export class Imc {

    peso:number;
    altura:number;
    numerico:number;
    categoria:TipoImc;
    lectura:string;
    foto:string;

    //ME PERMITE CREAR OBJETOS
    //variables de tipo IMC
    constructor ()
    {
        this.peso=0;
        this.altura=0;
        this.numerico=0;
        this.categoria=TipoImc.DESNUTRIDO;
        this.lectura="";
        this.foto="";
    }
}
