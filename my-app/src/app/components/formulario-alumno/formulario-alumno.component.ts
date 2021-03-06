import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css']
})
export class FormularioAlumnoComponent implements OnInit {

  alumno: Alumno;
  en_edicion: boolean;
  observador: Observer<Alumno>;
  foto_seleccionada: File | null;

  constructor(public servicio_alumnos: AlumnoService,
    private router: Router, private ruta: ActivatedRoute)
  //Router //consigo gestionar la navegación de forma programática
  //ActivatedRoute // consigo acceder al location HREF desde Angular
  {
    this.alumno = new Alumno();

    this.observador = {
      complete: () => console.log('ha terminado'),
      error: (error) => console.error('ha terminado'),
      //TODO: gestionar 400 o posibles errores provienientes del servidor
      next: (alumno_nuevo) => {
        console.log(alumno_nuevo.id);
        alert('Alumno Guardado Correctamente :)');
        //vuelva al listado, programáticamente
        this.router.navigateByUrl("/alumno");
      }
    }
  }

  estoyEnEdicion(ruta: string): boolean {
    let editando: boolean = false;

    editando = (ruta.indexOf('edit') != -1);

    return editando;

  }

  ngOnInit(): void {
    //o vengo a crear o vengo a editar
    let url = location.href;
    console.log("estoy en " + url);
    if (this.estoyEnEdicion(url)) {
      console.log("estoy en edicion");
      this.en_edicion = true;
      //1 rellenar el formulario con los datos del alumno en edición x
      //2 cambiar el boton de Crear por Actualizar x
      //3 cambiar la funcionalidad del botón submit // update PUT x
      let pos_ultima_barra = url.lastIndexOf("/");
      let id = url.substring(pos_ultima_barra + 1, url.length);
      console.log("id del alumno = " + id);

      this.alumno = this.servicio_alumnos.leerAlumnoEnEdicion();
      //otra forma de sacar el valor del ID "estilo Angular"
      //this.ruta.snapshot esto es como el href
      let id2 = this.ruta.snapshot.paramMap.get('id');
      console.log("id2 del alumno = " + id2);

      /*
      this.servicio_alumnos.leerAlumnoPorId(+id).subscribe(
        {
          complete: () => console.log('ha terminado'),
          error: (error) => console.error('error ' + error.message),
          //TODO: gestionar 400 o posibles errores provienientes del servidor
          next: (alumno_leido) => {
            console.log(alumno_leido.id);
            //alert('Alumno leido Correctamente :)');
            //vuelva al listado, programáticamente
            this.alumno = <Alumno>alumno_leido;

          }
        }
      )*/



    } else {
      console.log("estoy creando");
      this.en_edicion = false;
    }
    //TODO: haciendo uso de la url, haced un método que me diga si estoy editando o creando
  }

  estiloBoton(): string {
    //si está creando, lo pongo en azul
    //si está editando lo pongo verde
    let estilo_boton: string = '';

    if (this.en_edicion) {
      estilo_boton = "btn btn-success";
    } else {
      estilo_boton = "btn btn-primary";
    }


    return estilo_boton;
  }

  editarAlumno() {
    console.log("Tocó Actualizar Alumno");

    if (this.foto_seleccionada!=null)
    {
      this.servicio_alumnos.actualizarAlumnoConFoto(this.alumno, this.foto_seleccionada).subscribe(this.observador);
    } else {
      this.servicio_alumnos.actualizarAlumno(this.alumno).subscribe(this.observador);
    }
  }

  public crearAlumno() {
    console.log("Tocó crear Alumno");
    //this.alumno -- validado y listo para hacer POST
    //si hay foto, llamo a crear alumno con foto
    //si no, pues al crear normal
    if (this.foto_seleccionada!=null)
    {
      this.servicio_alumnos.crearAlumnoConFoto(this.alumno, this.foto_seleccionada).subscribe(this.observador);
    } else {
      this.servicio_alumnos.crearAlumno(this.alumno).subscribe(this.observador);
    }
  }

  seleccionarFoto(evento: Event) {
    console.log("foto cambiada");
    //evento.target //éste es el input file
    let input_file = evento.target as HTMLInputElement;
    //let intput_file2 = <HTMLInputElement>evento.target; 

    this.foto_seleccionada = input_file.files[0];

    console.log("Nombre fichero sel = " + this.foto_seleccionada.name);
    console.log("Tipo fichero sel = " + this.foto_seleccionada.type);

    //si es una imagen, perfecto "me la quedo"
    if (this.foto_seleccionada.type.indexOf('image') >= 0) {
      console.log("el usuario ha seleccionado una imagen");
    } else {
      console.log("el usuario NO ha seleccionado una imagen");
      this.foto_seleccionada = null;
      //TODO: Eliminar el nombre del archivo del input para mejorar
      //input_file.files[0]=null;
    }

    //si no, la elimino, "no me la quedo"

  }

}
