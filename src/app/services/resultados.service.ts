import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from './config';

@Injectable({
	providedIn: 'root',
})
export class ResultadosService {
	private http = inject(HttpClient);

	baseUrl = env.baseUrl;

	getAllResultados(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/resultados/listAll`);
	}

	getResultadosByUserId(id: string): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/resultados/list/${id}`);
	}
}
