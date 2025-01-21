import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private http = inject(HttpClient);
  
    getAllResultados(): Observable<any[]> {
      return this.http.get<any[]>(
        'http://localhost:3777/api/v1/resultados/listAll',
      );
    }
}
