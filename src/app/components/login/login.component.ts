import { Component, inject, OnInit, output } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	constructor(private readonly fb: FormBuilder) {}
	private authService = inject(AuthService);

	loginForm!: FormGroup;
	isIncorrectCredentials = false;

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	login() {
		if (this.loginForm.valid) {
			const email = this.loginForm.value.email;
			const password = this.loginForm.value.password;
			this.authService.authenticate(email, password).subscribe(
				({ user, token }) => {
					const loggedUser: User = {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						birthDate: user.birthDate,
						email: user.email,
						role: user.role,
						token: token,
					};
					this.authService.login(loggedUser);
				},
				err => {
					this.isIncorrectCredentials = true;
				},
			);
		}
	}
}
