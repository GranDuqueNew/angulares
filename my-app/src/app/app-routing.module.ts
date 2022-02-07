import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DniComponent } from './components/dni/dni.component';
import { ImcComponent } from './components/imc/imc.component';

//AQUÍ SE CONFIGURAN LAS RUTAS
const routes: Routes = [
  {path:"dni", component: DniComponent},
  //{path:"", component: DniComponent},
  {path:"imc", component: ImcComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
