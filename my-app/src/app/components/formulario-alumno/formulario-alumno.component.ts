import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css']
})
export class FormularioAlumnoComponent implements OnInit {

  alumno:Alumno;

  constructor(public servicio_alumnos:AlumnoService,
    private router:Router) //consigo gestionar la navegación de forma programática
    { 
    this.alumno = new Alumno();
  }

  ngOnInit(): void {
  }

  public crearAlumno()
  {
    console.log("Tocó crear Alumno");
    //this.alumno -- validado y listo para hacer POST
    this.servicio_alumnos.crearAlumno(this.alumno).subscribe
    (
      {
        complete: () => console.log('ha terminado'),
        error:(error) => console.error('ha terminado'),
        //TODO: gestionar 400 o posibles errores provienientes del servidor
        next: (alumno_nuevo)=>
        {
          console.log(alumno_nuevo.id);
          alert('Alumno Insertado Correctamente :)');
          //vuelva al listado, programáticamente
          this.router.navigateByUrl("/alumno");
        }
      }
      
    );


  }

}
