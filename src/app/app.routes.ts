import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LabServicesComponent } from './components/lab-services/lab-services.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResultadosComponent } from './components/profile/resultados/resultados.component';
import { AppointmentsComponent } from './components/profile/appointments/appointments.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', component: InicioComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'services', component: LabServicesComponent },
	{
		path: 'contact',
		component: ProfileComponent,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'resultados' },
			{ path: 'resultados', component: ResultadosComponent },
			{ path: 'appointments', component: AppointmentsComponent },
		],
	}, // Ruta para probar componentes
];
