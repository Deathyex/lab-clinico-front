import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
	private authService = inject(AuthService);

	isLoggedIn = this.authService.isLoggedIn;
	isAdmin = this.authService.isAdmin;

	ngOnInit(): void {
		this.authService.checkLogin();
		this.authService.checkAdminRole();
	}

	logout() {
		this.authService.logout();
	}
}
