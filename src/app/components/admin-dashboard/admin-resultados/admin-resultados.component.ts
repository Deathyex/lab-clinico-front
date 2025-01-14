import { Component, inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { BuscadorComponent } from '../../admin-dashboard/buscador/buscador.component'

@Component({
	selector: 'app-admin-resultados',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgClass, BuscadorComponent],
	templateUrl: './admin-resultados.component.html',
	styleUrl: './admin-resultados.component.css',
})
export class AdminResultadosComponent implements OnInit {
	private fb = inject(FormBuilder);

	resultadoForm!: FormGroup;
	file: File | null = null;
	fileIsOver: boolean = false;

	ngOnInit() {
		this.resultadoForm = this.fb.group({
			file: ['', Validators.required],
			userId: ['', Validators.required],
		});
	}

	uploadResultado() {}

	deleteResultado() {
		this.file = null;
		this.resultadoForm.patchValue({
		  file: null
		});
		
		const fileInput: HTMLInputElement = document.querySelector('input[type="file"]')!;
		fileInput.value = '';
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
		this.fileIsOver = true;
	}

	onDragLeave(event: DragEvent) {
		this.fileIsOver = false;
	}

	onDrop(event: DragEvent) {
		event.preventDefault();
		this.fileIsOver = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			this.file = files[0]; // Solo tomamos el primer archivo
		}
	}

	onClick() {
		const fileInput: HTMLElement =
			document.querySelector('input[type="file"]')!;
		fileInput.click();
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (files && files.length > 0) {
		  this.file = files[0];

		  this.resultadoForm.patchValue({
			file: this.file
		  });
		}
	  }	  
}
