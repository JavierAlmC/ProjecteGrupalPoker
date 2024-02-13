import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']  
})
export class StatsComponent implements OnInit {

  private dataTable = [
    ['nickname', 'dinero'],
    ['Juan', 900],
    ['Pepe', 700],
    ['Luis', 500],
    ['Ana', 250],
    ['Maria', 50]
  ];

  ngOnInit(): void {
    this.createBar(this.dataTable);
  }

  createBar(dataTable: any[]): void {
    const statsDiv = document.getElementById('stats');
    if (statsDiv) {
      const maxWidth = statsDiv.offsetWidth * 0.8;
      console.log(maxWidth); 
      const maxDinero = Math.max(...dataTable.slice(1).map((row: any[]) => row[1])); 
      dataTable.slice(1).forEach((row: any[]) => {
        const nombre = row[0];
        const dinero = row[1];
        const barWidth = ((dinero / maxDinero) * maxWidth);
        console.log(barWidth)
        const barDiv = document.createElement('div');
        barDiv.classList.add('bar');
        barDiv.textContent = `${nombre}: ${dinero}`;
        barDiv.style.width = `${barWidth}px`;
        barDiv.style.backgroundColor = 'green';
        barDiv.style.margin = '10px';
        barDiv.style.padding = '10px';
        barDiv.style.color = 'white';
        statsDiv.appendChild(barDiv);
      });
    }
  }
}