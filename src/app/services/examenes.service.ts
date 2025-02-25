import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examen } from '../interfaces/examen';
import { env } from './config';

@Injectable({
	providedIn: 'root',
})
export class ExamenesService {
	private http = inject(HttpClient);

	baseUrl = env.baseUrl;

	getAllExamenes(): Observable<Examen[]> {
		return this.http.get<Examen[]>(`${this.baseUrl}/examenes/listAll`);
	}

	getOneExamen(id: string): Observable<Examen> {
		return this.http.get<Examen>(`${this.baseUrl}/examenes/list/${id}`);
	}

	createExamen(name: string, description: string): Observable<Examen> {
		return this.http.post<Examen>(`${this.baseUrl}/examenes/create`, {
			name,
			description,
		});
	}

	updateExamen(
		id: string,
		name: string,
		description: string,
	): Observable<Examen> {
		return this.http.patch<Examen>(`${this.baseUrl}/examenes/update/${id}`, {
			name,
			description,
		});
	}

	deleteExamen(id: string): Observable<Examen> {
		return this.http.delete<Examen>(`${this.baseUrl}/examenes/delete/${id}`);
	}
}
