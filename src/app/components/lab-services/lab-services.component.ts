import { Component, inject, OnInit } from '@angular/core';
import { ExamenesService } from '../../services/examenes.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatHint } from '@angular/material/form-field';

@Component({
	selector: 'app-lab-services',
	standalone: true,
	imports: [MatDatepickerModule, MatHint],
	templateUrl: './lab-services.component.html',
	styleUrl: './lab-services.component.css',
})
export class LabServicesComponent implements OnInit {
	private examenesService = inject(ExamenesService);
	public examenes: any[] = [];
	public verModal: boolean = false;

	ngOnInit(): void {
		this.mostrarExamenes();
	}

	private mostrarExamenes() {
		this.examenesService.getAllExamenes().subscribe(data => {
			this.examenes = data;
		});
	}

	public crearCita() {
		this.verModal = !this.verModal;
		console.log(this.verModal);
	}
}
