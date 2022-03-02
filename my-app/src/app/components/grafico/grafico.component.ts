import { Component, OnInit} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';



@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      { //cada bloque, es una serie (conjunto de datos)
        data: [ 65, 59, 80 ],//EJE Y
        label: 'ESTADÍSTICOS IMC',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'MEDIA', 'MINIMO', 'MAXIMO' ]//EJEX
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true }
    }
  };

  public lineChartType: ChartType = 'bar';



}
