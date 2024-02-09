import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-view-rooms',
    standalone: true,
    templateUrl: './view-rooms.component.html',
    styleUrl: './view-rooms.component.css',
    imports: [HeaderComponent]
})
export class ViewRoomsComponent {

}
