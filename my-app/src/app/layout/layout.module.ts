import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { AppRoutingModule } from '../app-routing.module';

/**
 * MI OBJETIVO ES QUE ESTE MÓDULO
 * CONTENGA LOS COMPONENTES ESTRUCUTURALES DEL DISEÑO
 * (CABECERA-NAVBAR-, PIE-FOOTER)
 */

@NgModule({
  declarations: [
    MenuSuperiorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MenuSuperiorComponent //Hago público el Componente para que pueda ser usado fuera
  ]
})
export class LayoutModule { }
