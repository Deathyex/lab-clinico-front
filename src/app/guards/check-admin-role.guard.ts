import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const checkAdminRoleGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const isAdmin = authService.checkAdminRole();
	if (isAdmin) {
		return true;
	}
	router.navigate(['/login']);
	return false;
};
