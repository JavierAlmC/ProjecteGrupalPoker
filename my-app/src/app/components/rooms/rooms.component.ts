import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ViewRoomsComponent } from "../view-rooms/view-rooms.component";
import { StatsComponent } from "../stats/stats.component";

@Component({
    selector: 'app-rooms',
    standalone: true,
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.css',
    imports: [HeaderComponent, FooterComponent, DashboardComponent, ViewRoomsComponent, StatsComponent]
})
export class RoomsComponent {

}
