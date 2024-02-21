import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardComponent } from './components/board/board.component';


export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegistrationComponent},
    {path:'rooms', component:RoomsComponent},
    {path:'profile', component:ProfileComponent},
    {path:'board', component:BoardComponent},
    {path:'**', redirectTo: 'login', pathMatch:'full'},
];
