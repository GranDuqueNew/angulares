export class Alumno {

    //debe haber una corrrespondencia exacta en el nombre de los campos
    //del json y los atributos de la clase alumno

    id: number;
    nombre: string;
    apellido: string;
    email: string;
    edad: number;
    creadoEn: string;//DATE

    constructor ()
    {
        this.id =0;
        this.nombre='';
        this.apellido='';
        this.email='';
        this.edad=0;
        this.creadoEn='';
    }
   
}
