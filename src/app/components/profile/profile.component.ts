import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
})
export class ProfileComponent {
	private authService = inject(AuthService);

	userData: User = this.authService.checkLogin()!;

	calcularEdad(fecha: string) {
		var hoy = new Date();
		var cumpleanos = new Date(fecha);
		var edad = hoy.getFullYear() - cumpleanos.getFullYear();
		var m = hoy.getMonth() - cumpleanos.getMonth();

		if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
			edad--;
		}

		return edad;
	}
}
