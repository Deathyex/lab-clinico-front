import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	constructor(private readonly fb: FormBuilder) {}

	loginForm!: FormGroup;

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	login() {
		console.log('No implementado');
	}
}
