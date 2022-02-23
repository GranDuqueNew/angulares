import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DniComponent } from './components/dni/dni.component';
import { ImcComponent } from './components/imc/imc.component';
import { LayoutModule } from './layout/layout.module';
import { JuegoPptComponent } from './components/juego-ppt/juego-ppt.component';
import { MarcadorComponent } from './components/marcador/marcador.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AlumnoPagComponent } from './components/alumno-pag/alumno-pag.component';
import { BusquedaPorNombreComponent } from './components/busqueda-por-nombre/busqueda-por-nombre.component';
import { CajaBusquedaAlumnosComponent } from './components/caja-busqueda-alumnos/caja-busqueda-alumnos.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';

@NgModule({
  declarations: [ //aquí van los componentes que pertenecen al módulo
    AppComponent,
    DniComponent,
    ImcComponent,
    JuegoPptComponent,
    MarcadorComponent,
    AlumnoComponent,
    FormularioAlumnoComponent,
    AlumnoPagComponent,
    BusquedaPorNombreComponent,
    CajaBusquedaAlumnosComponent,
    ListaAlumnosComponent
  ],
  imports: [ //aquí los módulos - agrupación funcional 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],//servicios
  bootstrap: [AppComponent] //coponente inicial
})
export class AppModule { }
