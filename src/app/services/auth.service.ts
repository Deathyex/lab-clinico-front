import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { env } from './config';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private http = inject(HttpClient);

	isLoggedIn = signal<boolean>(false);
	isAdmin = signal<boolean>(false);


	baseUrl = env.baseUrl;

	checkLogin(): User | undefined {
		const user = localStorage.getItem('userLoggedIn');
		if (user) {
			this.isLoggedIn.set(true);
			return JSON.parse(user);
		}
		this.isLoggedIn.set(false);
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
			.post<any>(`${this.baseUrl}/auth/login`, {
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

	register(newUser: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/users/create`, newUser).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				errorMessage = `Error code: ${error.status}, Message:${error.message} `;
				return throwError(() => errorMessage);
			}),
		);
	}

	checkAdminRole(): boolean {
		const user = localStorage.getItem('userLoggedIn');
		if (user) {
			const loggedUser = JSON.parse(user);
			if (loggedUser.role === 'ADMIN') {
				this.isAdmin.set(true);
				return true;
			}
		}
		this.isAdmin.set(false);
		return false;
	}
}
