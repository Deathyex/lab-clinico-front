import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private http = inject(HttpClient);

	isLoggedIn = signal<boolean>(false);

	checkLogin(): User | undefined {
		const user = localStorage.getItem('userLoggedIn');
		if (user) {
			return JSON.parse(user);
		}
		return undefined;
	}

	login(user: User): void {
		localStorage.setItem('userLoggedIn', JSON.stringify(user));
		this.isLoggedIn.set(true);
	}

	logout(): void {
		localStorage.removeItem('userLoggedIn');
		this.isLoggedIn.set(false);
	}

	authenticate(email: string, password: string): Observable<any> {
		return this.http
			.post<any>('http://localhost:3777/api/v1/auth/login', {
				email,
				password,
			})
			.pipe(
				catchError((error: HttpErrorResponse) => {
					let errorMessage = '';
					errorMessage = `Error code: ${error.status}, Message:${error.message} `;
					return throwError(() => errorMessage);
				}),
			);
	}
}
