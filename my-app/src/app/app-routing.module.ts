import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoPagComponent } from './components/alumno-pag/alumno-pag.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { DniComponent } from './components/dni/dni.component';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';
import { ImcComponent } from './components/imc/imc.component';
import { JuegoPptComponent } from './components/juego-ppt/juego-ppt.component';

//AQUÍ SE CONFIGURAN LAS RUTAS
const routes: Routes = [
  {path:"dni", component: DniComponent},
  //{path:"", component: DniComponent},
  {path:"imc", component: ImcComponent},
  {path:"ppt", component: JuegoPptComponent},//piedra papel tijera ppt
  {path:"alumno", component: AlumnoComponent},
  {path:"alumno/form", component: FormularioAlumnoComponent},
  {path:"alumno/form/edit/:id", component: FormularioAlumnoComponent},
  {path:"alumnopag", component: AlumnoPagComponent}
  

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
