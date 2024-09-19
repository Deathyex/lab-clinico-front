import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LabServicesComponent } from './components/lab-services/lab-services.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', component: InicioComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'services', component: LabServicesComponent}
];
