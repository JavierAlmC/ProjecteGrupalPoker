import { Component, OnInit,HostListener } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']  
})
export class StatsComponent implements OnInit {
  
  constructor( public userService: UserServicesService){}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const statsDiv = document.getElementById('stats');
    statsDiv!.innerHTML='';
    this.createBar(this.dataTable);
    
  }

  private dataTable = [
  ];
  
  
  ngOnInit(): void {
    this.userService.getOrderBySalario().subscribe(
      (dataTable) => {
          let table = dataTable;
          console.log(table);
          this.createBar(table);
      },
      (error) => {
          console.error(error);
      }
  );
  }


  createBar(dataTable: any): void {

    const statsDiv = document.getElementById('stats');
    if (statsDiv) {
      const maxWidth = statsDiv.offsetWidth * 0.8;
      const maxDinero = Math.max(...dataTable.slice(0).map((row: any[]) => row[1])); 
      dataTable.forEach((row: any[]) => {
        const nombre = row[0];
        const dinero = row[1];
        const barWidth = ((dinero / maxDinero) * maxWidth);
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