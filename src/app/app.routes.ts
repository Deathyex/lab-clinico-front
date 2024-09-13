import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', component: InicioComponent },
	{ path: 'login', component: LoginComponent },
];
