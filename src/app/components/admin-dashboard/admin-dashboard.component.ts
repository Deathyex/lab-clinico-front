import { Component } from '@angular/core';
import { AdminExamenesComponent } from './admin-examenes/admin-examenes.component';
import { AdminResultadosComponent } from './admin-resultados/admin-resultados.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

@Component({
	selector: 'app-admin-dashboard',
	standalone: true,
	imports: [
		AdminExamenesComponent,
		AdminResultadosComponent,
		AdminUsersComponent,
	],
	templateUrl: './admin-dashboard.component.html',
	styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
