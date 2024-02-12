import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PlayerGamesComponent } from "../player-games/player-games.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ViewRoomsComponent } from "../view-rooms/view-rooms.component";

@Component({
    selector: 'app-rooms',
    standalone: true,
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.css',
    imports: [HeaderComponent, FooterComponent, PlayerGamesComponent, DashboardComponent, ViewRoomsComponent]
})
export class RoomsComponent {

}
