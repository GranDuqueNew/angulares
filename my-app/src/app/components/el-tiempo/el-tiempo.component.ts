import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-el-tiempo',
  templateUrl: './el-tiempo.component.html',
  styleUrls: ['./el-tiempo.component.css']
})
export class ElTiempoComponent implements OnInit, AfterViewInit {


  //TODO: vamos a hacer una aplicación que:
  /**
   * 1. Nos ubique geográficamente (API GEOLOCATION Navegador)X
   * 2. Vamos a dibujar un mapa (Leaflet)X
   * 3. Vamos a dibujar nuestra posición obtenida en el mapax
   * 4. Con esa posición, vamos a obtener el tiempo, a través de otro API
   *    Este api web del tiempo https://api.openweathermap.org
   */

   private map;


  constructor() { }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    //se ha cargado la plantilla
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
  }

  dibujarPosicion (latitude:number, longitude:number)
  {
    let nivel_de_zoom = 12;


    this.map.setView([latitude, longitude], nivel_de_zoom);//
    //coordenadas del Estadio del Madrid 40.4530387,-3.6883337
    var circle = L.circle([latitude, longitude], {
      color: 'blue',
      fillColor: '#000',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(this.map);

  //TODO: punto 4, obtener el tiempo de esta ubicación

  //var marker = L.marker([latitude, longitude]).addTo(this.map);
    
  }

  encuentrame() :void
  {
    if (navigator.geolocation)
    {
      console.log("tenemos acceso al API de Geolocation");
      navigator.geolocation.getCurrentPosition((pos)=>this.exito(pos) ,()=>this.fracaso());
    } else {
      console.log(" NO tenemos acceso al API de Geolocation");
      this.fracaso();
    }
  }


  exito (posicion:GeolocationPosition)
  {
    //alert("No es posible determinar su ubicación en este dispositivo");
    console.log("Se ha encotrado su posición ");
    console.log("Latitud " + posicion.coords.latitude);
    console.log("Longuitud " + posicion.coords.longitude);
    this.dibujarPosicion (posicion.coords.latitude, posicion.coords.longitude);

  }

  fracaso ()
  {
    alert("No es posible determinar su ubicación en este dispositivo");
  }

}
