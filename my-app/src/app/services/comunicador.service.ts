import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {// Observable string sources
  
  private busquedaNuevaSource = new Subject<string>();
  

  // Observable string streams
  palabraNuevaAnunciada = this.busquedaNuevaSource.asObservable();
  
  // Service message commands
  comunicaBusquedaNueva(termino: string) {
    //"emitir"
    this.busquedaNuevaSource.next(termino);
  }

  
  
  constructor() {
    
  }
}
