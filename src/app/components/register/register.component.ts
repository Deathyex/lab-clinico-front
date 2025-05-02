import { Component, inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, NgClass],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
	constructor(private readonly fb: FormBuilder) { }

	private authService = inject(AuthService);
	private router = inject(Router);

	registerForm!: FormGroup;
	public showToast = false;
	public tipoModal: 'success' | 'error' = 'success';
	public mensaje = '';
	public isLoading = false;

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			id: [
				'',
				[
					Validators.required,
					Validators.minLength(7),
					Validators.maxLength(10),
				],
			],
			firstName: ['', [Validators.required, Validators.minLength(3)]],
			lastName: ['', [Validators.required, Validators.minLength(3)]],
			birthDate: ['', Validators.required],
			email: ['', [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(250),
					Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/),
				],
			],
		});
	}

	register() {
		if (this.registerForm.valid) {
			this.isLoading = true;
			const newUser = {
				id: this.registerForm.value.id,
				firstName: this.registerForm.value.firstName,
				lastName: this.registerForm.value.lastName,
				birthDate: this.registerForm.value.birthDate,
				email: this.registerForm.value.email,
				password: this.registerForm.value.password,
			};

			this.authService.register(newUser).subscribe(
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
					this.isLoading = false;
					this.mostrarToast('success', 'El usuario fue creado con éxito.');
					setTimeout(() => {
						this.router.navigate(['/userProfile']);
					}, 2000);
				},
				err => {
					console.log(err);
					this.isLoading = false;
					this.mostrarToast('error', 'No fue posible crear el usuario.');
				},
			);
		}
	}

	mostrarToast(tipo: 'success' | 'error', mensaje: string): void {
		this.tipoModal = tipo;
		this.mensaje = mensaje;
		this.showToast = true;

		setTimeout(() => {
			this.closeToast();
		}, 3000);
	}

	closeToast(): void {
		this.showToast = false;
	}
}
