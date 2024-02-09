import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { PlayerGamesComponent} from '../player-games/player-games.component';
import { ViewRoomsComponent } from '../view-rooms/view-rooms.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
    selector: 'app-rooms',
    standalone: true,
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.css',
    imports: [HeaderComponent, FooterComponent, PlayerGamesComponent, ViewRoomsComponent, DashboardComponent],
})
export class RoomsComponent {

}
