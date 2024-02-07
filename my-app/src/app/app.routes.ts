import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RoomsComponent } from './components/rooms/rooms.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'register', component:RegistrationComponent},
    {path:'rooms', component:RoomsComponent}

];
