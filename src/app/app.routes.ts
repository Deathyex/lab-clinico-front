import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', component: InicioComponent },
];
