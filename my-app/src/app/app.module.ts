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

@NgModule({
  declarations: [
    AppComponent,
    DniComponent,
    ImcComponent,
    JuegoPptComponent,
    MarcadorComponent,
    AlumnoComponent,
    FormularioAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
