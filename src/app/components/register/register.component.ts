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

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
	constructor(private readonly fb: FormBuilder) { }

	private authService = inject(AuthService);
	private router = inject(Router);

	registerForm!: FormGroup;
	//data?:SingUp;

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
					this.router.navigate(['/userProfile']);
					alert('Usuario registrado exitosamente');
				},
				err => {
					console.log(err);
				},
			);
		}
	}
}
