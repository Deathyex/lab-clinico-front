import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LabServicesComponent } from './components/lab-services/lab-services.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResultadosComponent } from './components/profile/resultados/resultados.component';
import { AppointmentsComponent } from './components/profile/appointments/appointments.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminExamenesComponent } from './components/admin-dashboard/admin-examenes/admin-examenes.component';
import { AdminResultadosComponent } from './components/admin-dashboard/admin-resultados/admin-resultados.component';
import { AdminUsersComponent } from './components/admin-dashboard/admin-users/admin-users.component';
import { authGuard } from './guards/auth.guard';
import { checkAdminRoleGuard } from './guards/check-admin-role.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', component: InicioComponent },
	{ path: '404', component: PageNotFoundComponent },
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
		canActivate: [authGuard],
	}, // Ruta para probar componentes
	{
		path: 'admin',
		component: AdminDashboardComponent,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'resultados' },
			{ path: 'resultados', component: AdminResultadosComponent },
			{ path: 'examenes', component: AdminExamenesComponent },
			{ path: 'users', component: AdminUsersComponent },
		],
		canActivate: [authGuard, checkAdminRoleGuard],
	},
	{ path: '**', pathMatch: 'full', redirectTo: '404' },
];
