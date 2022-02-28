import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ElTiempoService } from 'src/app/services/el-tiempo.service';

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
   @ViewChild('localidad') spanlocalidad;
   @ViewChild('descripcion') spandescripcion;
   @ViewChild('temperatura') spantemperatura;
   @ViewChild('humedad') spanhumedad;
   @ViewChild('viento') spanviento;
   @ViewChild('alba') spanalba;
   @ViewChild('puesta') spanpuesta;
   @ViewChild('logotiempo') imgtiempo;

   infoTiempoOk:boolean=false;

  constructor(public eltiempo_service: ElTiempoService) { }
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

   timeConverter(tiempo_json):string
   {
     let time:string ="";
    
     let a = new Date(tiempo_json * 1000);
     let hour = a.getHours();
     let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
     let sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()
     time = hour + ':' + min + ':' + sec ;

     

     return time;
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

  
  //CON OBSERVABLES
  /*this.eltiempo_service.obtenerTiempoConObservables(latitude, longitude).subscribe
  (
    {
      complete: () => {console.log("comunicaión completada");},
      error: (error_rx) => {console.error(error_rx);},
      next: (infotiempo_json) => {
        
        console.log("INFO TIEMPO RX = ");
        console.log(infotiempo_json);
        this.mostrarTiempo(infotiempo_json);
      }

    }
  );*/

  //CON FETCH
  this.eltiempo_service.obtenerTiempoConFetch(latitude, longitude)
  .then(repuesta=> repuesta.json())//la paso a objeto deserializar
  .then (infotiempo_json => this.mostrarTiempo(infotiempo_json))
  .catch(error=> console.log(error));
  //var marker = L.marker([latitude, longitude]).addTo(this.map);
    
  }


  mostrarTiempo (infotiempo_json)
  {
    console.log("DESCRIPCIÓN = " +infotiempo_json.weather[0].description);
        this.spandescripcion.nativeElement.innerHTML= infotiempo_json.weather[0].description;
        //TEMPERATURA Cº
        console.log("TEMPERATURA Cº = " +infotiempo_json.main.temp);
        this.spantemperatura.nativeElement.innerHTML= infotiempo_json.main.temp + "Cº";
        //HUMEDAD %
        console.log("HUMEDAD % = " +infotiempo_json.main.humidity);
        this.spanhumedad.nativeElement.innerHTML= infotiempo_json.main.humidity+" humedad %";
        //VIENTO M/S
        console.log("VIENTO M/S = " +infotiempo_json.wind.speed);
        this.spanviento.nativeElement.innerHTML= infotiempo_json.wind.speed + " viento m/s";
        //AMANECER -ALBA
        console.log("AMANECER -ALBA = " +infotiempo_json.sys.sunrise);
        let alba = this.timeConverter(infotiempo_json.sys.sunrise);
        
        this.spanalba.nativeElement.innerHTML= "Amanece "+alba//;infotiempo_json.sys.sunrise;
        let puesta =this.timeConverter(infotiempo_json.sys.sunset);
        
        console.log("ANOCHECER -PUESTA DE SOL = " +infotiempo_json.sys.sunset);
        this.spanpuesta.nativeElement.innerHTML= "Anochece " +puesta;
        
        //obtengo la imagen
        let ruta_img ="https://openweathermap.org/img/wn/"+infotiempo_json.weather[0].icon+"@2x.png";
        console.log("ruta imagen = " +ruta_img);
        //this.imgtiempo.nativeElement.src= ruta_img;
        console.log("NOMBRE = " +infotiempo_json.name);

//TODO: punto 5, representar la información obtenida
        this.spanlocalidad.nativeElement.innerHTML= infotiempo_json.name;
        this.infoTiempoOk=true;

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
