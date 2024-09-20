import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-resultados',
	standalone: true,
	imports: [DatePipe],
	templateUrl: './resultados.component.html',
	styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
	results = [
		{
			id: 1,
			url: '#',
			name: '20-09-2024_Juan_Sangre',
			tipoExamen: 'Examen de sangre',
			fechaToma: '10/10/2024',
			fechaSubido: '11/10/2024',
		},
		{
			id: 2,
			url: '#',
			name: '20-09-2024_Juan_Sangre',
			tipoExamen: 'Examen de sangre',
			fechaToma: '10/10/2024',
			fechaSubido: '11/10/2024',
		},
		{
			id: 3,
			url: '#',
			name: '20-09-2024_Juan_Sangre',
			tipoExamen: 'Examen de sangre',
			fechaToma: '10/10/2024',
			fechaSubido: '11/10/2024',
		},
	];
}
