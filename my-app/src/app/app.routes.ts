import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ViewRoomsComponent } from './components/view-rooms/view-rooms.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegistrationComponent},
    {path:'prueba', component:ViewRoomsComponent},
    {path:'rooms', component:RoomsComponent},
    {path:'**', redirectTo: 'login', pathMatch:'full'},
];
